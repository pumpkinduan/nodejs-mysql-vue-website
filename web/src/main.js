import Vue from 'vue'
import '@/assets/css/quill.css'
import '@/assets/css/base.css'
import '@/assets/css/post-blog.css'
import router from './router'
import '@/js/generateHeart.js'
import '@/js/backToTop.js'
import { Carousel, CarouselItem, Dialog } from 'element-ui';
import App from './App.vue';

Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Dialog);
Vue.config.productionTip = false; 
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
