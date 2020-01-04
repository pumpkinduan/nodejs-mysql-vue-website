<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item,index) in levelList" :key="index">
      <span class="no-link">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: ["menu", "levelList"],
};
</script>

<style scoped>
.el-breadcrumb {
  padding: 10px 0 15px 0;
}
.no-link {
    font-size: 14px;
    font-weight: 500;
}
</style>