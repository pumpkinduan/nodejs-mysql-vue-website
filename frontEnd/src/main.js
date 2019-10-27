import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/base.css'
import '@/assets/iconfont/iconfont.css'
import router from './router'
import axios from 'axios'
import '@/js/generateHeart.js'
import '@/js/backToTop.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false; 
Vue.use(ElementUI);
Vue.prototype.$axios = axios//让所有vue实例都可以使用$axios发送网络请求
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
