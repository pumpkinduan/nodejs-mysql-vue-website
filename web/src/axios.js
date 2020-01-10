import axios from 'axios'
import config from './config'
const axiosInstance = axios.create({
  baseURL: config.serverUrl,
  timeout: 6000
});
//响应拦截
axiosInstance.interceptors.response.use((response) => {
  return response;
}, function (err) {
  //可以捕获到错误对象，并获取后端发过来的对象信息，不截取则无法获取
  // const { status } = err.response;
  if (!err.response) return Promise.reject(err)
  return Promise.reject(err.response.data)
})
export {
  axiosInstance
}
  