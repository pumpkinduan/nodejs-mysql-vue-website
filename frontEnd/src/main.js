import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/base.css'
import router from './router'
import store from './store'
import  axios from 'axios'
import '@/js/generateHeart.js'
import '@/js/backToTop.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
axios.interceptors.request.use((config) => {
  store.state.showLoading = true;
  return config;
})
axios.interceptors.response.use((response) => {
 store.state.showLoading = false;
  store.state.showLoading = false;
  return response;
}, (err) => {
  store.state.showLoading = false;
  return Promise.reject(err)
})
Vue.config.productionTip = false; 
Vue.use(ElementUI);
Vue.prototype.$axios = axios//让所有vue实例都可以使用$axios发送网络请求
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
