<template>
  <div class="home">
    <Header />
    <main class="clearfix main-bgc" ref='main' >
      <aside class="left-aside fl">
        <router-view/>
        <!-- <BlogList
          :blogLists="blogLists"
          :commentSize="commentSize"
          :pageSize="pageSize"
          @getData="getData"
        /> -->
      </aside>
      <aside class="right-aside fr">
        <AsideBar />         
      </aside>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>
<script>
import AsideBar from "@/components/AsideBar";
// import BlogList from "@/components/BlogList";
import Header from "@/components/Header.vue";
import Pagination from "@/components/Pagination";
// import api from "@/api/index.js";
import Footer from "@/components/Footer";
export default {
  name: "Home",
  components: {
    Header,
    Footer,
    // BlogList,
    AsideBar
  },
  data() {
    return {
      // blogLists: [],
      // pageSize: 5,
      // curPage: 1,
      // commentSize: 0,
      // cachedBlogs: new Map()
    };
  },
  created() {
    // api
    //   .getBlogList(1)
    //   .then(result => {
    //     this.blogLists = result.data.data;
    //     this.cachedBlogs.set(1, this.blogLists); //缓存第一页数据
    //     this.pageSize = parseInt(result.data.meta.pageSize);
    //     this.commentSize = parseInt(result.data.meta.count);
    //   })
    //   .catch(err => {
    //     this.blogList = []; //数据为空
    //   });
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
.home {
  width: 100%;
  height: 100%;
}
.home main .left-aside {
  width: 780px;
}
.home main .right-aside {
  width: 320px;
  margin-right: 1rem;
}

</style>

