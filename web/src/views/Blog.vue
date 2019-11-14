<template>
  <div class="blogs">
    <Header />
    <BlogList
      :blogLists="blogLists"
      :commentSize="commentSize"
      :pageSize="pageSize"
      @getData="getData"
    />
  </div>
</template>

<script>
import BlogList from "@/components/BlogList";
import Header from "@/components/Header.vue";
import Pagination from "@/components/Pagination";
import api from "@/api/index.js";
export default {
  components: {
    BlogList,
    Header,
    Pagination
  },
  data() {
    return {
      blogLists: [],
      pageSize: 5,
      curPage: 1,
      commentSize: 0,
      cachedBlogs: new Map()
    };
  },
  created() {
    api
      .getBlogList(1)
      .then(result => {
        this.blogLists = result.data.data;
        this.cachedBlogs.set(1, this.blogLists); //缓存第一页数据
        this.pageSize = parseInt(result.data.meta.pageSize);
        this.commentSize = parseInt(result.data.meta.count);
      })
      .catch(err => {
        this.blogList = []; //数据为空
        console.log(err);
      });
  },
  methods: {
    getData(page = 1) {
      if (this.cachedBlogs.has(page)) {
        this.blogLists = this.cachedBlogs.get(page);
      } else {
        api.getBlogList(page).then(res => {
          if (res.data) {
            this.blogLists = res.data.data;
            this.cachedBlogs.set(page, this.blogLists); //缓存第一页数据
          }
        });
      }
    }
  }
};
</script>

<style scoped>
</style>