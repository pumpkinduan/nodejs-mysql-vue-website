<template>
  <div class="comment">
    <section class="words">
      <header>
        <i class="iconfont icon-liuyan"></i>
        <span style="vertical-align: 5px;font-size: 1rem;">
          一共有
          <strong style="vertical-align: middle;">{{commentSize}}</strong>条留言
        </span>
      </header>
      <ul>
        <li v-for="(item, index) in words" :key="index">
          <i class="iconfont icon-xiaolian-"></i>
          <strong>{{item.name}}</strong>
          <p>{{item.comment}}</p>
          <p class="time clearfix">
            <span class="fl">{{item.created_at}}</span>
            <!-- <i class="fr iconfont icon-shanchu" @click="handleDelete(item.id, index)"></i> -->
          </p>
        </li>
      </ul>
      <Pagination
        :totalData="commentSize"
        :pageSize="pageSize"
        @current-change="getCurrentPage"
        @next-page="nextPage"
        @prev-page="prevPage"
      />
    </section>
    <section class="form">
      <div>
        <input type="text" placeholder="Name" v-model.trim="name" />
      </div>
      <div>
        <textarea
          :class="!comment?'error':''"
          type="text"
          v-model.trim="comment"
          :placeholder="prompt"
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
      cachedWords: new Map(),
      pageSize: 5,
      commentSize: 0,
      prompt: "Hey,guys,come and say something"
    };
  },
  created() {
    api.getCommentList(1).then(res => {
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
      if (this.comment) {
        api
          .sendComment({
            name: this.name || "匿名",
            comment: this.comment
          })
          .then(res => {
            this.words.push({
              name: this.name,
              comment: this.comment,
              created_at: format()
            });
            this.name = "";
            this.comment = "";
          });
      } else {
        this.prompt = "留言不能为空噢";
      }
    },
    handleDelete(id, index) {
      api.deleteComment(id).then(res => {
        if (res.data && res.data.success) {
          this.words.splice(index, 1); //删除纪录
        }
      });
    },
    getCurrentPage(page) {
      if (this.cachedWords.has(page)) {
        this.words = this.cachedWords.get(page);
      } else {
        api.getCommentList(page).then(res => {
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
.words ul li:hover {
  background-color: #fdcc6347;
  border-radius: 5px;
}
.words ul li p:first-child {
  max-width: 600px;
  min-width: 300px;
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
  font-size: 2.2rem;
}
.icon-liuyan {
  margin-right: 5px;
  font-size: 1.8rem;
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
  font-size: 1.3rem;
  font-weight: 300;
  margin-left: 3px;
  letter-spacing: 2px;
}
</style>