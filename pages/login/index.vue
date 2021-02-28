<template>
	<view class="my-warp">
		<uni-nav-bar class="nav" :fixed="true" background-color="transparent" :border="false">
			<view slot="left">
				<u-icon name="arrow-left" size="40" class="nav-icon" @click="banck"></u-icon>
			</view>
			<view slot="default" class="text-center ">
				个人中心
			</view>
		</uni-nav-bar>
		<view class="user-warp">

		</view>
		
		<view class="login-warp">
			<view class="login-top">
				登录
			</view>
			<view class="login-content">
				
				<view class="user-name" :class="{isUserActive:userActive}">
					<u-icon name="account-fill" color="#999" size="28" class="user-name-icon"></u-icon>
					<u-input confirm-type="完成" :maxlength="11" style="flex: 1;" @focus="userFocus" @blur="userBlur" v-model="userInfo.username"
					 :border="false" placeholder="请输入用户名" type="text" />
				</view>
				<view class="user-pwd" :class="{isPwdActive:pwdActive}">
					<u-icon name="lock-fill" color="#999" size="28" class="user-name-icon"></u-icon>
					<u-input style="flex: 1;" @focus="pwdFocus" @blur="pwdBlur" v-model="userInfo.pwd" type="password" :border="false"
					 :clearable="true" placeholder="请输入密码" class="user-pwd-input" :password-icon="true" @confirm="logIn" />
				</view>
				<view class="user-text">
					<text class="user-info-err" :class="{errActive:userInfoErr}">账号或者密码输入错误</text>
					<text @click="alterShouw">忘记密码？</text>
				</view>
			</view>
			<view class="login-bottom">
				<u-button class="btn" :isClass="true" :ripple="true" type="primary" shape="circle" @click="logIn">登 录</u-button>
			</view>
		</view>
		<u-modal v-model="motai.show" :content="motai.content" :show-cancel-button="false" confirm-color="#FBAB7E" ></u-modal>
		
		<!-- #ifndef H5 -->
		<u-divider color="#4b4c4d" half-width="200" border-color="#dcdfe6" margin-top="60">其他登陆方式</u-divider>
		<view class="login-moder">
			<!-- #ifndef MP-WEIXIN ||MP-QQ-->
			<image :src="isqqBg" mode="widthFix" class="user-name-qq" @click="qqLogIn"></image>
			<!-- <image src="https://s1.ax1x.com/2020/10/16/0767xe.png" mode="widthFix" class="user-name-weixn" @click="weixinLogIN"></image> -->
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN ||MP-QQ -->
			<text class="login-moder_text">开发中</text>
			<!-- #endif -->
			<!-- <u-icon name="weixin-circle-fill" color="#00a7fa" size="100" class="user-name-weixn"></u-icon> -->
			<!-- <u-icon name="qq-circle-fill" color="#00d912" size="100" class="user-name-qq"></u-icon> -->

		</view>
		<!-- #endif -->

		<my-loading :show="isLoading"></my-loading>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import MyLoading from '../../components/my-loading'
	export default {
		data() {
			return {
				isLoading: false,
				userInfo: {
					username: '',
					pwd: ''
				},
				userActive: false,
				pwdActive: false,
				userInfoErr: false,
				motai: {
					show: true,
					content: '账号admin,密码admin'
				},
			}
		},
		created() {},
		components: {
			uniNavBar,
			MyLoading
		},
		computed: {
			newUserName() {
				return this.userInfo.username
			},
			newPwd() {
				return this.userInfo.pwd
			},
			isqqBg(){
				// #ifndef MP-WEIXIN ||MP-QQ
				return '../../static/imges/qq.png'
				// #endif
				// #ifdef MP-WEIXIN ||MP-QQ
				return 'https://s1.ax1x.com/2020/10/16/076bKH.png'
				// #endif
			}
		},
		watch: {
			newUserName(x, y) {
				if (x === '') {
					this.userActive = false
				}
			},
			newPwd(x, y) {
				if (x === '') {
					this.pwdActive = false
				}
			},
		},
		methods: {
			...mapMutations(['setUserInfo', 'setLogIn']),
			alterShouw() {
				this.motai.show = true
			},
			userFocus() {
				this.userActive = true
			},
			userBlur() {
				uni.hideKeyboard()
				if (this.userInfo.username === '') {

					this.userActive = false
				} else {
					this.userActive = true
				}

			},
			pwdFocus() {
				this.pwdActive = true
			},
			pwdBlur() {
				uni.hideKeyboard()
				if (this.userInfo.pwd === '') {
					this.pwdActive = false
				} else {
					this.pwdActive = true
				}
			},
			banck() {
				let page = getCurrentPages()
				uni.navigateBack({
					delta: page.length - 1
				})
			},

			// #ifndef H5
			qqLogIn() {
				this.isLoading = true
				const self = this
				uni.login({
					provider: 'qq',
					success: function(loginRes) {
						uni.getUserInfo({
							provider: 'qq',
							success: function(infoRes) {
								const name = infoRes.userInfo.nickName
								const id = infoRes.userInfo.openId
								const headPortrait = infoRes.userInfo.avatarUrl
								self.Otherlogins(id, name, headPortrait)
							}
						});
					}
				});
			},
			// weixinLogIN() {
			// 	this.isLoading = true
			// 	const self = this
			// 	uni.login({
			// 		provider: 'weixin',
			// 		success: function(loginRes) {
			// 			uni.getUserInfo({
			// 				provider: 'weixin',
			// 				success: function(infoRes) {
			// 					const name = infoRes.userInfo.nickName
			// 					const id = infoRes.userInfo.openId
			// 					const headPortrait = infoRes.userInfo.avatarUrl
			// 					self.Otherlogins(id, name, headPortrait)
			// 				}
			// 			});
			// 		}
			// 	});
			// },
			async Otherlogins(id, name, img) {

				const res = await this.$http.post('/api/Otherlogins', {
					id,
					name,
					img
				})
				if (res.data.success === true) {
					this.loginSuccess(res.data)
					this.isLoading = false
				} else {
					this.userInfoErr = true
					this.isLoading = false
				}
			},
			// #endif
			async logIn() {
				this.isLoading = true
				const res = await this.$http.post("/api/Login", {
					userInfo: this.userInfo
				});
				if (res.data.success === true) {
					this.loginSuccess(res.data)
					this.isLoading = false
					// setTimeout(()=>{
					// 	this.loginSuccess(res.data)
					// 	this.isLoading = false
					// },2000)
				} else {
					this.userInfoErr = true
					this.isLoading = false
				}
			},
			loginSuccess(data) {
				uni.setStorage({
					key: 'token',
					data: data.token,
					success: () => {
					}
				})
				this.setLogIn(true)
				this.setUserInfo(data.data)
				let page = getCurrentPages()
				uni.navigateBack({
					delta: page.length - 1
				})
			},
		}
	}
</script>

<style lang="scss">
	.input{
		border: 1px solid $xt;
		margin: 10rpx;
	}
	.login-moder {
		width: 100%;
		margin-top: 60rpx;
		padding: 0 20%;
		display: flex;
		justify-content: center;
.login-moder_text{
	font-size: 32rpx;
	width: 100%;
	text-align: center;
}
		.user-name-qq,
		.user-name-weixn {
			width: 120rpx;
		}
	}

	.isUserActive,
	.isPwdActive {
		border-color: rgb(251, 171, 126) !important;
	}

	.login-warp {
		width: 90%;
		height: 600rpx;
		background-color: #fff;
		margin: 200rpx auto 0;
		border-radius: 12rpx;
		box-shadow: 0px 0px 8px 2px rgba(18, 18, 3, 0.1);

		.login-bottom {
			margin-top: 60rpx;
			padding: 0 5%;

			.btn {
				border: none;
				font-size: 32rpx;
				font-weight: bold;
			}
		}

		.login-top {
			width: 100%;
			text-align: center;
			font-size: 42rpx;
			padding-top: 40rpx;
		}

		.login-content {
			width: 100%;
			padding: 0 5%;

			.user-name {
				margin-top: 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 5%;
				border: 1px solid $xt;
				border-radius: 50rpx;

				.user-name-icon {
					margin-right: 20rpx;
				}
			}

			.user-pwd {
				margin-top: 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 5%;
				border: 1px solid $xt;
				border-radius: 50rpx;

				.user-name-icon {
					margin-right: 20rpx;
				}

				.user-pwd-icon {
					margin-left: 20rpx;
				}


			}

			.user-text {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;

				.errActive {
					opacity: 1 !important;
				}

				.user-info-err {
					color: $u-type-error;
					opacity: 0;
				}
			}
		}
	}

	.my-warp {
		width: 100%;
		height: 400rpx;
		/* #ifdef MP-WEIXIN ||MP-QQ */
		background: url('https://www.dcmaomi.com:3000/serverImage/user_bg.png');
		/* #endif */
		/* #ifndef MP-WEIXIN ||MP-QQ*/
		background: url('../../static/imges/user_bg.png');
		/* #endif */
		background-size: cover;
		margin: 0 auto;
		position: relative;

		.nav-icon {
			color: #fff;
		}
	}

	.text-center {
		width: 100%;
		text-align: center;
		font-weight: bold;
		color: #fff;
	}
</style>
