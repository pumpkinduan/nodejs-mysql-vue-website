import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Article from './views/Article.vue'
import Detail from './views/Detail.vue'
import Error from './views/NotFound.vue'
import About from './views/About.vue'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/article',
      name: 'article',
      component: Article,
      children: [
        {
          path: 'details/:articleId',
          name: 'detail',
          component: Detail 
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {//捕获404页面，该路由须放置在最后，当其他路由未匹配到时将捕获404
      path: '/*',
      name: 'error',
      component: Error
    }
  ]
})
