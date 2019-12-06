<template>
  <div id="app">
    <transition appear name="fade" mode="out-in">
        <router-view />
    </transition>
  </div>
</template>
<script>
export default {
};
</script>  
<style scoped>
#app {
  width: 100%;
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