import Vue from 'vue'
import '@/assets/css/lib/quill.css'
import '@/assets/css/base.less'
import '@/assets/css/post-nav.less'
import '@/assets/css/lib/highlight.css'
import router from './router'
import '@/tool/generateHeart.js'
import '@/tool/backToTop.js'
import { Carousel, CarouselItem, Dialog } from 'element-ui';
import NProgress from 'nprogress'
import App from './App.vue';

// 加载进度条插件的配置
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
})
Vue.NProgress = Vue.prototype.NProgress = NProgress;
// router.beforeEach((to, from, next) => {
//   NProgress.start();
//   next();
// })
// router.afterEach(() => {
//   NProgress.done();
// })

// 轮播图插件的使用
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Dialog);

Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App)
}).$mount('#pumpkin')
