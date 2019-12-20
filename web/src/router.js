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
      components: {
        default: Home
      },
      children: [
        {
          path: '/',
          name: 'blogList',
          component: () => import('./components/BlogList.vue')
        },
        {
          path: '/category',
          name: 'category',
          component: () => import('./components/Category.vue')
        }
      ]
    },
    {
      path: '/photoWall',
      name: 'photoWall',
      component: () => import('./views/PhotoWall.vue')
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('./views/Article.vue'),
      children: [
        {
          path: 'detail/:articleId',
          name: 'detail',
          component: () => import('./views/Detail.vue') 
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {//捕获404页面，该路由须放置在最后，当其他路由未匹配到时将捕获404
      path: '/*',
      name: 'error',
      component: () => import('./views/NotFound.vue') 
    }
  ]
})
