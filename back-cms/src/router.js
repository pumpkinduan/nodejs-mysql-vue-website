import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/admin/login'
import Register from './views/admin/register'
import Error from './views/notFound.vue'
import PublishArticle from "./views/article/PublishArticle";
import ArticleList from "./views/article/ArticleList";
import EditArticle from "./views/article/EditArticle";
import PublishQuotation from "./views/quotation/PublishQuotation";
import EditQuotation from "./views/quotation/EditQuotation";
import QuotationList from "./views/quotation/QuotationList";
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
          name: 'PublishArticle',
          component: PublishArticle
        },
        {
          path: 'articleList',
          name: 'ArticleList',
          component: ArticleList
        },
        {
          path: 'editArticle',
          name: 'EditArticle',
          component: EditArticle
        },
        {
          path: 'publishQuotation',
          name: 'PublishQuotation',
          component: PublishQuotation
        },
        {
          path: 'editQuotation',
          name: 'EditQuotation',
          component: EditQuotation
        },
        {
          path: 'quotationList',
          name: 'QuotationList',
          component: QuotationList
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
    {//捕获404页面，该路由须放置在最后，当其他路由未匹配到时将捕获404
      path: '/*',
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
