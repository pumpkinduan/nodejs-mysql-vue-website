<template>
  <el-container class="home">
    <el-header style="height: auto; padding: 0;">
      <HeaderNav />
    </el-header>
    <el-container>
      <el-aside style="width: 240px;">
        <SideMenu />
      </el-aside>
      <el-main style="padding: 10px; margin-bottom: 20px;">
          <router-view />
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
  }
};
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
