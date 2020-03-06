<template>
  <div class="home">
    <Header />
    <main>
      <div class="banner-wave-transition">
        <div class="wave1"></div>
        <div class="wave2"></div>
      </div>
      <div class="main-inner clearfix">
        <aside class="left-aside fl" ref="main">
          <transition appear mode="out-in">
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
  min-height: 100%;
  position: relative;
  padding-bottom: 300px;
}
.home main {
  padding: 36rem 4rem 5rem;
}
.home main::before {
  color: #f2f2f2;
  font-size: 3rem;
  text-align: center;
  content: "Hey, Guys!";
  font-weight: bold;
  width: 100%;
  height: 32rem;
  line-height: 33rem;
  background: url("../assets/image/banner.png") center center
    no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
}
.home main,
.main-inner {
  position: relative;
}
.home main .banner-wave-transition {
  width: 100%;
  position: absolute;
  top: 28rem;
  left: 0;
  overflow-x: hidden;
  height: 4rem;
}
.home main .banner-wave-transition div {
  width: 600%;
  height: 100%;
  position: absolute;
}
.home main .banner-wave-transition .wave1 {
  left: -120rem;
  top: 0;
  background: url("../assets/image/wave1.png") repeat-x;
  animation: wave1 30s infinite linear;
}
.home main .banner-wave-transition .wave2 {
  left: -100rem;
  top: 0;
  background: url("../assets/image/wave2.png") repeat-x;
  animation: wave2 60s infinite linear;
}
@keyframes wave1 {
  0% {
    left: -120rem;
  }
  100% {
    left: -40rem;
  }
}
@keyframes wave2 {
  0% {
    left: -100rem;
  }
  100% {
    left: -60rem;
  }
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
@media screen and (max-width: 780px) {
  .home main {
    padding: 36rem 1rem 2rem;
  }
  .home main .main-inner .left-aside {
    width: 100%;
  }
}
@media screen and (max-width: 1280px) {
  .home main .main-inner .right-aside {
    display: none;
  }
}
</style>

