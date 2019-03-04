// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
 
Vue.config.productionTip = false;
axios.defaults.withCredentials=true;
//axios.defaults.baseURL = "https://xiaoyc.com.cn/health";
axios.defaults.baseURL = 'http://localhost:8002';
Vue.prototype.$ajax = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
