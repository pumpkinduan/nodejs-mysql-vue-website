<template>
  <div class="comment">
    <section class="words">
      <h3>
        <i class="iconfont icon-liuyan"></i>
        <span v-if="words.length > 0">
          一共有
          <em class="orange">{{totalComments}}</em>条留言和
          <em class="orange">{{totalReplies}}</em>条回复
        </span>
        <span v-else>目前还没有人留下ta的足迹噢,快来抢占一楼吧</span>
      </h3>
      <template v-if="words.length > 0">
        <ul>
          <li v-for="(item, index) in words" :key="index">
            <header>
              <i class="iconfont icon-xiaolian- fs-15 orange"></i>
              <span class="user-name">{{item.name}}</span>
            </header>
            <section class="wrapper">
              <div class="content">{{item.content}}</div>
              <div class="clearfix" style="padding-top: 0.5em;">
                <span class="fl time">{{item.created_at}}</span>
                <span class="fr time">{{ (index+1) }}楼</span>
                <i class="iconfont icon-pinglun fr" @click="handleReply(item.name, item.id, index)"></i>
              </div>
              <template>
                <section
                  :key="r_index"
                  class="reply"
                  v-for="(reply, r_index) in item.replies.slice(0,3)"
                >
                  <div class="replier">
                    <i class="iconfont orange fs-15 icon-github"></i>
                    <span class="user-name">{{reply.name}}</span>
                    <small style="color: #666;">回复道</small>
                    <span class="time fr">{{reply.created_at}}</span>
                  </div>
                  <p style="text-indent: 2rem;" class="content">{{reply.content}}</p>
                </section>
                <transition-group name="slide" tag="div" appear>
                  <section
                    :key="r_index + 3"
                    class="reply"
                    v-for="(reply, r_index) in item.replies.slice(3)"
                    v-show="item.active"
                  >
                    <div class="replier">
                      <i class="iconfont orange fs-15 icon-github"></i>
                      <span>{{reply.name}}回复道</span>
                      <span class="time fr">{{reply.created_at}}</span>
                    </div>
                    <p style="text-indent: 2rem;" class="content">{{reply.content}}</p>
                  </section>
                </transition-group>
              </template>
              <div
                v-if="item.replies && item.replies.length>3"
                @click="item.active=!item.active"
                class="showMore clearfix fr"
              >
                <span v-if="!item.active">剩余{{item.replies.length - 3}}条回复</span>
                <span v-else>收起回复</span>
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
        <button @click="cancle" class="fl cancle">取消发布</button>
      </div>
    </section>
  </div>
</template>

<script>
import { format } from "@/lib/formatTime.js";
import api from "@/api/index.js";
import {throttle, debounce, addEvent, removeEvent} from "@/lib/tool.js";
export default {
  data() {
    return {
      canLoad: true,
      loading_gif: false,
      maxlength: 128,
      words: [],
      name: "",
      comment: "",
      totalReplies: 0,
      comment_id: null, //当前被回复的留言的id
      totalComments: 0,
      errMessage: "",
      isReply: false, //是否回复  默认 否
      curIndex: "",
      page: 1,
      prompt: "Hey,guys,come and say something"
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
    let self = this;
    this.handleThrottle = throttle(function() {
      if (self.loadMoreComment()) {
        self.page++;
        self.loading_gif = true;
        self.getData();
      }
    }, 400);
    this.getData();
    let parse1 =
      sessionStorage.getItem("name") &&
      JSON.parse(sessionStorage.getItem("name"))[this.articleId];
    let parse2 =
      sessionStorage.getItem("comment") &&
      JSON.parse(sessionStorage.getItem("comment"))[this.articleId];
    this.name = parse1 && parse1.name;
    this.comment = parse2 && parse2.comment;
  },
  mounted() {
    let self = this;
    addEvent(window, "scroll", this.handleThrottle);
  },
  methods: {
    getData() {
      api
        .getArticleComments(this.$route.params.articleId, this.page)
        .then(res => {
          if (res.data) {
            this.loading_gif = false;
            let data = res.data.data;
            for (let i in data) {
              //重新整理数据格式，添加 active: false，用于排他
              data[i]["active"] = false;
            }
            this.words.push(...data);
            this.pageSize = parseInt(res.data.meta.pageSize);
            this.totalComments = parseInt(res.data.meta.totalComments);
            this.totalReplies = parseInt(res.data.meta.totalReplies);
          }
        })
        .catch(err => {
          //后台没有数据时会报错
          //表示下次不能再请求数据
          this.canLoad = false;
          this.loading_gif = false;
        });
      let self = this;
      this.debounceComment = debounce(newVal => {
        sessionStorage.setItem(
          "name",
          JSON.stringify({
            [this.articleId]: {
              name: newVal
            }
          })
        );
        newVal && newVal.length >= 128
          ? (self.errMessage = "留言的字符个数不能超过128噢")
          : (self.errMessage = "");
      });
      this.debounceName = debounce(newVal => {
        sessionStorage.setItem(
          "comment",
          JSON.stringify({
            [this.articleId]: {
              comment: newVal
            }
          })
        );
        newVal && newVal.length >= 12
          ? (self.errMessage = "昵称的字符个数不能超过12噢")
          : (self.errMessage = "");
      });
    },
    send() {
      if (this.comment && this.name) {
        if (!this.isReply) {
          let data = {
            name: this.name,
            content: this.comment,
            article_id: this.$route.params.articleId
          };
          api
            .createComment(data)
            .then(res => {
              let newComment = Object.assign(data, {
                created_at: format(),
                replies: []
              });
              this.words.push(newComment);
              this.totalComments++;
              this.resetComment();
            })
            .catch(err => {
              this.errMessage = err.msg;
              this.$refs.focusInput.focus();
            });
        } else {
          let reply = {
            name: this.name,
            content: this.comment,
            comment_id: this.comment_id
          };
          api.createReply(reply).then(res => {
            this.words[this.curIndex].replies.push(
              Object.assign(reply, { created_at: format() })
            );
            this.totalReplies++;
            this.resetComment();
          });
        }
      } else if (!this.comment) {
        this.prompt = "留言不能为空噢";
        this.$refs.focusTextarea.focus();
      } else {
        this.$refs.focusInput.focus();
        this.errMessage = "请留下阁下的大名吧";
      }
    },
    cancle() {
      this.resetComment();
    },
    handleReply(name, id, index) {
      //代表 && index==key回复
      this.isReply = true;
      this.comment_id = id;
      this.curIndex = index; //当前点击的那条留言
      this.prompt = `回复${name}:`;
      this.$refs.focusTextarea.focus();
    },
    resetComment() {
      //留言初始化
      this.isReply = false;
      this.comment = "";
      this.name = "";
      this.prompt = "Hey,guys,come and say something";
    },
    loadMoreComment() {
      if (this.canLoad) {
        const ele = document.getElementsByClassName("words")[0],
          viewHeight =
            document.documentElement.clientHeight ||
            document.body.clientHeight ||
            window.innerHeight,
          { bottom } = ele && ele.getBoundingClientRect();
        if (bottom - 100 < viewHeight) {
          //最后几条留言快要离开可视区时，加载留言
          //100 为预留 距离，提前一点加载留言
          return true;
        }
      }
    }
  }
};
</script>

<style scoped>
.comment .prompt p {
  font-weight: 400;
  color: #554c3d;
  font-size: 0.8rem;
}
.comment .words,
.form {
  margin-bottom: 2rem;
}
.comment .words h3 {
  padding: 1rem 0;
  border-bottom: 1px dashed #eee;
  letter-spacing: 2px;
  font-weight: 400;
  color: #666;
}
.comment .words h3 span {
  vertical-align: 4px;
  font-size: 0.8rem;
}
.comment .words ul li {
  line-height: 1.5rem;
  font-size: 0.8rem;
  padding: 1.2rem 1rem;
}
.words ul li header {
  max-width: 600px;
  min-width: 300px;
}
.comment .words ul li section .time {
  color: #888;
  font-size: 0.8em;
}
.comment .words ul li section.wrapper {
  margin-top: 0.6rem;
  padding-left: 2rem;
  position: relative;
  color: #666;
  overflow: hidden;
}
.comment .words ul li section.wrapper .showMore {
  display: inline-block;
  cursor: pointer;
}
.comment .words ul li section.wrapper .showMore span {
  display: inline-block;
}
.comment .words ul li section.wrapper .showMore:hover {
  color: #ff9d00;
}
.comment .words ul li header .user-name {
  font-size: 0.9rem;
  vertical-align: 2px;
  margin-left: 6px;
  font-weight: 500;
}
.comment .words ul li .content {
  word-break: break-all;
  color: #334;
  font-weight: 400;
}
.comment .words ul li section .reply {
  padding: 0.8rem;
}
.comment .words ul li section .reply:hover {
  background-color: #eeeeee57;
}
.comment .words ul li section .reply:last-child {
  border: none;
}
/* 字体图标样式开始 */
.icon-liuyan {
  font-size: 1.2rem;
}
.icon-pinglun {
  font-size: 1rem;
  transition: all 0.3s;
  vertical-align: middle;
  font-weight: 400;
  margin-right: 10px;
}
.icon-pinglun:hover {
  cursor: pointer;
  color: #ff9d00;
}
.icon-github {
  vertical-align: middle;
  margin-right: 5px;
}
.icon-quxiao:hover {
  color: #f40;
  cursor: pointer;
}
/* 字体图标样式结束 */
.slide-enter {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter-to {
  transform: translateY(0%);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
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
</style>