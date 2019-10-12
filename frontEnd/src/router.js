import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: []
    },
    {
      path: '/eidtEveDay',
      name: 'eidtEveDay',
      component: () => import('@/views/EditEveryDay.vue')
    },
    {
      path: '/editTechBlog',
      name: 'editTechBlog',
      component: () => import('@/views/EditTechBlog.vue')
    }
  ]
})
