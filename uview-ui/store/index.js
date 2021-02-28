import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		goodList: {
			data: '213',
			name: '',	
		},
		login: false,
		userInfo: null,

	},
	mutations: {
		setUserInfo(state, option) {
			if (option.user_cart !==undefined){
				option.user_cart.forEach(item=>{
					item.checkbox = false
				})
			}
			state.userInfo = option
		},
		setLogIn(state, Boolean) {
			state.login = Boolean
		},
		removeruserInfo(state){
			state.login = false
			state.userInfo = null
		},
		setGoodList(state, item) {
			state.goodList = item
		},
		setLIstGoodName(state, name) {
			state.name = name
		}
	},
	actions: {}
})
export default store
