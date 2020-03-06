import Vue from 'vue'
import '@/assets/css/quill.css'
import '@/assets/css/base.css'
import '@/assets/css/post-blog.css'
import '@/assets/css/highlight.css'
import router from './router'
import '@/js/generateHeart.js'
import '@/js/backToTop.js'
import { Carousel, CarouselItem, Dialog } from 'element-ui';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import App from './App.vue';
// 加载进度条插件的配置
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
})
Vue.prototype.NProgress = NProgress;
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
})
router.afterEach(() => {
  NProgress.done();
})

// 轮播图插件的使用
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Dialog);
Vue.config.productionTip = false; 
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
