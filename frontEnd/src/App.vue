<template>
  <div id="app">
    <transition appear mode="out-in">
        <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  watch: {
    '$route': () => {
      document.getElementById('backToTop').click();
    }
  }
};
</script>  
<style scoped>
#app {
  width: 100%;
  min-height: 100%;
  background: #f5f7f9;
}
</style>