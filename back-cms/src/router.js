import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/admin/login'
import Register from './views/admin/register'
import Error from './views/notFound.vue'
import PublishArticle from "./views/article/PublishArticle";
import ArticleList from "./views/article/ArticleList";
import EditArticle from "./views/article/EditArticle";
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',//主页面
      component: Home,
      children: [
        {
          path: 'publishArticle',
          component: PublishArticle
        },
        {
          path: 'articleList',
          component: ArticleList
        },
        {
          path: 'editArticle',
          component: EditArticle
        }
      ]
    },
    {
      path: '/login',//登录
      name: 'login',
      component: Login
    },
    {
      path: '/register',//注册
      name: 'register',
      component: Register
    },
    {//捕获404页面，该路由须放置在最后，当其他路由为匹配到时将捕获404
      path: '*',
      name: 'error',
      component: Error
    }
  ]
})
//全局路由守卫，须先登录后访问主页面
router.beforeEach((to, from, next) => {
  if (to.path == '/login' || to.path == '/register') {
    next();
  } else {
    localStorage.getItem('token') && localStorage.getItem('isAuthenticated') ? next() : next('/login');
  }
})
export default router
