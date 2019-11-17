<template>
  <div class="article">
    <Loading />
    <transition name="fade">
      <div class="wrapper" v-show="!$store.state.showLoading">
        <header>
          <Header />
        </header>
        <main>
          <router-view></router-view>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </transition>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
export default {
  components: {
    Header,
    Footer,
    Loading
  },
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    next(vm => (vm.$store.state.showLoading = true));
  },
  created() {}
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>