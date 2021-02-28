import Vue from 'vue'
import App from './App'
//uview - ui
import uView from "uview-ui";
Vue.use(uView);
//vuex
import store from './store'
Vue.prototype.$store = store
//axios
import axios from 'js_sdk/axios-miniprogram/axios/es/index.js'
axios.defaults.baseURL = 'https://www.dcmaomi.com:3000'
// axios.defaults.baseURL = 'http://192.168.2.202:3000'
Vue.prototype.$http = axios
Vue.config.productionTip = false
//Router
import Router,{ RouterMount } from 'js_sdk/hhyang-uni-simple-router/index.js'
import routerLink from 'js_sdk/hhyang-uni-simple-router/component/router-link.vue'
Vue.component('router-link',routerLink)
import router from 'router'
Vue.use(Router)
//dayjs
import dayjs from './dayjs'
Vue.prototype.dayjs = dayjs
App.mpType = 'app'

axios.interceptors.request.use(config => {
	const token = uni.getStorageSync('token')
	config.headers.token = token
  //使用的这个方法后必须要 return 对象出去 不然会报错
  return config
}, err => {
  console.log(err)
})
const app = new Vue({
    ...App,
	store
})
// #ifdef H5
RouterMount(app,'#app');
// #endif

// #ifndef H5
//为了兼容小程序及app端必须这样写才有效果
app.$mount(); 
// #endif
