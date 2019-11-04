<template>
  <div class="comment">
    <section class="words">
      <ul>
        <li v-for="(item, index) in words" :key="index">
          <i class="iconfont icon-xiaolian-"></i>
          <strong>{{item.name}}</strong>
          <p>{{item.comment}}</p>
          <p class="time clearfix">
            <span class="fl">{{item.created_at}}</span>
            <i class="fr iconfont icon-shanchu" @click="handleDelete(item.id, index)"></i>
          </p>
        </li>
      </ul>
    </section>
    <section class="form">
      <div>
        <input type="text" placeholder="Name" v-model.trim="name" />
      </div>
      <div>
        <textarea type="text" v-model.trim="comment" placeholder="Hey,guys,come and say something"></textarea>
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
export default {
  data() {
    return {
      name: "",
      comment: "",
      words: []
    };
  },
  created() {
    api.getCommentList(1).then(res => {
      if (res.data) {
        this.words = res.data.data;
      }
    });
  },
  methods: {
    send() {
      if (this.comment) {
        if (this.name) {
          this.words.push({
            name: this.name,
            comment: this.comment,
            created_at: format()
          });
          api
            .sendComment({
              name: this.name,
              comment: this.comment,
              created_at: format()
            })
            .then(res => {
              console.log(res.data);
            });
        } else {
          this.words.push({
            name: "匿名",
            comment: this.comment,
            created_at: format()
          });
          api
            .sendComment({
              name: "匿名",
              comment: this.comment,
              created_at: format()
            })
            .then(res => {
              console.log(res.data);
            });
        }
      }
      this.name = "";
      this.comment = "";
    },
    handleDelete(id, index) {
      api.deleteComment(id).then(res => {
        if (res.data && res.data.success) {
          this.words.splice(index, 1); //删除纪录
        }
      });
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
button,
input,
textarea {
  border-radius: 5px;
  outline: none;
  font-family: cursive, "Microsoft YaHei";
  border: 2px solid #e4e4e4;
  font-size: 1.2rem;
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
.words ul li {
  line-height: 1.5rem;
  font-size: 1rem;
  padding: 1.4rem 1rem;
  border-bottom: solid 1px#eee;
}
.words ul li p {
  margin-top: 0.5rem;
  padding-left: 2.4rem;
}
.words ul li p.time {
  color: #777;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.icon-xiaolian- {
  font-size: 2.4rem;
}
.icon-shanchu {
  font-size: 1.5rem;
  transition: color 0.3s;
  vertical-align: middle;
}
.icon-shanchu:hover {
  cursor: pointer;
  color: #ff9d00;
}
strong {
  vertical-align: top;
  font-size: 1.4rem;
  font-weight: 400;
  margin-left: 3px;
  letter-spacing: 2px;
}
</style>