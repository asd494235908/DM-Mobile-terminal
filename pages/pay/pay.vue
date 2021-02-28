<template>
	<view>
		<view class="pay_warp" v-if="isLoading ===false">
			<view class="titel">
				订单编号：{{order_id}}
			</view>
			<view class="dps">
				<u-icon :name="icon" :color="color" size="50" style="margin: 0 20rpx;"></u-icon>请打开{{isPay}}扫一扫
			</view>
			<view class="price">
				{{Number(pirce).toFixed(2)}}
			</view>
			<view class="pay_img">
				<u-lazy-load :image="img_url" class="img"></u-lazy-load>
				<view class="unpay_img" v-if="isShow">
					二维码已失效
				</view>

			</view>
			<!-- #ifdef H5 -->
			<view class="">
				长按保存图片
			</view>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<view class="" style="margin-top: 20rpx;">
				<u-icon @click="loadImg" name="download" color="#ff9344" size="60"></u-icon>
			</view>
			<!-- #endif -->
			<view class="tps" style="margin-top: 20rpx;">

				<view class="">
					<u-count-down separator="zh" :show-hours='false' :timestamp="timestamp" @change="isChange" @end="isEnd" color="red"></u-count-down>
					<text>内完成支付</text>
				</view>
			</view>
			<view class="tps" style="margin-top:20rpx;">
				<u-button v-if="isGoPay_btn" type="primary" shape="square" size="medium" :plain="true" throttle-time="500" :ripple="true"
				 @click="isGoPay">一键启动支付宝支付</u-button>
			</view>
			<view class="des" @click="asdddd">
				备注：我们将不会在您付款后的72小时之内发货，若您长时间未收到邮件，请查看邮箱内的垃圾邮箱。
			</view>
		</view>
		<u-toast ref="uToast" />
		<my-loading :show="isLoading"></my-loading>
		<my-window :show="showDesc" :isclose="false" @determine="IsDetermine">
			<view class="mask_content" slot='content'>
				<u-lazy-load :image="isdescImg" class="img" border-radius="6"></u-lazy-load>
				<view class="content_text">
					请在输入金额时候添加备注号(点击号码复制)
					<view style="color: red; letter-spacing: 2px; margin-top: 20rpx;">
						<text @click="setcopy">{{payNum}}</text>
						<text>(必要)</text>
					</view>
				</view>
			</view>
		</my-window>
		<u-modal :zoom="true" v-model="show" :content="content" @confirm="banck"></u-modal>
	</view>
</template>

<script>
	import MyLoading from '../../components/my-loading/index.vue'
	import MyWindow from '../../components/mywindow/mywindow.vue'
	// #ifdef H5
	import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy/junyi-h5-copy.js'
	// #endif
	export default {
		data() {
			return {
				show: false,
				content: "",
				isdescImg: 'https://www.dcmaomi.com:3000/serverImage/bz.png',
				showDesc: false,
				payNum: null,
				token: '',
				pirce: null,
				isLoading: true,
				img_url: '',
				url: '',
				order_id: null,
				play_id: null,
				timestamp: 0,
				icon: '',
				color: '',
				isShow: false,
				isGoPay_btn: false,
				isRequest: true,
			};
		},
		components: {
			MyLoading,
			MyWindow
		},
		computed: {
			isPay() {
				switch (this.play_id) {
					case null:
						return ''
						break;
					case 0:
						this.isdescImg = 'https://www.dcmaomi.com:3000/serverImage/bz.png' //改成支付宝的
						this.icon = 'zhifubao-circle-fill'
						this.color = "#1476fe"
						return '支付宝'
						break;
					case 1:
						this.isdescImg = 'https://www.dcmaomi.com:3000/serverImage/bz.png' //改成支付宝的
						this.icon = 'zhifubao-circle-fill'
						this.color = "#1476fe"
						return '支付宝'
						break;
					case 2:
						this.isdescImg = 'https://www.dcmaomi.com:3000/serverImage/bz.png' //微信金额备注图
						this.icon = 'weixin-circle-fill'
						this.color = "#07c362"
						return '微信'
						break;

				}
			},

		},
		onLoad: function() {
			this.isLoading = true
			this.getData()

			// #ifdef H5
			if (!this.isWeXin()) {
				this.isGoPay_btn = true
			} else {
				this.isGoPay_btn = false
			}
			if (!this.isQQ()) {
				this.isGoPay_btn = true
			} else {
				this.isGoPay_btn = false
			}
			// #endif
			// #ifdef APP-PLUS
			if (this.play_id !== 2) {
				this.isGoPay_btn = true
			}
			// #endif
			if (this.play_id === 2) {
				this.isGoPay_btn = false
			}
			let isPayNum = new Promise((resolve, reject) => {
				if (this.payNum !== null) {
					resolve('有值')
				} else {
					reject('是Null')
				}
			})
			isPayNum.then(res => {
				this.showDesc = true
			}).catch(err => {
				this.showDesc = false
				this.timestamp = 300
			})
			// console.log(this.payNum)

		},
		onUnload: function() {
			this.timestamp = 0
		},
		methods: {
			banck() {
				uni.reLaunch({
				    url: '/pages/donation/donation'
				});
				uni.removeStorage({
					key: 'url',
				});
			},
			setcopy() {
				// #ifndef H5
				uni.setClipboardData({
					data: this.payNum,
					success: () => {
						this.$refs.uToast.show({
							title: '保存成功',
							type: 'success',
						})
					},
					fail: () => {
						this.$refs.uToast.show({
							title: '保存失败',
							type: 'warning',
						})
					}
				});
				// #endif
				// #ifdef H5
				let content = String(this.payNum) // 复制内容，必须字符串，数字需要转换为字符串
				const result = h5Copy(content)
				if (result === false) {
					this.$refs.uToast.show({
						title: '保存失败',
						type: 'warning',
					})
				} else {
					this.$refs.uToast.show({
						title: '保存成功',
						type: 'success',
					})
				}
				// #endif
			},
			IsDetermine() {
				this.showDesc = false
				this.timestamp = 300
			},
			asdddd() {
			},
			loadImg() {
				// #ifdef APP-PLUS
				this.loadImg_app()
				// #endif
			},
			// #ifdef APP-PLUS
			loadImg_app() {
				uni.downloadFile({
					url: this.img_url,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: () => {
									this.$refs.uToast.show({
										title: '保存成功',
										type: 'success',
									})
								},
								fail: () => {
									this.$refs.uToast.show({
										title: '保存失败',
										type: 'warning',
									})
								}
							})
						} else {
							this.$refs.uToast.show({
								title: '保存失败',
								type: 'warning',
							})
						}
					},
					fail: () => {
						this.$refs.uToast.show({
							title: '保存失败',
							type: 'warning',
						})
					}
				})
			},
			// #endif

			isGoPay() {
				// #ifdef APP-PLUS
				plus.runtime.openURL(this.url, function(res) {
					this.$refs.uToast.show({
						title: '打开失败',
						type: 'warning',
					})
				});
				// #endif
				// #ifdef H5
				// window.location.href = this.url
				window.open(this.url)
				// #endif
			},
			// #ifdef H5
			//判断是否qq浏览器
			isQQ() {
				let ua = window.navigator.userAgent.toLowerCase()
				if (ua.match(/QQ/i) == 'qq') {
					return true
				}
				return false
			},
			//判断是否是微信浏览器
			isWeXin() {
				let ua = window.navigator.userAgent.toLowerCase()
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					return true
				}
				return false
			},
			// #endif
			async isChange(e) {
				if (e > 295) return
				if (this.isRequest) {
					const res = await this.$http.post('/api/orderType', {
						token: this.token
					})
					if (res.data.cood === 400) {} else if (res.data.cood === 402) {
						this.content = "订单已被驳回请重新下单"
						this.isRequest = false
						this.show = true
					} else if (res.data.cood === 401) {
						this.content = "数据有误请重试"
						this.isRequest = false
						this.show = true
					} else if (res.data.cood === 500) {
						this.content = "请求被驳回"
						this.isRequest = false
						this.show = true
					} else if (res.data.cood === 200) {
						this.content = "支付成功"
						this.show = true
						uni.$emit('update')
						this.isRequest = false
					}
				}


			},
			isEnd() {
				this.isShow = true
				uni.removeStorage({
					key: 'url',
				});
			},
			open(types) {
				const url = 'https://uniapp.dcloud.io/';
				plus.runtime.openURL(url, function(res) {
				});
			},
			getData() {
				uni.getStorage({
					key: 'url',
					success: (res) => {
						this.img_url = res.data.img_url
						this.url = res.data.url
						this.order_id = res.data.order_id
						this.play_id = res.data.play_id
						this.pirce = res.data.pirce
						this.token = res.data.token
						if (res.data.payNum === undefined) {
							this.payNum = null
						} else {
							this.payNum = res.data.payNum
						}

						this.isLoading = false
					},
					fail: () => {
						this.$refs.uToast.show({
							title: '请求失败,请重新下单',
							type: 'warning',
						})
						this.banck()
						this.isLoading = false
					}
				})
			}

		}
	}
</script>

<style lang="scss">
	.mask_content {
		padding: 10rpx;

		.content_text {
			padding: 20rpx 10rpx;
			font-size: 15px;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
	}

	.pay_warp {
		width: 95%;
		// height: 140rpx;
		margin: 0 auto;
		border-radius: 16rpx;
		margin-top: 30rpx;
		padding: 20rpx 2%;
		background-color: #fff;
		box-shadow: 0px 0px 6px 1px rgba(18, 18, 3, 0.1);
		display: flex;
		align-items: center;
		flex-direction: column;
		font-size: 30rpx;
		color: $uni-text-color;

		.titel {
			width: 100%;
			height: 60rpx;
			display: flex;
			align-items: center;
			font-size: 16px;
		}

		.dps {
			height: 80rpx;
			display: flex;
			align-items: center;
		}

		.price {
			height: 60rpx;
			display: flex;
			align-items: center;
			font-size: 24px;
			color: red;
		}

		.des {
			margin-top: 30rpx;
			color: $uni-text-color-grey;
			font-size: 22rpx;
			line-height: 22px;
			text-indent: 44rpx;
		}

		.pay_img {
			width: 80%;
			position: relative;

			.img {
				width: 100%;
			}

			.unpay_img {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				display: flex;
				font-size: 24px;
				align-items: center;
				justify-content: center;
				background-color: rgba($color: #ffffff, $alpha: .8);
			}
		}
	}
</style>
