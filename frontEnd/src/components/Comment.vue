<template>
  <div class="comment">
    <section class="words">
      <h3>
        <i class="iconfont icon-liuyan"></i>
        <span v-if="words.length > 0">
          一共有
          <em style="font-size: 1rem;">{{totalComments}}</em>条留言和
          <em style="font-size: 1rem;">{{totalReplies}}</em>条回复
        </span>
        <span v-else>目前还没有人留下ta的足迹噢,快来抢占一楼吧</span>
      </h3>
      <template v-if="words.length > 0">
        <ul>
          <li v-for="(item, index) in words" :key="index">
            <header>
              <img src="../assets/image/lwl.jpeg" />
              <span class="user-name">{{item.name}}</span>
            </header>
            <section class="wrapper">
              <div class="content">{{item.content}}</div>
              <div class="clearfix" style="padding-top: 0.5em;">
                <span class="fl time">{{item.created_at}}</span>
                <span class="fr time">{{ (index+1) }}楼</span>
                <i
                  class="iconfont iconpinglun fr"
                  @click="handleReply(item.name, item.id, index, item.content)"
                ></i>
              </div>
              <section
                :key="r_index"
                class="reply"
                v-for="(reply, r_index) in item.replies.slice(0,3)"
              >
                <div>
                  <template v-if="reply.name=='南瓜'">
                    <img src="../assets/image/hinata.png" />
                    <b>南瓜(管理员)</b>
                  </template>
                  <template v-else>
                    <img src="../assets/image/meto.jpg" />
                    <span class="user-name">{{reply.name}}</span>
                  </template>
                  <small style="color: #969090;">&nbsp;回复道:</small>
                  <span class="time fr">{{reply.created_at}}</span>
                </div>
                <p class="content">{{reply.content}}</p>
              </section>
              <section
                :key="r_index + 3"
                class="reply list-complete"
                v-for="(reply, r_index) in item.replies.slice(3)"
                v-show="item.active"
              >
                <div>
                  <template v-if="reply.name=='南瓜'">
                    <img src="../assets/image/hinata.png" />
                    <b>南瓜(作者)</b>
                  </template>
                  <template v-else>
                    <img src="../assets/image/meto.jpg" />
                    <span class="user-name">{{reply.name}}</span>
                  </template>
                  <small style="color: #969090;">&nbsp;回复道:</small>
                  <span class="time fr">{{reply.created_at}}</span>
                </div>
                <p class="content">{{reply.content}}</p>
              </section>
              <div
                v-if="item.replies && item.replies.length>3"
                @click="item.active=!item.active"
                class="showMore clearfix fr"
                :key="item.replies.length"
              >
                <span v-show="!item.active">剩余{{item.replies.length - 3}}条回复</span>
                <span v-show="item.active">收起回复</span>
                <span :class="['iconfont','icon-xiala',(item.active ? 'active' : '')]"></span>
              </div>
            </section>
          </li>
        </ul>
      </template>
      <div :class="[loading_gif ? 'block-loading': '']"></div>
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
          :disabled="name.length > 7"
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
          :maxlength="maxlength"
        ></textarea>
      </div>
      <div class="clearfix">
        <button @click="send" class="fl">发布留言</button>
        <button @click="resetComment" class="fl cancle">取消发布</button>
      </div>
    </section>
  </div>
</template>
<script>
import { format } from '@/lib/formatTime.js';
import { createComment, createReply, getArticleComments } from '@/api/index.js';
import {
  throttle,
  debounce,
  addEvent,
  removeEvent,
  getPageOffset
} from '@/lib/tool.js';
export default {
  props: ['article_title'],
  data() {
    return {
      canLoad: true,
      loading_gif: false,
      maxlength: 128,
      words: [],
      name: '',
      comment: '',
      totalReplies: 0,
      comment_id: null, //当前被回复的留言的id
      parent_name: '',
      parent_comment: '',
      totalComments: 0,
      errMessage: '',
      isReply: false, //是否回复  默认 否
      curIndex: '',
      page: 1,
      prompt: 'Hey,guys,come and say something',
      scrollTop: 0 //记录用户点击回复时滚动条的位置
    };
  },
  watch: {
    comment(newVal) {
      this.debounceComment(newVal);
    },
    name(newVal) {
      this.debounceName(newVal);
    }
  },
  created() {
    this.getData();
    this.handleThrottle = throttle(() => {
      this.loadData();
    }, 350);
  },
  mounted() {
    addEvent(window, 'scroll', this.handleThrottle);
  },
  destroyed() {
    removeEvent(window, 'scroll', this.handleThrottle);
  },
  methods: {
    getData() {
      getArticleComments(this.$route.params.articleId, this.page)
        .then(res => {
         
          this.loading_gif = false;
          let data = res.data;
          for (let i in data) {
            //重新整理数据格式，添加 active: false，用于排他
            data[i]['active'] = false;
          }
          this.words.push(...data);
          this.pageSize = parseInt(res.meta.pageSize);
          this.totalComments = parseInt(res.meta.totalComments);
          this.totalReplies = parseInt(res.meta.totalReplies);
        })
        .catch(() => {
          //后台没有数据时会报错
          //表示下次不能再请求数据
          this.canLoad = false;
          this.loading_gif = false;
        });
      let self = this;
      this.debounceComment = debounce(newVal => {
        newVal && newVal.length >= 64
          ? (self.errMessage = '留言的字符个数不能超过64噢')
          : (self.errMessage = '');
      });
      this.debounceName = debounce(newVal => {
        newVal && newVal.length > 7
          ? (self.errMessage = '昵称的字符个数不能超过8噢')
          : (self.errMessage = '');
      });
    },
    sendComment() {
      let data = {
        name: this.name,
        content: this.comment,
        article_id: this.$route.params.articleId,
        article_title: this.article_title
      };
      createComment(data)
        .then(res => {
          if (!res.success) return;
          let newComment = Object.assign(data, {
            created_at: format(),
            replies: [],
            id: res.comment_id
          });
          this.words.push(newComment);
          this.totalComments++;
          this.resetComment();
        })
        .catch(err => {
          this.errMessage = err.msg;
          this.$refs.focusInput.focus();
        });
    },
    sendReply() {
      let reply = {
        name: this.name,
        content: this.comment,
        comment_id: this.comment_id,
        parent_comment: this.parent_comment,
        parent_name: this.parent_name
      };
      createReply(reply).then(res => {
        if (!res.success) return;
        this.words[this.curIndex].replies.push(
          Object.assign(reply, { created_at: format() })
        );
        this.totalReplies++;
        this.resetComment();
        //滚回到用户回复的留言处
        this.scrollTop = document.documentElement.scrollTop;
      });
    },
    check() {
      let flag = true;
      if (!this.comment) {
        this.prompt = '留言不能为空噢';
        flag = false;
      }
      if (!this.name) {
        this.errMessage = '请留下阁下的大名吧';
        flag = false;
      }
      this.$refs.focusTextarea.focus();
      return flag;
    },
    send() {
      if (this.check()) {
        if (!this.isReply) {
          this.sendComment();
        } else {
          this.sendReply();
        }
      }
    },
    handleReply(name, id, index, content) {
      //代表 && index==key回复
      this._scrollTop = getPageOffset().y;
      this.prompt = `回复${name}:`;
      this.$refs.focusTextarea.focus();
      this.isReply = true;
      this.comment_id = id;
      this.parent_name = name;
      this.parent_comment = content;
      this.curIndex = index; //当前点击的那条留言
    },
    resetComment() {
      //留言初始化
      this.isReply = false;
      this.comment = '';
      this.name = '';
      this.prompt = 'Hey,guys,come and say something';
    },
    loadData() {
      if (this.totalComments <= this.words.length) return;
      if (this.canLoad) {
        const ele = document.getElementsByClassName('words')[0],
          viewHeight =
            document.documentElement.clientHeight ||
            document.body.clientHeight ||
            window.innerHeight,
          { bottom } = ele && ele.getBoundingClientRect();
        if (bottom - 100 < viewHeight) {
          //最后几条留言快要离开可视区时，加载留言
          //100 为预留 距离，提前一点加载留言
          this.page++;
          this.loading_gif = true;
          this.getData();
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.comment {
  .words {
    margin-bottom: 2rem;
    h3 {
      padding: 1rem 0;
      border-bottom: 1px dashed #eee;
      letter-spacing: 2px;
      font-weight: 400;
      color: #666;
      span {
        vertical-align: 3px;
        font-size: 0.8rem;
        em {
          color: @orange;
        }
      }
    }
    ul li {
      line-height: 1.5rem;
      font-size: 0.8rem;
      padding: 1.2rem 1rem;
      img {
        display: inline-block;
        border-radius: 50%;
        margin-right: 6px;
      }
      header {
        max-width: 600px;
        min-width: 300px;
        & > img {
          width: 40px;
          vertical-align: -12px;
        }
        .user-name {
          font-size: 1rem;
          font-weight: 500;
        }
      }
      section .time {
        color: #777;
        font-size: 0.9em;
      }
      section.wrapper {
        margin-top: 0.6rem;
        padding-left: 46px;
        position: relative;
        color: #555;
        overflow: hidden;
        .showMore {
          display: inline-block;
          cursor: pointer;
          &:hover {
            color: #ff9d00;
          }
          span {
            display: inline-block;
          }
        }
      }
      .content {
        word-break: break-all;
        color: #666;
        font-weight: 400;
      }
      section .reply {
        padding: 0.8rem;
        background-color: rgba(241, 241, 241, 0.3);
        &:last-child {
          border: none;
        }
        img {
          width: 35px;
          vertical-align: middle;
        }
        .content {
          padding-left: 41px;
        }
      }
    }
  }
  .prompt p {
    font-weight: 400;
    color: #554c3d;
    font-size: 0.8rem;
  }
}
/* 字体图标样式开始 */
.icon-liuyan {
  font-size: 1.2rem;
}
.iconpinglun {
  font-size: 1rem;
  transition: all 0.3s;
  vertical-align: middle;
  font-weight: 400;
  margin-right: 10px;
}
.iconpinglun:hover {
  cursor: pointer;
  color: #ff9d00;
}
.icon-quxiao:hover {
  color: #f40;
  cursor: pointer;
}
.icon-xiaolian- {
  font-size: 1.4rem;
}
/* 字体图标样式结束 */
.errMessage {
  color: #f40;
  position: absolute;
  left: 4px;
  bottom: 2px;
}
.active {
  transform: rotate(180deg) !important;
}
textarea {
  width: 100%;
  height: 150px;
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
  border-radius: 3px;
  outline: none;
  border: 1px solid #d6cfca;
  font-size: 1rem;
}
textarea:focus,
input:focus {
  border: 1px solid #ff8a00;
}
button {
  margin: 0.5rem 0;
  padding: 0.7rem 0.8rem;
  border: none;
  text-align: center;
  color: #fff;
  font-weight: 500;
  background-color: #ff9d00;
  cursor: pointer;
}
button.cancle {
  background-color: #e2b266;
  margin-left: 1rem;
}
button:hover {
  opacity: 0.8;
}
@media screen and (max-width: 780px) {
  .comment .words ul li section .reply .time {
    display: none;
  }
}
</style>
