import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/admin/login'
import Register from './views/admin/register'
import Error from './views/notFound.vue'
import PublishArticle from "./views/article/publishArticle";
import ArticleList from "./views/article/articleList";
import EditArticle from "./views/article/editArticle";
import PublishQuotation from "./views/quotation/publishQuotation";
import EditQuotation from "./views/quotation/editQuotation";
import QuotationList from "./views/quotation/quotationList";
import PublishMe from "./views/me/publishMe";
import EditMe from "./views/me/editMe";
import MeList from "./views/me/meList";
import CommentList from "./views/comment/commentList";
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
        },
        {
          path: 'quotationList',
          name: 'PublishMe',
          component: PublishMe
        },
        {
          path: 'commentList',
          name: 'CommentList',
          component: CommentList
        },
        {
          path: 'editMe',
          name: 'EditMe',
          component: EditMe
        },
        {
          path: 'meList',
          name: 'MeList',
          component: MeList
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
