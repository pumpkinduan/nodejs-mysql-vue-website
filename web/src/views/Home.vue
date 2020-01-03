<template>
  <div class="home">
    <Header />
    <main class="main-block">
      <div class="main-inner clearfix">
        <aside class="left-aside fl" ref="main">
          <transition appear name="fade" mode="out-in">
            <router-view :categories="categories" :categories_count="categories_count" />
          </transition>
        </aside>
        <aside class="right-aside fr">
          <AsideBar :categories_count="categories_count" :archive_count="archive_count" />
        </aside>
      </div>
    </main>
    <Footer />
  </div>
</template>
<script>
import AsideBar from "@/components/AsideBar";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer";
import api from "@/api/article.js";
export default {
  components: {
    Header,
    Footer,
    AsideBar
  },
  data() {
    return {
      archive_count: "",
      categories_count: "",
      categories: [],
      archives: []
    };
  },
  created() {
    api.getCategories().then(res => {
      if (res.data) {
        this.categories_count = res.data.meta.categories_count;
        this.categories = res.data.data;
      }
    });
    api.getArchives().then(res => {
      if (res.data) {
        this.archive_count = res.data.meta.count;
        this.archives = res.data.data;
      }
    });
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
}
.home main .main-inner {
  position: relative;
}
.home main .main-inner .left-aside {
  width: 780px;
}
.home main .main-inner .right-aside {
  position: sticky;
  top: 80px;
  width: 320px;
  margin-right: 1rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

