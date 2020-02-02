import Vue from 'vue'
import '@/assets/css/quill.css'
import '@/assets/css/base.css'
import '@/assets/css/post-blog.css'
import router from './router'
import '@/js/generateHeart.js'
import '@/js/backToTop.js'
import { Carousel, CarouselItem, Dialog } from 'element-ui';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import App from './App.vue';
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
})
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
})
router.afterEach(() => {
  NProgress.done();
})
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Dialog);
Vue.config.productionTip = false; 
Vue.prototype.bus = new Vue();
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
