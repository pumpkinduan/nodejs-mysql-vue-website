<template>
  <div class="detail">
    <main>
      <section class="clearfix intro">
        <h1 class="fl">
          <img
            src="../assets/image/diagonal-building.jpg"
            width="100%"
            style="border-radius: 6px;box-shadow: 0 0 3px 1px rgba(0,0,0,.3);"
          />
        </h1>
        <aside class="fl">
          <h2>{{details.title}}</h2>
          <ul class="clearfix">
            <li>发布于: {{ details.created_at}}</li>
            <li>标签: {{ details.tag}}</li>
            <li>浏览量: {{ details.browse}}</li>
            <li>字数: {{ details.total_char}}</li>
          </ul>
          <div class="description">{{ details.description }}</div>
        </aside>
      </section>
      <div class="ql-snow">
        <div class="ql-editor">
          <div v-html="details.content" class="content"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import api from "@/api/index.js";

export default {
  beforeRouteEnter(to, from, next) {
    //请求数据
    api
      .getArticleDetail(to.params.articleId)
      .then(res => {
        if (res.data && res.data.data) {
          next(vm => {
            vm.details = res.data.data;
            vm.$store.state.showLoading = false; //加载动画
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      details: []
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
.detail main aside h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #666;
  margin-bottom: 0.8rem;
}
.detail main aside ul li {
  float: left;
  margin-right: 1rem;
  font-size: 1rem;
  font-weight: 900;
  color: #999;
}
.detail main .content {
  margin-top: 2rem;
}
.detail main .description {
  max-width: 22rem;
  overflow: auto;
  color: #555;
  font-size: 01rem;
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
    width: calc(40% - 1rem);
    margin-right: 1rem;
  }
  .detail main aside {
    width: 60%;
  }
}
@media screen and (max-width: 920px) {
  .detail main h1 {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }
  .detail main aside {
    width: 100%;
  }
  .detail {
    padding: 2rem 2.5rem;
  }
}
</style>