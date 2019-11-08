import axios from 'axios';
import Vue from 'vue'
import store from './store'
//全局的拦截配置
const myInterceptor = axios.interceptors.request.use((config) => {
    store.state.showLoading = true;
    return config;
  })
  axios.interceptors.response.use((response) => {
   store.state.showLoading = false;
    return response;
  }, (err) => {
    store.state.showLoading = false;
    return Promise.reject(err.response.data)
  })
  //针对某一请求的拦截配置
const instance = axios.create();
instance.interceptors.request.eject(myInterceptor);
Vue.prototype.$axios = axios//让所有vue实例都可以使用$axios发送网络请求
export default {
    axios,
    instance
}
  