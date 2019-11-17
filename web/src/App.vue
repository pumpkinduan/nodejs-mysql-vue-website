<template>
  <div id="app">
    <Loading />
    <transition appear name="fade" mode="out-in">
      <keep-alive :include="['Home']">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import Loading from "@/components/Loading";
export default {
  components: {
    Loading
  }
};
</script>  
<style scoped>
#app {
  width: 100%;
  height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>