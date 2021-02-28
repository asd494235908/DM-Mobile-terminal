<template>
	<view class="warp">
		<view class="address">
			<view class="icon-left">
				<u-icon name="map" color="#999" size="36"></u-icon>
			</view>
			<view class="address-info-warp">
				<view class="address-desc">
					<view class="address-desc-left">
						收货人：{{order_data.name}}
					</view>
					<view class="address-desc-right">{{order_data.phone}}
					</view>
				</view>
				<view class="address-desc" style="margin-top: 20rpx;">
					<text class="ellipsis desc">收货地址：{{order_data.address}}</text>
				</view>
			</view>
			<view class="icon-right">
				<u-icon name="arrow-right" color="#999" size="36" @click="goAddress"></u-icon>
			</view>
		</view>
		<view class="mesg_warp">
			<view class="meail" ref='email'>
				<view class="icon-left">
					<u-icon name="email" color="#999" size="36"></u-icon>
				</view>
				<view class="right">
					<u-input v-model="email" type="text" style="text-indent:18rpx;
					letter-spacing: 4rpx;" :clearable="true"
					 placeholder="请输入您的邮箱" :border="email_border" :border-color="email_border_color" confirm-type="完成" />
				</view>
			</view>
			<view class="mesg">
				<view class="icon-left">
					<u-icon name="edit-pen" color="#999" size="36"></u-icon>
				</view>
				<view class="right">
					<u-input class="textarea_mesg" v-model="mesg" type="textarea" :clearable="true" placeholder-style="margin-left: 10rpx;"
					 placeholder="说点什么吧" confirm-type="完成" />
				</view>
			</view>

		</view>
		<view class="order-warp" v-if="isdataList">
			<view class="order-titel">
				商品详情
			</view>
			<view class="order-time">
				<view class="order-time-titel">
					状态：<text style="color: #dd524d;">待支付</text>
				</view>
				<view class="order-time-content">
					订单超过24小时自动取消，请在<u-count-down class="jusuqi" ref="uCountDown" color="red" separator-color="red" :timestamp="timeNum(order_data.time)"
					 :autoplay="true"></u-count-down>完成支付
				</view>
			</view>
			<view class="order-list" :style="{height:showHeight}">
				<view class="order-list-warp">
					<view class="order-list-item" v-for="(item,index) in order_data.data_list" :key="index">
						<view class="item-left" style="width: 160rpx; height: 160rpx;" @click="goList(item)">
							<u-lazy-load :image="item.img" class="img"></u-lazy-load>
						</view>
						<view class="item-right">
							<view class="item-titel">
								<text class="ellipsis" style="width: 400rpx; display: inline-block;">{{item.name}}</text>
							</view>
							<view class="item-desc">
								<view class="desc-left">
									￥{{item.price}}x{{item.suplist_num}}
								</view>
								<view class="desc-right" style="color: #ec4141;">
									￥{{allprice(item.price,item.suplist_num)}}
								</view>
							</view>
							<view class="item-desc">
								<view class="desc-left" v-if="item.size !==''">
									大小：{{item.size}}
								</view>
								<view class="desc-left" v-if="item.size ==''">
									<!-- 大小：{{item.size}} -->
								</view>
								<view class="desc-right">
									{{item.style}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="showItem" @click="hnadlShowItem">
				共 ({{ order_data.data_list.length }}) 件<u-icon :name="icon" color="#999" size="28" class="order-icon"></u-icon>
			</view>
			<view class="order-list-latter" v-for="(item,index) in order_letter" :key="index" :class="{active:index === order_letter.length-1}"
			 @click="handelist(item.id)">
				<u-icon :name="item.icon" :color="item.color" size="34" class="icon-left"></u-icon>
				<text class="titel">{{item.name}}</text>
				<text class="desc">{{item.desc}}</text>
				<u-icon name="arrow-right" color="#4b4c4d" size="34" class="icon"></u-icon>
			</view>
			<view class="buttom">
				<text class="titel">合计</text>
				<text class="price">￥{{Number(pirce).toFixed(2)}}</text>
			</view>
		</view>
		<w-picker :visible.sync="visible" mode="selector" value="支付宝(官方)推荐" default-type="name" :options="pay_damo" @confirm="onConfirm($event,'selector')"
		 @cancel="onCancel"></w-picker>
		<u-popup v-model="isMask" mode="bottom" :style="{marginBottom: heiht+'px'}">
			<view class="Setmeal-warp">
				<view class="Setmeal-left">
					<view class="Setmeal-info">
						请选择套餐:
					</view>
					<view class="Setmeal-item-warp">
						<view class="Setmeal-item" v-for="(item,index) in isOrder" :key="index" @click="handelSetmealItem(item,index)"
						 :class="{Setmeal_active:index === isindex}">
							{{item.titel}}
						</view>
					</view>

				</view>
				<view class="Setmeal-right">

					<view class="Setmeal-info">
						说明:
					</view>
					<view class="item-info">
						{{info.desc}}
					</view>
				</view>
				<view class="Setmeal-right" style="margin-top: 10rpx;">

					<view class="Setmeal-info">
						价格:
					</view>
					<view class="price" v-if="this.info.id !==100">
						￥{{info.price}}
					</view>
					<view style="flex: 1;margin-left: 20rpx;" v-if="this.info.id ===100">
						<u-input v-model="info.price" type="number" style="text-indent:18rpx;
						letter-spacing: 4rpx; width: 100%;"
						 @focus="isNumFocus" @blur='isNumBlur' :clearable="true" :border="true" border-color="#dadada" placeholder="请输入金额"
						 confirm-type="完成" />
					</view>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
		<view class="btn-warp">
			<u-button class="btn" :isClass="true" :ripple="true" type="primary" shape="circle" @click="deellOrder">捐 赠</u-button>
			<u-button v-if="play_url !==''" style="margin-top: 100rpx;" class="btn" :isClass="true" :ripple="true" type="primary"
			 shape="circle" @click="launchApp">支 付</u-button>
		</view>
		<my-loading :show="isLoading"></my-loading>
		</my-window>
		<u-modal :show-cancel-button="true" :zoom="true" v-model="show" :content="content" @confirm="goPay" confirm-color="#FBAB7E"></u-modal>
		<u-modal v-model="motai.show" :content="motai.content" :show-cancel-button="false" confirm-color="#FBAB7E" ></u-modal>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import MyLoading from '../../components/my-loading/index.vue'
	import MyWindow from '../../components/mywindow/mywindow.vue'
	export default {
		components: {
			MyLoading,
			MyWindow
		},
		data() {
			return {
				motai: {
					show: false,
					content: '此显示模拟支付成功，请到官网或者app体验更多内容'
				},
				heiht: 0,
				isNum: 0,
				play_url: '',
				show: false,
				content: '请确认信息全部填正确(联系方式，邮箱等)',
				mesg: '',
				isLoading: false,
				email_border_color: '#ff9344',
				email_border: false,
				email: '',
				visible: false,
				play_id: 0,
				order_id: null,
				order_data: {},
				isshow: false,
				icon: 'arrow-up',
				isMask: false,
				isindex: null,
				isQQmeail: false,
				pirce: 0,
				info: {
					desc: '未选择',
					price: 0,
					id: 0,
					titel: ''
				},
				// 支付凡方式列表
				pay_damo: [{
					label: '支付宝(官方)推荐',
					value: 0
				}, {
					label: '支付宝(免签)',
					value: 1
				}, {
					label: '微信(免签)',
					value: 2
				}],
				order_letter: [{
						id: 3,
						name: '选择套餐',
						desc: '未选择',
						icon: 'star-fill',
						color: '#ffc530'
					}, {
						id: 0,
						name: '红包',
						desc: '请选择红包',
						icon: 'red-packet-fill',
						color: '#ec4141'
					},
					{
						id: 1,
						name: '优惠券',
						desc: '优惠券',
						icon: 'coupon-fill',
						color: '#ff9344'
					},
					{
						id: 2,
						name: '支付方式',
						desc: '支付宝(官方)推荐',
						icon: 'rmb-circle-fill',
						color: '#74c32e'
					},
				],
				isOrder: []
			};
		},
		onLoad: function(val) {
			this.initPay_type()
			//获取订单编号
			if (this.login) {
				if (val.orid === undefined) {
					let page = getCurrentPages()
					uni.navigateBack({
						delta: page.length - 1
					})
					return
				}
				this.order_id = val.orid
				this.getUidData()
			} else {
				this.gologIn()
			}
			uni.$on('getOrderIdEve', () => {
				this.getUidData()
			})
			uni.$on('update', () => {
				this.getUidData()
			})
			// #ifdef MP-WEIXIN
			this.pay_damo=this.pay_damo.splice(2,1)
			this.order_letter.forEach(item=>{
				if (item.id ===2){
					item.desc = '未选择'
				}
			})
			// #endif
		},

		computed: {

			...mapState(['login', 'userInfo']),
			showHeight() {
				if (this.isshow) {
					this.icon = 'arrow-up'
					return this.order_data.data_list.length * 200 + 'rpx'

				} else {
					this.icon = 'arrow-down'
					return 200 + 'rpx'
				}
			},
			isdataList() {
				let arr = Object.keys(this.order_data)
				if (arr.length == 0) {
					return false
				} else {
					return true
				}
			}
		},
		watch: {
			order_id() {
				this.getUidData()
			},

		},
		methods: {
			...mapMutations(['setUserInfo', 'setGoodList']),
			async initPay_type() {
				const res = await this.$http.post('/api/payType')
				if (res.data.success === true) {
					this.isOrder = res.data.data
				} else {
					this.$refs.uToast.show({
						title: '为获取到支付状态',
						type: 'warning',
					})
				}
			},
			isNumFocus(e) {
				// #ifndef H5
				uni.onKeyboardHeightChange((res) => {
					this.height = res.height
				})
				// #endif
			},
			isNumBlur() {
				if (this.info.price === null) {
					this.$refs.uToast.show({
						title: '请输入金额',
						type: 'warning',
					})
					return
				}
				this.info.price = this.keepTwoDecimalFull(this.info.price)
				this.pirce = this.info.price
				this.isNum = 1
			},
			deellOrder(e) {
				this.show = true
			},
			// goPay 去支付页面
			async goPay() {
				if (!this.isemail()) return //判断是否输入正确的邮箱
				if (!this.isInfo()) return //判断是否选择套餐
				if (this.pirce == null || this.pirce == 0) {
					this.$refs.uToast.show({
						title: '请输入金额',
						type: 'warning',
					})
					return
				}

				if (this.order_data.type !== 0) {
					this.$refs.uToast.show({
						title: '订单已支付，或者已失效',
						type: 'warning',
					})
					return
				}
				// #ifdef MP-WEIXIN
				this.motai.show = true
				return
				// #endif
				this.isLoading = true
				const res = await this.$http.post('/api/play', {
					play_id: this.play_id,
					order_id: this.order_id,
					pirce: this.pirce,
					email: this.email,
					info: this.info,
					mesg: this.mesg,
					isNum: this.isNum,
				})
				if (res.data.success === true) {
					// this.isLoading = false
					// this.play_url = res.data.url
					const img_url = res.data.data
					const url = res.data.url
					const token = res.data.token
					const payNum = res.data.payNum
					uni.setStorage({
						key: 'url',
						data: {
							order_id: this.order_id,
							img_url: img_url,
							url: url,
							play_id: this.play_id,
							pirce: this.pirce,
							token: token,
							payNum: payNum,
						},
						success: () => {
							this.isLoading = false
							uni.navigateTo({
								url: '/pages/pay/pay'
							})
						},
						fail: () => {
							this.isLoading = false
							this.$refs.uToast.show({
								title: '储存失败请重试',
								type: 'warning',
							})
						}
					})
				} else {
					this.isLoading = false
					this.$refs.uToast.show({
						title: '当前订单已失效请重新下单',
						type: 'warning',
					})
				}

			},
			open(types) {
				const url = 'https://uniapp.dcloud.io/';
				plus.runtime.openURL(url, function(res) {});
			},
			launchApp() {
				plus.runtime.openURL(this.play_url, function(res) {});
			},
			isInfo() {
				if (this.info.price === 0) {
					this.$refs.uToast.show({
						title: '请选择套餐',
						type: 'warning',
					})
					this.isMask = true
					return false
				}
				return true
			},
			goScrolTp() {
				uni.createSelectorQuery().select(".meail").boundingClientRect((res) => {
					uni.pageScrollTo({
						duration: 300,
						scrollTop: res.top
					})
				}).exec();
			},
			isemail() {
				if (this.email === '') {
					this.$refs.uToast.show({
						title: '请输入您的邮箱',
						type: 'warning',
					})
					const top = this.$refs.email.$el.getBoundingClientRect((res) => {})
					this.goScrolTp()
					return false
				} else {
					const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

					if (!reg.test(this.email)) {
						this.email_border = true
						this.email_border_color = '#dd524d'
						this.$refs.uToast.show({
							title: '邮箱格式不正确',
							type: 'warning',
						})
						this.goScrolTp()
						return false
					} else {
						this.email_border = false
						return true
					}
				}
			},
			async goList(o) {
				const res = await this.$http.post('/api/getItem', {
					id: o.sup_id
				})
				if (res.data.success === true) {
					this.setGoodList(res.data.data[0])
					uni.setStorage({
						key: 'goodlist',
						data: res.data.data[0]
					})
					uni.navigateTo({
						url: '/pages/goodlist/index'
					})
				}
			},
			//选择支付方式
			onConfirm(x, e) {
				this.order_letter.forEach(item => {
					if (item.name === '支付方式') {
						item.desc = x.result
					}
				})
				this.play_id = x.value // 支付方式id  0是官方支付宝支付 1是支付宝免签 2是微信免签
			},
			onCancel() {},
			goAddress() {
				if (this.login) {
					uni.navigateTo({
						url: '/pages/address/index?order_id=' + this.order_id
					})
				}
			},
			handelSetmealItem(item, index) {
				this.isindex = index
				this.info.desc = item.info
				this.info.price = item.price
				this.info.id = item.id
				this.info.titel = item.titel
				this.pirce = item.price
				this.order_letter.forEach(x => {
					if (x.id === 3) {
						x.desc = item.titel
					}
				})
			},
			handelist(index) {
				if (index === 0) {
					this.$refs.uToast.show({
						title: '当前没有红包',
						type: 'warning',
					})
				} else if (index === 1) {
					this.$refs.uToast.show({
						title: '当前没有优惠券',
						type: 'warning',
					})
				} else if (index === 2) {
					// this.$refs.uToast.show({
					// 	title: '只支持微信支付',
					// 	type: 'warning',
					// })
					this.visible = true

				} else if (index === 3) {
					this.isMask = true
				}
			},
			hnadlShowItem() {
				this.isshow = !this.isshow
			},
			keepTwoDecimalFull(num) {
				let result = parseFloat(num);
				if (isNaN(result)) {
					this.$refs.uToast.show({
						title: '输入错误，请检查！',
						type: 'warning',
					})
					return false;
				}
				result = Math.round(num * 100) / 100;
				let s_x = result.toString(); //将数字转换为字符串

				let pos_decimal = s_x.indexOf('.'); //小数点的索引值


				// 当整数时，pos_decimal=-1 自动补0  
				if (pos_decimal < 0) {
					pos_decimal = s_x.length;
					s_x += '.';
				}

				// 当数字的长度< 小数点索引+2时，补0  
				while (s_x.length <= pos_decimal + 2) {
					s_x += '0';
				}
				return s_x;
			},
			timeNum(time) {
				const arr = this.arrnNuber(time.match(/\d+/g)) // 数组字符串返回数组 数字类型
				const nowTime = this.arrnNuber(this.getTime().match(/\d+/g)) // 数组字符串返回数组 数字类型
				const arrs = this.alls(arr)
				const nowTimes = this.alls(nowTime)
				const nowLaer = nowTimes - arrs
				//判断订单是否大于1天
				if (nowLaer >= 86400000) {} else {

					const num = 86400000 - nowLaer
					if (num === 0) {
						return '订单大于一天'
					} else {
						return num / 1000
					}
				}
			},
			// 返回秒
			alls(arr) {
				const oid = new Date()
				oid.setFullYear(arr[0], arr[1], arr[2])
				oid.setHours(arr[3])
				oid.setMinutes(arr[4])
				oid.setSeconds(arr[5])
				return oid.getTime()
			},
			// 数组字符串返回数组 数字类型
			arrnNuber(x) {
				const arr = []
				for (let i = 0; i < x.length; i++) {
					arr.push(this.letterNuber(x[i]))
				}
				return arr
			},
			// 返回数字
			letterNuber(x) {
				const num1 = Number(parseInt(x))
				return num1
			},
			getTime() {
				let time = new Date()
				const year = time.getFullYear()
				const Month = time.getMonth() + 1
				const date = time.getDate()
				const Hours = time.getHours()
				const Minutes = time.getMinutes()
				const Seconds = time.getSeconds()
				return `${year}-${this.towNum(Month)}-${this.towNum(date)} ${this.towNum(Hours)}:${this.towNum(Minutes)}:${this.towNum(Seconds)}`
			},
			towNum(num) {
				return num < 10 ? '0' + num : num
			},
			//初始化数据
			//页面返回
			allprice(x, y) {
				Number(x)
				return Number(x) * Number(y)
			},
			back() {
				let page = getCurrentPages()
				uni.navigateBack({
					delta: page.length - 1
				})
			},
			gologIn() {
				uni.navigateTo({
					url: '/pages/login/index'
				})
			},
			async getUidData() {
				if (this.login) {
					const res = await this.$http.post('/api/getOrder', {
						uid: this.userInfo.uid,
						order_id: this.order_id
					})
					if (res.data.success === true) {
						res.data.data.forEach(item => {
							item.time = this.dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')
							if (item.oder_id === this.order_id) {
								this.order_data = item
							}
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.mesg_warp {
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

		.meail {
			width: 100%;
			height: 90rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.right {
				flex: 1;
				margin-left: 20rpx;
			}
		}

		.mesg {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.right {
				flex: 1;
				margin-left: 20rpx;

				.textarea_mesg {
					background-color: rgba($color: #000000, $alpha: .05);
					border-radius: 8rpx;
					text-indent: 18rpx;
					letter-spacing: 4rpx;
				}
			}
		}
	}

	.order-list-item {
		height: 200rpx;
	}

	.btn-warp {
		width: 90%;
		margin: 30rpx auto 0;
		padding-bottom: 30rpx;
	}

	.btn {
		border: none;
		font-size: 32rpx;
		font-weight: bold;
		box-shadow: 0px 0px 6px 1px rgba(18, 18, 3, 0.1);
	}

	.Setmeal-warp {
		padding: 5%;
		display: flex;
		align-items: center;
		// justify-content: center;
		flex-direction: column;

		.Setmeal_active {
			border-color: $zhuse !important;
			color: $zhuse !important;
		}

		.Setmeal-left {
			// width: 150rpx;
			width: 100%;
			display: flex;
			align-items: center;

			.Setmeal-item-warp {
				display: flex;
				flex: 1;
				flex-wrap: wrap;
			}

			.Setmeal-info {
				width: 150rpx;
				margin-right: 20rpx;
				text-align: end;
			}

			.Setmeal-item {
				margin: 0 20rpx;
				color: $uni-text-color-grey;
				box-sizing: border-box;
				border: .5rpx solid $xt;
				padding: 12rpx;
				border-radius: 8rpx;
				margin-bottom: 20rpx;
			}
		}

		.Setmeal-right {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;

			.Setmeal-info {
				width: 150rpx;
				margin-right: 20rpx;
				text-align: end;
			}

			.item-info {
				flex: 1;
				margin-top: 20rpx;
				margin-left: 20rpx;
				border: .5rpx solid $xt;
				padding: 10rpx;
				border-radius: 8rpx;
			}

			.price {
				flex: 1;
				// margin-top: 2rpx;
				margin-left: 20rpx;
				padding: 10rpx;
				color: #ec4141;
			}
		}
	}

	.buttom {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 34rpx;

		.titel {
			display: inline-block;
			margin-right: 10rpx;
		}

		.price {
			color: #ec4141;
		}
	}

	.active {
		border: none !important;
	}

	.order-list-latter {
		width: 100%;
		height: 80rpx;
		margin: 20rpx 10rpx;
		padding: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid $xt;

		.desc {
			flex: 1;
			text-align: end;
			color: #999;
		}

		.icon-left {
			margin-right: 20rpx;
		}

		.icon {
			margin-left: 20rpx;
		}
	}

	.showItem {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20rpx;
	}

	.order-warp {
		width: 95%;
		margin: 60rpx auto 0;
		padding: 2.5% 5%;
		background-color: #fff;
		box-shadow: 0px 0px 6px 1px rgba(18, 18, 3, 0.1);
		font-size: 30rpx;
		border-radius: 16rpx;

		.showItem {
			color: $uni-text-color-grey;

			.order-icon {
				margin-left: 30rpx;
			}
		}



		.order-titel {
			font-size: 40rpx;
		}

		.order-time {
			margin-top: 26rpx;

			.order-time-titel {}

			.order-time-content {
				margin-top: 20rpx;
				font-size: 28rpx;
			}
		}

		.img {
			width: 150rpx;
		}


		.order-list {
			// max-height: 250rpx;
			margin-top: 30rpx;
			border-top: .5px solid $xt;
			border-bottom: .5px solid $xt;
			overflow: hidden;
			transition: all .3s ease-in-out;
		}

		.order-list-item {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.item-right {
				flex: 1;
				display: flex;
				justify-content: center;
				flex-direction: column;
				padding: 20rpx;


			}

			.item-desc {
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				color: #999;
				font-size: 26rpx;
			}

		}
	}

	page {
		background-color: #f8f8f8;
	}

	.address {
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
		justify-content: space-between;
		font-size: 30rpx;
		color: $uni-text-color;

		.icon-left {
			margin-right: 20rpx;
		}

		.icon-right {
			margin-left: 20rpx;
		}

		.address-info-warp {
			flex: 1;
			display: flex;
			align-items: center;
			flex-direction: column;

			.address-desc {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.desc {
					display: inline-block;
					width: 550rpx;
				}

				.address-desc-left,
				.address-desc-right {
					flex: 1;
				}

				.address-desc-right {
					text-align: end;
				}
			}
		}
	}

	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
