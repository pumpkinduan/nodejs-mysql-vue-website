import Vue from 'vue'
import Router from 'vue-router'
// 首页要展示的组件页面归为home_group
const Home = () => import(/* webpackChunkName: "home_group" */ './views/Home.vue')
const Archives = () => import(/* webpackChunkName: "home_group" */ './views/Archives.vue')
const Categories = () => import(/* webpackChunkName: "home_group" */ './views/Categories.vue')
const ArticleList = () => import(/* webpackChunkName: "home_group" */ './views/ArticleList.vue')

const Tag = () => import(/* webpackChunkName: "tag_group" */ './views/Tag.vue')
const PhotoWall = () => import(/* webpackChunkName: "photoWall_group" */ './views/PhotoWall.vue')
const Detail = () => import(/* webpackChunkName: "detail_group" */ './views/Detail.vue')
const About = () => import(/* webpackChunkName: "about_group" */ './views/About.vue')
const Resume = () => import(/* webpackChunkName: "about_group" */ './views/Resume.vue')
const NotFound = () => import(/* webpackChunkName: "notFound_group" */ './views/NotFound.vue')
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
          component: ArticleList
        },
        {
          path: '/category',
          name: 'category',
          component: Categories
        },
        {
          path: '/tag/:tag',
          name: 'tag',
          component: Tag
        },
        {
          path: '/archive',
          name: 'archive',
          component: Archives
        }
      ]
    },
    {
      path: '/photoWall',
      name: 'photoWall',
      component: PhotoWall
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('./views/Article.vue'),
      children: [
        {
          path: 'detail/:articleId',
          name: 'detail',
          component: Detail
        }
      ]
    },
    {
      path: '/resume',
      name: 'resume',
      component: Resume
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {//捕获404页面，该路由须放置在最后，当其他路由未匹配到时将捕获404
      path: '/*',
      name: 'error',
      component: NotFound
    }
  ]
})
