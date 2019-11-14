<template>
  <div class="blog-list">
    <div class="wrapper">
      <section v-for="(item, index) in blogLists" :key="index">
        <router-link
          class="title"
          :to="{name: 'detail', params: {articleId: item.article_id, showLoading: false}}"
        >{{item.title}}</router-link>
        <ul class="info">
          <li>发表于: {{item.created_at}}</li>
          <li>访问量: {{item.browse}}</li>
          <li>字数: {{item.total_char}}</li>
        </ul>
        <div class="description">{{item.description}}</div>
        <div class="bottom">
          <router-link
            :to="{name: 'detail', params: {articleId: item.article_id, showLoading: false}}"
            class="tag fl"
          >{{item.tag}}</router-link>
          <router-link
            :to="{name: 'detail', params: {articleId: item.article_id, showLoading: false}}"
            class="read-more fr"
          >
            <i class="iconfont icon-gengduo" style="font-size: 1.5rem;"></i>
            <em>阅读更多</em>
          </router-link>
        </div>
      </section>
      <Pagination
        :totalData="commentSize"
        :pageSize="pageSize"
        @current-change="getCurrentPage"
        @next-page="nextPage"
        @prev-page="prevPage"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
export default {
  components: {
    Pagination
  },
  props: {
    blogLists: Array,
    article_id: Number,
    commentSize: Number,
    pageSize: Number,
    cachedBlogs: Map
  },
  data() {
    return {
    };
  },
  methods: {
    getCurrentPage(page) {
      this.$emit('getData', page);
    },
    nextPage(page) {
      console.log(page)
      this.$emit('getData', page);
    },
    prevPage(page) {
      this.$emit('getData', page);
    }
  }
};
</script>

<style scoped>
.blog-list {
  padding: 0 10rem;
}
.blog-list .wrapper {
  background-color: #fff;
  padding: 3rem 8rem;
}
.blog-list .wrapper section {
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 5rem;
  padding-bottom: 2rem;
  text-align: center;
}
.blog-list .wrapper section .title {
  font-size: 1.6rem;
  font-weight: bold;
  width: 50%;
  padding-bottom: 0.5rem;
  position: relative;
  overflow: hidden;
}
.blog-list .wrapper section .title::after {
  content: "";
  display: inline-block;
  border-bottom: 2px solid orange;
  width: 100%;
  position: absolute;
  bottom: 0;
  transition: transform 0.3s;
  left: 0;
  transform: translateX(-100%);
}
.blog-list .wrapper section .title:hover::after {
  transform: translateX(0);
}
.blog-list .wrapper section .info {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.blog-list .wrapper section .info li {
  margin-left: 15px;
  font-size: 0.8rem;
  color: #999;
}
.blog-list .wrapper section .description {
  padding: 1rem 2rem;
  color: #333;
  font-size: 1rem;
  text-align: left;
  line-height: 1.5rem;
}
.blog-list .wrapper section .bottom {
  padding: 1rem 2rem;
}
.blog-list .wrapper section .bottom a {
  font-size: 0.8rem;
  color: #777;
}
.blog-list .wrapper section .bottom a.tag {
  padding: 0.5rem;
  border-radius: 20px;
  transition: all 0.1s;
  background: #f1f1f1;
  font-weight: 700;
}
.blog-list .wrapper section .bottom a.tag:hover {
  color: #ff8a00;
}
.blog-list .wrapper section .bottom .read-more em {
  color: #999;
  margin-left: 2px;
}
.blog-list .wrapper section .bottom .read-more em:hover {
  color: #ff8a00;
}
.blog-list .wrapper section .bottom .icon-gengduo {
  color: #666;
  vertical-align: -5px;
}
</style>