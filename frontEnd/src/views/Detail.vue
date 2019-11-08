<template>
  <div class="detail">
    <main>
      <header class="pic"></header>
      <div class="left-aside">
        <section>
          <h2>{{details.title}}</h2>
          <ul class="clearfix tags">
            <li>发布于: {{ details.created_at}}</li>
            <li>标签: {{ details.tag}}</li>
            <li>浏览量: {{ details.browse}}</li>
            <li>字数: {{ details.total_char}}</li>
          </ul>
          <div class="description">{{ details.description }}</div>
        </section>
        <div class="ql-snow">
          <div class="ql-editor">
            <div v-html="details.content" class="content"></div>
          </div>
        </div>

        <section class="wrap-comment">
          <Comment />
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import api from "@/api/index.js";
import Comment from "@/components/Comment";
export default {
  components: {
    Comment
  },
  beforeRouteEnter(to, from, next) {
    //请求数据
    api
      .getArticleDetail(to.params.articleId)
      .then(res => {
        if (res.data && res.data.data) {
          next(vm => vm.setData(res.data.data));
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    this.startCount();
  },
  data() {
    return {
      details: {},
      stayTime: 0,
      browse: 0,
      second: 0,
      timer: null,
      readingTime: 0//阅读时长，大于该值访问量才会+1
    };
  },
  beforeRouteLeave(to, from, next) {
    if (this.second > this.readingTime) {
      api.updateBrowse(this.$route.params.articleId, {
        browse: this.browse
      }); //更新访问量
      next()
    }
     next()
  },
  methods: {
    startCount() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.second++;
        if (this.second > this.readingTime ) {
          clearInterval(this.timer);
          this.browse++; //访问量+1
        }
      }, 1000);
    },
    setData(data) {
      this.details = data;
      this.readingTime = Math.floor(data.total_char / 20);
      this.browse = data.browse;
      this.$store.state.showLoading = false; //加载动画
    }
  }
};
</script>

<style scoped>
.detail header {
  width: 100%;
  height: 400px;
  background: url("http://n4-q.mafengwo.net/s15/M00/C7/3D/CoUBGV20DkWAapI_ABQ1nzdiSrA455.jpg?imageMogr2%2Fstrip")
    0 0 no-repeat;
  background-size: cover;
  margin-bottom: 3rem;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.6);
}
.detail main {
  background: #fff;
}
.detail main section h2 {
  font-size: 1.5rem;
  font-weight: 500;
  color: #444;
  margin-bottom: 0.8rem;
}
.detail main section .tags > li {
  float: left;
  margin-right: 1rem;
  font-size: 0.9rem;
  font-weight: 540;
  color: #999;
}
.detail main .content {
  margin: 3rem 0;
  line-height: 1.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
  font-size: 1.5em;
}
.detail main .description {
  max-width: 30rem;
  overflow: auto;
  color: #555;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  margin-top: 1rem;
  word-break: break-all;
}

@media screen and (min-width: 920px) {
  .detail {
    padding: 3rem 12rem;
  }
  .detail main h1 {
    width: 100%;
  }
  .detail main .left-aside {
    width: 70%;
  }
}
@media screen and (max-width: 920px) {
  .detail main h1 {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }
  .detail main .left-aside {
    width: 100%;
  }
  .detail {
    padding: 2rem 2.5rem;
  }
}
</style>