import axios from 'axios';
import store from './store'
//全局的拦截配置
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8088',
  timeout: 6000
})
const myInterceptor = axiosInstance.interceptors.request.use((config) => {
    store.state.showLoading = true;
    return config;
  })
  axiosInstance.interceptors.response.use((response) => {
   store.state.showLoading = false;
    return response;
  }, (err) => {
    store.state.showLoading = false;
    return Promise.reject(err.response.data)
  })
const instance = axios.create({
  baseURL: 'http://localhost:8088',
  timeout: 2000
});
export {
  axiosInstance,
    instance
}
  