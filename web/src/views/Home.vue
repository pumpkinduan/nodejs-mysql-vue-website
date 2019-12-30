<template>
  <div class="home">
    <Header />
    <main class="main-bgc">
      <div class="main-inner clearfix">
        <aside class="left-aside fl" ref="main">
          <transition appear name="fade" mode="out-in">
            <router-view />
          </transition>
        </aside>
        <aside class="right-aside fr">
          <AsideBar />
        </aside>
      </div>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>
<script>
import AsideBar from "@/components/AsideBar";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer";
export default {
  components: {
    Header,
    Footer,
    AsideBar
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

