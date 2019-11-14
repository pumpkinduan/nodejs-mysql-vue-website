import axios from 'axios';
import config from './config';
import { Loading, Message } from 'element-ui';
let lodingInstancer = null;
const axiosInstance = axios.create({
  baseURL: config.serverUrl,
  timeout: 6000
})
// start loading
function startLoading() {
    lodingInstancer = Loading.service({
        text: '主人，马上加载好了',
        fullscreen: false,
        background: 'rgba(0, 0, 0, 0.85)'
    });
}
//请求拦截
axiosInstance.interceptors.request.use((config) => {
    startLoading(); //加载动画
    //http请求头 设置Authorization, 进行身份认证
    if (localStorage.getItem('token')) {
        config.headers.Authorization = localStorage.getItem('token');
    }
    return config;
}, function (err) {
    return Promise.reject(err)
})

//end loading
function endLoading(response) {
    lodingInstancer.close();
}
//响应拦截
axiosInstance.interceptors.response.use((response) => {
    endLoading();
    return response;
}, function (err) {
    endLoading();
    //可以捕获到错误对象，并获取后端发过来的对象信息，不截取则无法获取
    const { status } = err.response;
    if (status == 401) {
        Message.error('登录失败,token已经失效');
        localStorage.removeItem('token');
        window.location = '/login';
    } else if (status == 400) {
        if (err.response.data.msg == "账号不存在，请先注册") {
            Message.error(err.response.data.msg);
            setTimeout(() => {
                window.location = '/register';
            }, 1000);
        } else {
            Message.error(err.response.data.msg);
        }
    } else {
        Message.error(err.response.data.msg);
    }
    return Promise.reject(err)
})
export {
    axiosInstance
}