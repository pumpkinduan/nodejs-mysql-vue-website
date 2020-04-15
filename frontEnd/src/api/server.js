import axios from "axios";
// import Vue from "vue";
//进行全局的默认配置
axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "http://pumpkinduan.cn/api" : "http://localhost:8088/api";
axios.defaults.timeout = 10000;
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // Vue.NProgress.start();
    return config;
  },
  function(error) {
    // Vue.NProgress.done();
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // Vue.NProgress.done();
    return response;
  },
  function(error) {
    let resErr = error;
    if (error.response) {
      resErr = error.response.data;
    }
    // Vue.NProgress.done();
    return Promise.reject(resErr);
  }
);

//封装get、post、put、delete请求
export default {
  get(path, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(path, {
          params
        })
        .then(
          response => {
            resolve(response.data);
          },
          error => {
            reject(error);
          }
        );
    });
  },
  post(path, data) {
    return new Promise((resolve, reject) => {
      axios.post(path, data).then(
        response => {
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
    });
  },
  put(path, data) {
    return new Promise((resolve, reject) => {
        axios.put(path, data).then(
          response => {
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
  }
};
