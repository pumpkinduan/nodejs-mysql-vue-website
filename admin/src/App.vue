<template>
  <div id="app">
    <router-view />
    <template>
      <el-backtop :bottom="100">
        <i class="el-icon-top"></i>
      </el-backtop>
    </template>
  </div>
</template>
<script>
import jwtDecode from 'jwt-decode';
import { mapActions } from 'vuex';

export default {
  name: 'home',
  methods: {
    ...mapActions([
      'set_admin', //this.set_admin() --> this.$store.dispatch('set_admin')
      'set_authenticated'
    ])
  },
  created() {
    const token = localStorage.token;
    if (token) {
      const decoded = jwtDecode(token);
      this.set_admin(decoded);
      this.set_authenticated(true); //表示登录成功
    } else {
      this.set_authenticated(false);
    }
  }
};
</script>
<style>
#app {
  width: 100%;
  height: 100%;
}
.el-icon-top {
  font-size: 16px;
  font-weight: 700;
}
</style>
