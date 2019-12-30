<template>
  <el-container class="home">
    <el-header style="height: auto; padding: 0;">
      <HeaderNav @handleCollapse="handleCollapse" />
    </el-header>
    <el-container>
      <el-aside style="width: auto;">
        <SideMenu :isCollapse="isCollapse" />
      </el-aside>
      <el-main style="padding: 10px; margin-bottom: 20px; overflow: hidden;">
        <keep-alive include="PublishArticle,EditArticle">
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import HeaderNav from "@/components/HeaderNav";
import SideMenu from "@/components/SideMenu";
export default {
  components: {
    HeaderNav,
    SideMenu
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleCollapse(value) {
      this.isCollapse = value;
    }
  }
};
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
