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
      redirect: '/admin/auth',
      children: [
        {
          path: 'auth',
          name: 'Auth',
          meta: {
            title: '个人中心',
            breadcrumb: "首页"
          },
          component: () => import("./views/admin/auth")
        },
        {
          path: 'publishArticle',
          name: 'PublishArticle',
          meta: {
            title: '发布文章',
            breadcrumb: "文章管理"
          },
          component: () => import("./views/article/publishArticle")
        },
        {
          path: 'articleList',
          name: 'ArticleList',
          meta: {
            title: '文章列表',
            breadcrumb: "文章管理"
          },
          component: () => import("./views/article/articleList")
        },
        {
          path: 'editArticle',
          name: 'EditArticle',
          meta: {
            title: '编辑文章',
            breadcrumb: "文章管理"
          },
          component: () => import("./views/article/editArticle")
        },
        {
          path: 'photoPublish',
          name: 'PhotoPublish',
          meta: {
            title: '发布图片',
            breadcrumb: "相册墙"
          },
          component: () => import("./views/photo/photoPublish")
        },
        {
          path: 'photoList',
          name: 'PhotoList',
          meta: {
            title: '相册数据',
            breadcrumb: "相册墙"
          },
          component: () => import("./views/photo/photoList")
        },
        {
          path: 'commentList',
          name: 'CommentList',
          meta: {
            title: '留言列表',
            breadcrumb: false
          },
          component: () => import("./views/comment/commentList")
        },
        {
          path: 'replyList',
          name: 'ReplyList',
          meta: {
            title: '回复列表',
            breadcrumb: false
          },
          component: () => import("./views/reply/replyList")
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/admin/login')
    },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: () => import('./views/admin/register')
    // },
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
    localStorage.getItem('token') && localStorage.getItem('isAuthenticated') ? next() : next({ name: 'login' });
  }
})
export default router
