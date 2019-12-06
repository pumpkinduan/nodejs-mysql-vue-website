<template>
  <div class="article">
    <transition name="fade">
      <div class="wrapper">
        <Header />
        <main class="box">
          <router-view></router-view>
        </main>
      </div>
    </transition>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.box {
  background-color: #f1f1f1;
}
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