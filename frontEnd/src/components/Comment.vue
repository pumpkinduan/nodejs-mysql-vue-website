<template>
  <div class="comment">
    <section class="words">
      <header>
        <i class="iconfont icon-liuyan"></i>
        <span style="vertical-align: 5px;font-size: 1rem;" v-if="words.length > 0">一共有{{commentSize}}条留言</span>
        <span style="vertical-align: 5px;font-size: 1rem;" v-else>目前还没有人留下ta的足迹噢,快来抢占一楼吧</span>
      </header>
      <template v-if="words.length > 0">
        <ul>
          <li v-for="(item, index) in words" :key="index">
            <section>
              <i class="iconfont icon-xiaolian-"></i>
              <span class="user-name">{{item.name}}</span>
            </section>
            <section class="wrapper">
              <div class="content">{{item.comment}}</div>
              <div class="clearfix" style="padding-top: 0.5em;">
                <span class="fl time">{{item.created_at}}</span>
                <span class="fr time orange">{{(curPage - 1) * (pageSize) + (index+1) }}楼</span>
                <!-- <i class="iconfont icon-pinglun fr" @click="handleReply(item.name, item.id, index)"></i> -->
                <i
                  title="取消回复"
                  class="iconfont icon-quxiao fr"
                  v-show="isReply && curIndex == index"
                  @click="resetComment()"
                ></i>
              </div>
            </section>
            <!-- <template v-for="(child, c_index) in childWords">
            <section v-if="child.parent_id == item.id" :key="c_index" class="child">
              {{child.name}}于
              <span class="time">{{child.created_at}}</span>回复
              <span style="color: #ff9d00;">{{item.name}}</span>
              <b>:</b>&nbsp;
              <span style="color: #333;">{{child.comment}}</span>
            </section>
            </template>-->
          </li>
        </ul>
        <Pagination
          :totalData="commentSize"
          :pageSize="pageSize"
          @current-change="getCurrentPage"
          @next-page="nextPage"
          @prev-page="prevPage"
        />
      </template>
    </section>
    <section class="form">
      <strong>留言区</strong>
      <div class="relative">
        <input
          ref="focusInput"
          @input="errMessage = ''"
          type="text"
          placeholder="Name"
          v-model.trim="name"
        />
        <p v-if="errMessage" class="errMessage">{{errMessage}}</p>
      </div>
      <div>
        <textarea
          :class="!comment?'error':''"
          type="text"
          v-model.trim="comment"
          :placeholder="prompt"
          ref="focusTextarea"
        ></textarea>
      </div>
      <div>
        <button @click="send">send comment</button>
      </div>
    </section>
    <section class="prompt">
      <p>提示: 欢迎留下大家的评语，由于评论信息将会公开显示，所以大家不要透露私人信息，如账号，邮箱...</p>
    </section>
  </div>
</template>

<script>
import { format } from "@/lib/formatTime.js";
import api from "@/api/index.js";
import Pagination from "@/components/Pagination";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      name: "",
      comment: "",
      words: [],
      parent_id: null,
      // childWords: [],
      cachedWords: new Map(),
      pageSize: 5,
      curPage: 1,
      commentSize: 0,
      errMessage: "",
      isReply: false, //是否回复  默认 否
      curIndex: "",
      prompt: "Hey,guys,come and say something"
    };
  },
  created() {
    api.getArticleComments(this.$route.params.articleId, 1).then(res => {
      if (res.data) {
        this.words = res.data.data;
        this.cachedWords.set(1, this.words); //缓存第一页数据
        this.pageSize = parseInt(res.data.meta.pageSize);
        this.commentSize = parseInt(res.data.meta.count);
      }
    });
  },
  methods: {
    send() {
      if (this.comment && this.name) {
        api
          .createComment({
            name: this.name,
            comment: this.comment,
            article_id: this.$route.params.articleId
            // parent_id: this.isReply ? this.parent_id : null
          })
          .then(res => {
            this.words.push({
              name: this.name,
              comment: this.comment,
              created_at: format()
              // parent_id: this.isReply ? this.parent_id : null
            });
            this.commentSize ++;
            this.name = "";
            this.comment = "";
            this.resetComment();
          })
          .catch(err => {
            this.$refs.focusInput.focus();
            this.errMessage = err.msg;
          });
      } else if (!this.comment) {
        this.prompt = "留言不能为空噢";
        this.$refs.focusTextarea.focus();
      } else {
        this.$refs.focusInput.focus();
        this.errMessage = "请留下阁下的大名吧";
      }
    },
    // handleReply(name, id, index) {
    //   //代表 && index==key回复
    //   this.isReply = true;
    //   this.parent_id = id;
    //   this.curIndex = index; //当前点击的那条留言
    //   this.prompt = `回复${name}:`;
    //   this.$refs.focusTextarea.focus();
    // },
    resetComment() {
      //留言初始化
      // this.isReply = !this.isReply;
      // this.parent_id = null;
      this.prompt = "Hey,guys,come and say something";
    },
    getCurrentPage(page) {
      this.curPage = page;
      if (this.cachedWords.has(page)) {
        this.words = this.cachedWords.get(page);
      } else {
        api.getArticleComments(this.$route.params.articleId, page).then(res => {
          if (res.data) {
            this.words = res.data.data;
            this.cachedWords.set(page, this.words); //缓存第一页数据
          }
        });
      }
    },
    nextPage(page) {
      this.getCurrentPage(page);
    },
    prevPage(page) {
      this.getCurrentPage(page);
    }
  }
};
</script>

<style scoped>
.prompt p {
  font-weight: 400;
  color: #554c3d;
  font-size: 0.8rem;
}
textarea {
  width: 100%;
  height: 200px;
  resize: none;
  padding: 0.5em;
}
input {
  width: 40%;
  line-height: 2rem;
  margin: 1rem 0;
  padding-left: 0.5em;
}
strong {
  vertical-align: top;
  font-size: 1.5rem;
  font-weight: 400;
  margin-left: 3px;
  letter-spacing: 2px;
  color: #ff8a00;
}
button,
input,
textarea {
  border-radius: 5px;
  outline: none;
  font-family: cursive, "Microsoft YaHei";
  border: 2px solid #e4e4e4;
  font-size: 1rem;
}
textarea:focus,
input:focus {
  border: 2px solid orange;
}
button {
  margin: 0.8rem 0;
  width: 12rem;
  height: 3.5rem;
  line-height: 2rem;
  border: none;
  text-align: center;
  color: #fff;
  font-weight: 500;
  background-color: #ff9d00;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
}
.words {
  margin-bottom: 2rem;
}
.words header {
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  letter-spacing: 2px;
}
.words ul li {
  line-height: 1.5rem;
  font-size: 1rem;
  padding: 1.4rem 1rem;
  border-bottom: solid 1px#eee;
  transition: all 0.3s;
}
.words ul li section:not(:first-child) {
  margin-top: 0.6rem;
  padding-left: 2.4rem;
  color: #666;
}
.words ul li section .user-name {
  color: #ff8a00;
  font-size: 1.2rem;
  vertical-align: 4px;
  margin-left: 6px;
  font-weight: 300;
}
.words ul li section .content {
  word-break: break-all;
}
.icon-xiaolian- {
  font-size: 1.8rem;
  color: #ff9d00;
}
.icon-liuyan {
  margin-right: 5px;
  font-size: 1.8rem;
}
.words ul li section:first-child {
  max-width: 600px;
  min-width: 300px;
}

.words ul li section .time {
  color: #888;
  font-size: 0.8em;
}
.icon-pinglun,
.icon-quxiao {
  font-size: 1rem;
  transition: all 0.3s;
  vertical-align: middle;
  font-weight: 400;
  margin-left: 10px;
}
.icon-pinglun:hover {
  cursor: pointer;
  color: #ff9d00;
}
.icon-quxiao:hover {
  color: #f40;
  cursor: pointer;
}
.errMessage {
  color: #f40;
  position: absolute;
  left: 4px;
  bottom: 2px;
}
</style>