import Vue from 'vue'
import App from './App.vue'
import Api from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './static/css/main.css'
import router from './router'
import './static/js/vis-4.21.0/dist/vis.js'
import './static/js/vis-4.21.0/dist/vis.css'
import echarts from './static/js/echarts-4.6.0/dist/echarts.js'
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.prototype.$api = Api
Vue.config.productionTip = false

//给axios请求设置默认的token请求头
const token = window.sessionStorage.getItem("token");
Api.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
Api.defaults.headers['Authorization'] = token;
Api.defaults.headers.post['Content-Type'] = 'text/plain';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
