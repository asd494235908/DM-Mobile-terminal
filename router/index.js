import modules from './modules'
import Vue from 'vue'
// import store from '/store'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'js_sdk/hhyang-uni-simple-router/index.js'
import axios from 'js_sdk/axios-miniprogram/axios/es/index.js'
import store from '@/store'
Vue.use(Router)
//初始化
const router = new Router({
	APP: {
		holdTabbar: false //默认是true
	},
	 mode: 'history',
	routes: [...modules] //路由表
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	axios.post('/api/validate', {})
	.then(res => {
		// console.log('我发送validate请求了')
		const data = res.data
		// console.log(data)
		if (data.success !== true) {
			// 用户要登录
			// console.log('需要登陆')
			store.commit('setisValidate', res.data.isValidate)
			for (let i in to) {
				if (i === 'myDiy') {
					// console.log('执行跳转login')
					// uni.navigateTo({
					// 	url: '/pages/login/index'
					// })
				} else(
					next()
				)
			}
		} else {
			//是登录状态的话保存用户信息
			store.commit('setLogIn', true)
			store.commit('setUserInfo', res.data.data)
			store.commit('setisValidate', res.data.isValidate)
			// console.log('保存用户数据成功')
			uni.setStorage({
				key: 'token',
				data: data.token,
				success: () => {
					// console.log("储存token成功");
				}
			})
			if (to.path === '/pages/login/index') {
				// console.log('执行跳转主页面')
				// next({
				// 	path: '/',
				// 	NAVTYPE: 'push'
				// })
				// uni.navigateTo({
				// 	url: '/pages/login/index'
				// })
				// uni.redirectTo({
				// 	url: '/'
				// })
			}
			next()
		}
	}).catch(err => {
		console.log(err)
	})
})
// 全局路由后置守卫
router.afterEach((to, from) => {})
export default router;
