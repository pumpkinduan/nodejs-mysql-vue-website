<template>
  <div class="home">
    <Header />
    <EveryDay />
    <TechBlog />
    <footer></footer>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import EveryDay from "@/components/EveryDay.vue";
import TechBlog from "@/components/TechBlog.vue";
export default {
  components: {
    Header,
    EveryDay,
    TechBlog
  }
};
</script>

<style scoped>
  .home {
    width: 100%;
    height: 100%;
  }
</style>

