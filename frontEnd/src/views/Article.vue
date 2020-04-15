<template>
  <div class="article">
    <div class="wrapper">
      <Header :opacity="1" bgc="#fff" />
      <router-view></router-view>
    </div>
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
<style lang="less" scoped>
.article {
  padding: 100px 30px;
}
@media screen and (max-width: 768px) {
  .article {
    padding: 66px 0;
  }
}
</style>
