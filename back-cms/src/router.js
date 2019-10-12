import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/login'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',//主页面
      component: Home
    },
    {
      path: '/login',//登录
      name: 'login',
      component: Login
    }
  ]
})
