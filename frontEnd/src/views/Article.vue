<template>
  <div class="article">
      <div class="wrapper">
        <Header :opacity="1" bgc="#fff" />
        <main class="main-block">
          <router-view></router-view>
        </main>
      </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: {
    Header
  }
};
</script>

<style scoped>
</style>