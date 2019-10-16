<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import jwtDecode from 'jwt-decode';
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions([
      'set_admin', //this.set_admin() --> this.$store.dispatch('set_admin')
      'set_authenticated'
    ]),
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
</style>
