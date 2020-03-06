import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import( /* webpackChunkName: "home_group" */ './views/Home')
const Auth = () => import( /* webpackChunkName: "home_group" */ './views/admin/auth')
const PublishArticle = () => import( /* webpackChunkName: "publishArticle" */ './views/article/publishArticle')
const ArticleList = () => import( /* webpackChunkName: "articleList" */ './views/article/articleList')
const EditArticle = () => import( /* webpackChunkName: "editArticle" */ './views/article/editArticle')
const PhotoPublish = () => import( /* webpackChunkName: "photo" */ './views/photo/photoPublish')
const PhotoList = () => import( /* webpackChunkName: "photo" */ './views/photo/photoList')
const CommentList = () => import( /* webpackChunkName: "comment" */ './views/comment/commentList')
const ReplyList = () => import( /* webpackChunkName: "reply" */ './views/reply/replyList')
const Login = () => import( /* webpackChunkName: "login_group" */ './views/admin/login')
// const Register =() => import(/* webpackChunkName: "login_group" */ './views/admin/register')
const Error = () => import( /* webpackChunkName: "error" */ './views/notFound')
Vue.use(Router)
const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/admin'
    },
    {
      path: '/admin',
      name: 'home', //主页面
      component: Home,
      redirect: '/admin/auth',
      children: [{
          path: 'auth',
          name: 'Auth',
          meta: {
            title: '个人中心',
            breadcrumb: "首页"
          },
          component: Auth
        },
        {
          path: 'publishArticle',
          name: 'PublishArticle',
          meta: {
            title: '发布文章',
            breadcrumb: "文章管理"
          },
          component: PublishArticle
        },
        {
          path: 'articleList',
          name: 'ArticleList',
          meta: {
            title: '文章列表',
            breadcrumb: "文章管理"
          },
          component: ArticleList
        },
        {
          path: 'editArticle',
          name: 'EditArticle',
          meta: {
            title: '编辑文章',
            breadcrumb: "文章管理"
          },
          component: EditArticle
        },
        {
          path: 'photoPublish',
          name: 'PhotoPublish',
          meta: {
            title: '发布图片',
            breadcrumb: "相册墙"
          },
          component: PhotoPublish
        },
        {
          path: 'photoList',
          name: 'PhotoList',
          meta: {
            title: '相册数据',
            breadcrumb: "相册墙"
          },
          component: PhotoList
        },
        {
          path: 'commentList',
          name: 'CommentList',
          meta: {
            title: '留言列表',
            breadcrumb: false
          },
          component: CommentList
        },
        {
          path: 'replyList',
          name: 'ReplyList',
          meta: {
            title: '回复列表',
            breadcrumb: false
          },
          component: ReplyList
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // {
    //   path: '/register',
    //   name: 'Register',
    //   component: Register
    // },
    { //捕获404页面，该路由须放置在最后，当其他路由未匹配到时将捕获404
      path: '/*',
      name: 'error',
      component: Error
    }
  ]
})
//全局路由守卫，须先登录后访问主页面
router.beforeEach((to, from, next) => {
  if (to.path == '/login'
    // || to.path == '/register'
  ) {
    next();
  } else {
    localStorage.getItem('token') && localStorage.getItem('isAuthenticated') ? next() : next({
      name: 'login'
    });
  }
})
export default router