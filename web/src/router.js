import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Categories from './views/Categories.vue'
import Archives from './views/Archives.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        default: Home
      },
      children: [
        {
          path: '/',
          name: 'articleList',
          component: () => import('./views/ArticleList.vue')
        },
        {
          path: '/category',
          name: 'category',
          component: Categories
        },
        {
          path: '/archive/:tag',
          name: 'archive',
          component: Archives
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
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) { return savedPosition }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 0);
    });
  }
})
