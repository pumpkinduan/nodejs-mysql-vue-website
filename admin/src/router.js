import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Error from './views/notFound.vue'
Vue.use(Router)
const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/admin'
    },
    {
      path: '/admin',
      name: 'home',//主页面
      component: Home,
      children: [
        {
          path: 'auth',
          name: 'Auth',
          component: () => import("./views/admin/auth")
        },
        {
          path: 'publishArticle',
          name: 'PublishArticle',
          component: () => import("./views/article/publishArticle")
        },
        {
          path: 'articleList',
          name: 'ArticleList',
          component: () => import("./views/article/articleList")
        },
         {
          path: 'editArticle',
          name: 'EditArticle',
          component: () => import("./views/article/editArticle")
        },
        {
          path: 'publishQuotation',
          name: 'PublishQuotation',
          component: () => import("./views/quotation/publishQuotation")
        },
        {
          path: 'quotationList',
          name: 'QuotationList',
          component: () => import("./views/quotation/quotationList")
        },
        {
          path: 'commentList',
          name: 'CommentList',
          component: () => import("./views/comment/commentList")
        },
        {
          path: 'replyList',
          name: 'ReplyList',
          component: () => import("./views/reply/replyList")
        }
      ]
    },
    {
      path: '/admin/login',//登录
      name: 'login',
      component: () => import('./views/admin/login')
    },
    {
      path: '/admin/register',//注册
      name: 'register',
      component: () => import('./views/admin/register')
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
  if (to.path == '/admin/login' || to.path == '/admin/register') {
    next();
  } else {
    localStorage.getItem('token') && localStorage.getItem('isAuthenticated') ? next() : next({name: 'login'});
  }
})
export default router
