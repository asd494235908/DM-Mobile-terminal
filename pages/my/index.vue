<template>
	<view>
		<view class="my-warp">
			<uni-nav-bar class="nav" :fixed="false" background-color="transparent" :border="false">
				<view slot="default" class="text-center ">
					个人中心
				</view>
			</uni-nav-bar>
			<view class="user-warp" :style="isvili">
				<view class="user-top">
					<u-avatar :src="userImg" class="user-img" size="160" bg-color="#fff"></u-avatar>
					<!-- <u-lazy-load :image="userImg" class="user-img" height="200rpx" style="border-radius: 50%;"></u-lazy-load> -->
					<text class="user-name" v-if="login === false">未登录</text>
					<text class="user-name" v-if="login === true">{{userInfo.user_name}}</text>
					<text class="user-autograph ellipsis" v-if="login === true" style="color: #999;">{{userInfo.user_autograph}}</text>
				</view>
				<view class="modify-userInfo" @click="goModifyUserInfo">
					<view class="modify" v-if="login === true">
						<u-icon name="edit-pen-fill" size="30" style="margin-right: 5%;" color="#999"></u-icon>
						<text style="color: #999;">修改信息</text>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN ||MP-QQ-->
				<view class="user-buttom" v-if="isValidate" >
					<view class="user-moer" @click="goOrder(0)">
						<view class="user-text">我的订单</view>
						<view class="user-desc">查看全部订单 <u-icon name="arrow-right" size="20" class="icon"></u-icon>
						</view>
					</view>
					<view class="user-icons">
						<view class="icon-warp" v-for="(item,index) in icons" :key="index" @click="goOrder(index)">
							<easy-loadimage mode="widthFix" :image-src="item.img" class="icon-icon" loading-mode="looming-gray" :scroll-top="scrollTop"></easy-loadimage>
							<text class="icon-text">{{item.text}}</text>
						</view>
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN ||MP-QQ-->
				<view class="user-buttom">
					<view class="user-moer" @click="goOrder(0)">
						<view class="user-text">我的订单</view>
						<view class="user-desc">查看全部订单 <u-icon name="arrow-right" size="20" class="icon"></u-icon>
						</view>
					</view>
					<view class="user-icons">
						<view class="icon-warp" v-for="(item,index) in icons" :key="index" @click="goOrder(index)">
							<easy-loadimage mode="widthFix" :image-src="item.img" class="icon-icon" loading-mode="looming-gray" :scroll-top="scrollTop"></easy-loadimage>
							<text class="icon-text">{{item.text}}</text>
						</view>
					</view>
				</view>
				<!-- #endif -->
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN ||MP-QQ -->
		<view class="my-list" v-if="isValidate" >
			<view class="titel">
				更多服务
			</view>
			<view class="list-desc" @click="goHistory">
				<u-icon name="clock" color="#ff9344" size="40" class="icon"></u-icon>
				<text class="text">浏览历史</text>
				<u-icon name="arrow-right" size="32" color="#999"></u-icon>
			</view>
			<view class="list-desc" @click="goAdderess">
				<u-icon name="map" color="#ff9344" size="40" class="icon"></u-icon>
				<text class="text">收货地址</text>
				<u-icon name="arrow-right" size="32" color="#999"></u-icon>
			</view>
			<view class="list-desc" @click="godonation">
				<u-icon name="list" color="#ff9344" size="40" class="icon"></u-icon>
				<text class="text">捐赠名单</text>
				<u-icon name="arrow-right" size="32" color="#999"></u-icon>
			</view>
			<view class="list-desc" @click="goCoupon">
				<u-icon name="coupon" color="#ff9344" size="40" class="icon"></u-icon>
				<text class="text">优惠券</text>
				<u-icon name="arrow-right" size="32" color="#999"></u-icon>
			</view>
			<view class="list-desc" @click="goService">
				<u-icon name="kefu-ermai" color="#ff9344" size="40" class="icon"></u-icon>
				<text class="text">客服</text>
				<u-icon name="arrow-right" size="32" color="#999"></u-icon>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN ||MP-QQ -->
		<view class="my-list">
			<view class="titel">
				更多服务
			</view>
			<view class="list-desc" @click="goHistory">
				<u-icon name="clock" color="#ff9344" size="40" class="icon"></u-icon>
				<text class="text">浏览历史</text>
				<u-icon name="arrow-right" size="32" color="#999"></u-icon>
			</view>
			<view class="list-desc" @click="goAdderess">
				<u-icon name="map" color="#ff9344" size="40" class="icon"></u-icon>
				<text class="text">收货地址</text>
				<u-icon name="arrow-right" size="32" color="#999"></u-icon>
			</view>
			<view class="list-desc" @click="godonation">
				<u-icon name="list" color="#ff9344" size="40" class="icon"></u-icon>
				<text class="text">捐赠名单</text>
				<u-icon name="arrow-right" size="32" color="#999"></u-icon>
			</view>
			<view class="list-desc" @click="goCoupon">
				<u-icon name="coupon" color="#ff9344" size="40" class="icon"></u-icon>
				<text class="text">优惠券</text>
				<u-icon name="arrow-right" size="32" color="#999"></u-icon>
			</view>
			<view class="list-desc" @click="goService">
				<u-icon name="kefu-ermai" color="#ff9344" size="40" class="icon"></u-icon>
				<text class="text">客服</text>
				<u-icon name="arrow-right" size="32" color="#999"></u-icon>
			</view>
		</view>
		<!-- #endif -->


		<button @click="logIn" v-if="login === false" class="btn">登录</button>
		<button @click="islogout" v-if="login === true" class="btn">退出登录</button>
		<u-modal v-model="motai.show" :content="motai.content" :show-cancel-button="true" confirm-color="#FBAB7E" @confirm="logout"></u-modal>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				motai: {
					show: false,
					content: '确认要退出登录吗'
				},
				data: [],
				scrollTop: 0,
				img: 'https://s1.ax1x.com/2020/10/28/B3Mb7Q.jpg',
				icons: [{
						img: '../../static/imges/daifukuan.png',
						text: '待付款'
					},
					{
						img: '../../static/imges/daishouhuo.png',
						text: '待发货'
					},
					{
						img: '../../static/imges/daifahuo.png',
						text: '待收获'
					},
					{
						img: '../../static/imges/daipingjia.png',
						text: '待评价'
					},
				],
				action: 'https://www.dcmaomi.com:3000/api/upload',
				// fileList: [
				// 					{
				// 						url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
				// 					}
				// 				]
			}
		},
		onPageScroll({
			scrollTop
		}) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			this.scrollTop = scrollTop;
		},
		components: {
			uniNavBar
		},
		computed: {
			...mapState(['login', 'userInfo', 'isValidate']),

			userImg() {
				if (this.login === true) {
					return this.userInfo.user_img
				} else {
					// #ifndef MP-WEIXIN ||MP-QQ
					return '../../static/imges/weidnglu.png'
					// #endif
					// #ifdef MP-WEIXIN||MP-QQ
					return 'https://www.dcmaomi.com:3000/serverImage/weidnglu.png'
					// #endif
				}
			},
			isvili(){
				// #ifdef MP-WEIXIN
				if (this.isValidate){
					return ''
				}else{
					return `height:220rpx; opacity: 0;`
				}
				// #endif
				return ''
			}
		},
		methods: {
			...mapMutations(['setLogIn', 'setUserInfo']),
			godonation() {
				uni.navigateTo({
					url: '/pages/donation/donation'
				})
			},
			goHistory() {
				uni.navigateTo({
					url: '/pages/History/History'
				})
			},
			goService() {
				uni.navigateTo({
					url: '/pages/service/service'
				})
			},
			goCoupon() {
				if (this.login) {
					uni.navigateTo({
						url: '/pages/coupon/coupon'
					})
				} else {
					this.logIn()
				}
			},
			goModifyUserInfo() {
				if (this.login) {
					uni.navigateTo({
						url: '../myInfo/myInfo'
					})
				}
			},
			logIn() {
				uni.navigateTo({
					url: '/pages/login/index'
				})
			},
			goAdderess() {
				if (this.login) {
					uni.navigateTo({
						url: '/pages/address/index'
					})
				} else {
					this.logIn()
				}
			},
			goOrder(index) {
				if (this.login) {
					uni.navigateTo({
						url: '/pages/order/index?index=' + index,
					})
				} else {
					this.logIn()
				}

			},
			islogout() {
				this.motai.show = true
			},
			logout() {
				uni.removeStorage({
					key: 'token',
					success: (res) => {
						// console.log('success');
						this.setLogIn(false)
						this.setUserInfo({})
						this.motai.show = false
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.btn {
		margin-top: 50rpx;
		border: none;
		background-color: #fff;
		color: #ec4141;
	}

	.btn::after {
		border: none;
	}

	.my-list {
		width: 100%;
		margin-top: 300rpx;
		/* #ifndef H5*/
		margin-top: 350rpx;
		/* #endif*/
		padding: 0 2.5%;

		.titel {
			font-size: 16px;
		}

		.list-desc {
			height: 90rpx;
			display: flex;
			align-items: center;
			// border-bottom: 1px solid $xt;
			padding: 0 2.5%;

			.text {
				flex: 1;
			}

			.icon {
				margin-right: 20rpx;
			}
		}
	}

	.my-warp {
		width: 100%;
		height: 450rpx;
		/* #ifdef MP-WEIXIN ||MP-QQ*/
		background: url('https://www.dcmaomi.com:3000/serverImage/user_bg.png');
		/* #endif */
		/* #ifndef MP-WEIXIN ||MP-QQ*/
		background: url('../../static/imges/user_bg.png');
		/* #endif */

		background-size: cover;
		margin: 0 auto;
		position: relative;
		margin-bottom: 200rpx;

		.user-warp {
			position: absolute;
			bottom: -60%;
			left: 50%;
			transform: translateX(-50%);
			width: 90%;
			/* #ifndef H5*/
			bottom: -70%;
			/* #endif*/
			height: 430rpx;
			background-color: #fff;
			border-radius: 12rpx;
			box-shadow: 0px 0px 8px 2px rgba(18, 18, 3, 0.1);
			display: flex;
			flex-direction: column;
			
			/* #ifndef MP-WEIXIN ||MP-QQ*/
			padding-bottom: 20rpx;
			/* #endif */

			.modify-userInfo {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				padding-top: 60rpx;
				height: 140rpx;
				z-index: 9999;

				.modify {
					width: 200rpx;
					text-align: center;
					margin-right: 2.5%;
				}
			}

			.user-top {
				position: absolute;
				top: -20%;
				left: 50%;
				transform: translateX(-50%);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.user-img {
					width: 160rpx;
					height: 160rpx;
					border: solid 4rpx #ffffff;
					box-shadow: 0px 0px 8px 2px rgba(18, 18, 3, 0.2);
					border-radius: 50%;
					overflow: hidden;
					// background-color: transparent;
					// opacity: 0;
				}

				.user-name {
					margin-top: 30rpx;
					display: inline-block;
					font-size: 18px;
					font-weight: bold;
				}

				.user-autograph {
					margin-top: 20rpx;
					display: inline-block;
					width: 500rpx;
					text-align: center;
				}
			}

			.ellipsis {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.user-buttom {
				margin-top: 120rpx;
				/* #ifndef H5*/
				margin-top: 120rpx;
				/* #endif*/
				height: 100%;

				.user-icons {
					display: flex;
					margin: 10rpx 0;

					.icon-warp {
						width: 25%;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;

						.icon-icon {
							width: 30%;
							height: 60rpx;
						}

						.icon-text {
							margin-top: 10rpx;
							font-size: 14px;
							color: $uni-text-color;

						}
					}
				}

				.user-moer {
					padding: 0 30rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin: 20rpx 0;

					.user-text {
						font-size: 16px;
						color: $uni-text-color;
					}

					.user-desc {
						color: $uni-text-color-grey;

						.icon {
							position: relative;
							top: -2rpx;
						}
					}
				}
			}
		}

		.text-center {
			width: 100%;
			text-align: center;
			font-weight: bold;
			color: #fff;
		}
	}

	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
