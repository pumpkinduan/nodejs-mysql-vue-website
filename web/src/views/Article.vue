<template>
  <div class="article">
    <transition name="fade">
      <div class="wrapper">
        <Header />
        <main class="main-block">
          <router-view></router-view>
        </main>
      </div>
    </transition>
  </div>
</template>

<script>
import Header from '@/components/Header';
export default {
  components: {
    Header
  }
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