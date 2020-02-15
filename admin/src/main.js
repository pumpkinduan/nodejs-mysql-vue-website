import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import hljs from "highlight.js";
import 'highlight.js/styles/railscasts.css';
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import '@/assets/style/base.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
window.hljs = hljs;
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
