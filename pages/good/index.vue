<template>
	<view class="contenner">
		<u-toast position="bottom" icon ref="uToast" />
		<uni-nav-bar class="nav" :fixed="true" background-color="#ff9344" :border="false">

			<view slot="default" class="text-center ">
				<!-- #ifdef MP-WEIXIN -->
				<text v-if="isValidate">购物车</text>
				<text v-else>发现</text>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				购物车
				<!-- #endif -->
			</view>
			<!--  #ifndef  MP-WEIXIN -->
			<view slot="right" class="text-center " @click="handeisCatzuo" v-if="login">
				操作
			</view>
			<!--  #endif -->

			<!--  #ifdef  MP-WEIXIN -->
			<view slot="left" class="text-center " @click="handeisCatzuo" v-if="login">
				操作
			</view>
			<!--  #endif -->
		</uni-nav-bar>

		<!-- #ifdef MP-WEIXIN -->
		<view class="" v-if="isValidate">
			<view class="noLogIn" v-if="login === false">
				<view class="noLogIn-img-warp">
					<image src="../../static/imges/uoligin.png" mode="widthFix" class="noLogIn-img"></image>
				</view>
				<text class="noLogIn-text">你还未登录哦</text>
				<button class="noLogIn-btn" @click="goLogIN">点击登录</button>
			</view>
			<view class="cartEmpty" v-if="cartEmpty">
				<image :src="isnobg" mode="widthFix" class="cartEmpty-img"></image>
				<text class="cartEmpty-text">购物车什么也没有哦~</text>
				<text class="cartEmpty-laer" @click="goIndex">去选购商品吧</text>
			</view>
			<view class="cart" v-if="login === true && cartEmpty=== false">
				<view class="address" v-if="login === true && cartEmpty=== false">
					<view class="address-left" v-if="info.user_cart">共{{info.user_cart.length}}件宝贝</view>
					<view class="address-right" @click="goAdderess"><text class="laer ellipsis">收货地址：{{initAddress}}</text></view>
				</view>
				<evan-checkbox-group v-model="list" class="cart-warp">
					<view class="cart-item" v-for="(item,index) in info.user_cart" :key="index">
						<view class="cart-checkbox">
							<evan-checkbox :label="item.id" v-model="item.checkbox">
								<template>
									<view class="checkbox-warp" :class="{isActive:item.checkbox}" slot="icon">
										<u-icon v-if="item.checkbox" name="checkbox-mark" color="#fff" size="28"></u-icon>
									</view>
								</template>
							</evan-checkbox>
						</view>
						<view class="item-info">
							<view class="item-info-img" @click="goGoodList(item.data[0])">
								<easy-loadimage mode="widthFix" :image-src="item.data[0].img_url1" loading-mode="looming-gray" :scroll-top="scrollTop"
								 style="width: 180rpx;height: 180rpx;"></easy-loadimage>
							</view>

							<!-- <image :src="item.data[0].img_url1" mode="widthFix" class="item-info-img"></image> -->
							<view class="item-info-desc">
								<text class="item-info-text titel">{{item.data[0].spu_title}}</text>
								<text class="item-info-text titel">{{item.style}}</text>
								<text class="item-info-text titel">{{item.size}}</text>
								<text class="item-info-text price">￥{{AllPrice(item.price,
								item.suplist_num)}}</text>
								<!-- <text class="item-info-text titel">数量 x{{item.suplist_num}}</text> -->
								<lxc-count class="item-info-text" :min="1" @handleCount="handleCountClick" :index="item.id" :value="item.suplist_num"
								 :delayed="200">
								</lxc-count>

							</view>
						</view>
					</view>
				</evan-checkbox-group>
				<view class="good-bottom">
					<view class="good-left">
						<evan-checkbox style="margin-right: 10rpx;" @change="HandelAllGoods" v-model="allGoods">
							<template>
								<view class="checkbox-warp" :class="{isActive:allGoods}" slot="icon">
									<u-icon v-if="allGoods" name="checkbox-mark" color="#fff" size="28"></u-icon>
								</view>
							</template>
						</evan-checkbox>

						全选
					</view>
					<view class="good-right">
						<view class="all-price" v-if="!isCatzuo">
							<text class="text">合计:</text>
							<text class="price">￥{{AllPriceList}}</text>
						</view>
						<view class="all-btn-warp" @click="subMit" v-if="!isCatzuo">
							<view class="all-btn">
								结算({{listInfo.length}})
							</view>
						</view>
						<view class="all-dell-warp" v-if="isCatzuo" @click="dellItem">
							<view class="all-btn">
								删除
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-else>
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list_aer" :key="item.id" @click="click"
			 @open="open" :options="options">
				<view class="item u-border-bottom">
					<image mode="aspectFill" :src="item.images" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<text class="title u-line-2">{{ item.title }}</text>
					</view>
				</view>
			</u-swipe-action>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="noLogIn" v-if="login === false">
			<view class="noLogIn-img-warp">
				<image src="../../static/imges/uoligin.png" mode="widthFix" class="noLogIn-img"></image>
			</view>
			<text class="noLogIn-text">你还未登录哦</text>
			<button class="noLogIn-btn" @click="goLogIN">点击登录</button>
		</view>
		<view class="cartEmpty" v-if="cartEmpty">
			<image :src="isnobg" mode="widthFix" class="cartEmpty-img"></image>
			<text class="cartEmpty-text">购物车什么也没有哦~</text>
			<text class="cartEmpty-laer" @click="goIndex">去选购商品吧</text>
		</view>
		<view class="cart" v-if="login === true && cartEmpty=== false">
			<view class="address" v-if="login === true && cartEmpty=== false">
				<view class="address-left" v-if="info.user_cart">共{{info.user_cart.length}}件宝贝</view>
				<view class="address-right" @click="goAdderess"><text class="laer ellipsis">收货地址：{{initAddress}}</text></view>
			</view>
			<evan-checkbox-group v-model="list" class="cart-warp">
				<view class="cart-item" v-for="(item,index) in info.user_cart" :key="index">
					<view class="cart-checkbox">
						<evan-checkbox :label="item.id" v-model="item.checkbox">
							<template>
								<view class="checkbox-warp" :class="{isActive:item.checkbox}" slot="icon">
									<u-icon v-if="item.checkbox" name="checkbox-mark" color="#fff" size="28"></u-icon>
								</view>
							</template>
						</evan-checkbox>
					</view>
					<view class="item-info">
						<view class="item-info-img" @click="goGoodList(item.data[0])">
							<easy-loadimage mode="widthFix" :image-src="item.data[0].img_url1" loading-mode="looming-gray" :scroll-top="scrollTop"
							 style="width: 180rpx;height: 180rpx;"></easy-loadimage>
						</view>

						<!-- <image :src="item.data[0].img_url1" mode="widthFix" class="item-info-img"></image> -->
						<view class="item-info-desc">
							<text class="item-info-text titel">{{item.data[0].spu_title}}</text>
							<text class="item-info-text titel">{{item.style}}</text>
							<text class="item-info-text titel">{{item.size}}</text>
							<text class="item-info-text price">￥{{AllPrice(item.price,
							item.suplist_num)}}</text>
							<!-- <text class="item-info-text titel">数量 x{{item.suplist_num}}</text> -->
							<lxc-count class="item-info-text" :min="1" @handleCount="handleCountClick" :index="item.id" :value="item.suplist_num"
							 :delayed="200">
							</lxc-count>

						</view>
					</view>
				</view>
			</evan-checkbox-group>
			<view class="good-bottom">
				<view class="good-left">
					<evan-checkbox style="margin-right: 10rpx;" @change="HandelAllGoods" v-model="allGoods">
						<template>
							<view class="checkbox-warp" :class="{isActive:allGoods}" slot="icon">
								<u-icon v-if="allGoods" name="checkbox-mark" color="#fff" size="28"></u-icon>
							</view>
						</template>
					</evan-checkbox>

					全选
				</view>
				<view class="good-right">
					<view class="all-price" v-if="!isCatzuo">
						<text class="text">合计:</text>
						<text class="price">￥{{AllPriceList}}</text>
					</view>
					<view class="all-btn-warp" @click="subMit" v-if="!isCatzuo">
						<view class="all-btn">
							结算({{listInfo.length}})
						</view>
					</view>
					<view class="all-dell-warp" v-if="isCatzuo" @click="dellItem">
						<view class="all-btn">
							删除
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {

				list_aer: [{
						id: 1,
						title: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
						images: 'https://www.dcmaomi.com:3010/serverImage/20210131012347_14176.jpg',
						show: false
					},
					{
						id: 2,
						title: '新丰绿树起黄埃，数骑渔阳探使回，霓裳一曲千峰上，舞破中原始下来',
						images: 'https://www.dcmaomi.com:3010/serverImage/20210131012200_18956.jpg',
						show: false
					},
					{
						id: 3,
						title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: 'https://www.dcmaomi.com:3010/serverImage/20210131012158_16581.png',
						show: false,
					},{
						id: 4,
						title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: 'https://www.dcmaomi.com:3010/serverImage/20210131012158_18905.jpg',
						show: false,
					},{
						id: 5,
						title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: 'https://www.dcmaomi.com:3010/serverImage/20210131012156_12384.jpg',
						show: false,
					},
					{
						id: 6,
						title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: 'https://www.dcmaomi.com:3010/serverImage/20210131012155_13095.png',
						show: false,
					},
					{
						id: 7,
						title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: 'https://www.dcmaomi.com:3010/serverImage/20210131012153_15687.png',
						show: false,
					},
					{
						id: 8,
						title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: 'https://www.dcmaomi.com:3010/serverImage/20210131012152_11396.jpg',
						show: false,
					},
				],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [{
						text: '收藏',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],

				info: {},
				list: [],
				listInfo: [],
				allGoods: false,
				isCatzuo: false,
				isAdd: false,
				logdin: false,
				scrollTop: 0

			}
		},
		onPageScroll({
			scrollTop
		}) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			this.scrollTop = scrollTop;
		},
		beforeUpdate: function() {
			// this.intData()
			this.initAdd()
		},
		onLoad: function() {
			if (this.login === true && this.cartEmpty === false) {
				this.intData()
			}
			uni.$on('updataGood', () => {
				// console.log('123xinxi')
				this.getData()
			})
		},
		computed: {
			...mapState(['login', 'userInfo', 'isValidate']),
			AllPriceList() {
				if (this.listInfo.length !== 0) {
					let price = 0
					this.listInfo.forEach(item => {
						price += item.price * item.suplist_num
					})
					return Number(price).toFixed(2)
				} else {
					return 0
				}

			},
			initAddress() {
				if (this.login) {
					if (this.info.address === undefined) return '未设置地址'
					if (this.info.address.length === 0) return '未设置地址'
					let address = this.info.address.find(item => item.difall === 0)
					address = address === undefined ? "未设置默认地址" : address.address
					return address
				}
			},
			subaddress() {
				if (this.login) {
					if (this.info.address === undefined) return ''
					let address = this.info.address.find(item => item.difall === 0)
					return address
				}
			},
			cartEmpty() {
				if (this.login) {
					if (this.userInfo.user_cart === undefined) return false
					return this.userInfo.user_cart.length === 0 ? true : false
				} else {
					return false
				}
			},
			isnobg() {
				// #ifndef MP-WEIXIN
				return '../../static/imges/11812259.png'
				// return 'https://s1.ax1x.com/2020/10/17/0L3dZF.png'
				// #endif
				// #ifdef MP-WEIXIN
				return 'https://s1.ax1x.com/2020/10/17/0L3dZF.png'
				// #endif
			},
		},
		watch: {
			// 监听List变化
			list(x, y) {
				if (this.login) {
					if (x.length === 0) {
						this.listInfo = []
					} else {
						this.listInfo = []
						x.forEach(item => {
							this.info.user_cart.forEach(o => {
								if (item === o.id) {
									this.listInfo.push(o)
								}
							})
						})
					}
				}
			},
			listInfo(x, y) {
				if (this.login) {
					if (x.length === this.info.user_cart.length) {
						this.allGoods = true
					} else {
						this.allGoods = false
					}
				}
			},
		},
		onShow: function() {
			const res = uni.getStorageSync('token')
			if (res == '') {}
			if (this.login === true) {
				this.intData()
			}
		},
		onPullDownRefresh: function() {
			uni.startPullDownRefresh({
				success: () => {
					if (this.login === true && this.cartEmpty === false) {
						this.getData()
					}
				}
			})
		},
		methods: {
			...mapMutations(['setUserInfo', 'setGoodList']),
			click(index, index1) {
				if (index1 == 1) {
					this.list_aer.splice(index, 1);
					// this.$u.toast(`删除了第${index}个cell`);
				} else {
					this.list_aer[index].show = false;
					// this.$u.toast(`收藏成功`);
				}
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list_aer[index].show = true;
				this.list_aer.map((val, idx) => {
					if (index != idx) this.list_aer[idx].show = false;
				})
			},
			initAdd() {
				if (this.login) {
					let address = this.userInfo.address
					address = JSON.stringify(address)
					address = JSON.parse(address)
					this.info.address = address
					// this.userInfo.address
				}
			},
			goAdderess() {
				if (this.login) {
					uni.navigateTo({
						url: '/pages/address/index'
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/index'
					})
				}
			},
			//进入GoodList
			async subMit() {
				if (this.login) {
					if (this.listInfo.length === 0) {
						this.$refs.uToast.show({
							title: '请添加商品',
							type: 'warning'
						})
						return
					}
				}
				const time = this.getTime()
				const orid = this.getOriderId()
				const type = 0
				const uid = this.info.uid
				this.listInfo.forEach(item => {
					item.order_id = orid
				})
				if (this.subaddress === undefined) {
					this.$refs.uToast.show({
						title: '请添加默认地址',
						type: 'warning'
					})
					return
				}
				const res = await this.$http.post('/api/submitOrder', {
					type,
					time,
					orid,
					uid,
					data: this.listInfo,
					Address: this.subaddress,
					userNickName: this.userInfo.user_name
				})
				if (res.data.success === true) {
					uni.navigateTo({
						url: '/pages/settlement/settlement?orid=' + orid
					})
				}
			},
			getOriderId() {
				let time = new Date()
				const year = time.getFullYear()
				const Month = time.getMonth() + 1
				const date = time.getDate()
				const Hours = time.getHours()
				const Minutes = time.getMinutes()
				const Seconds = time.getSeconds()
				const id =
					`${year}${this.towNum(Month)}${this.towNum(date)}${this.towNum(Hours)}${this.towNum(Minutes)}${this.towNum(Seconds)}`
				return id
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
			async goGoodList(item) {
				const res = await this.$http.post('/api/getItem', {
					id: item.spec_id
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
			//删除选中的item
			async dellItem() {
				if (this.login) {
					this.isAdd = false
					const res = await this.$http.post('/api/GoodItem', {
						isAdd: this.isAdd,
						uid: this.info.uid,
						data: this.listInfo
					})
					if (res.data.success === true) {
						this.getData()
					}
				}
			},
			//是否显示删除按钮
			handeisCatzuo() {
				this.isCatzuo = !this.isCatzuo
			},
			//是否全选
			HandelAllGoods(e) {
				if (e) {
					this.list = []
					this.info.user_cart.forEach(item => {
						item.checkbox = true
						this.list.push(item.id)
					})
				} else {
					this.info.user_cart.forEach(item => {
						item.checkbox = false
						this.list = []
					})
				}
			},
			//计算item 数量*价格
			AllPrice(x, y) {
				let num = x * y
				return Number(num).toFixed(2)
			},
			//点击计数器变化
			handleCountClick(e, x) {
				this.info.user_cart.forEach(item => {
					if (item.id === x) {
						item.suplist_num = e
					}
				})
			},
			//checkbox-item
			intData() {
				if (this.login) {
					this.info = []
					let data = JSON.stringify(this.userInfo)
					data = JSON.parse(data)
					this.info = data
				}
			},
			checkedAll() {
				this.list = []
				//判断当前是否有没有被选择的
				let isAllTrue = true
				this.info.user_cart.forEach(item => {
					if (item.checkbox === false) {
						isAllTrue = false
						return
					}
				})
				if (!isAllTrue) {
					this.info.user_cart.forEach(item => {
						item.checkbox = true
						this.listInfo.push(item)
						this.list.push(item.id)
					})
				} else {
					this.info.user_cart.forEach(item => {
						// const a = item.checkbox
						item.checkbox = false
						this.list = [],
							this.listInfo = []
					})
				}

			},
			//手动验证用户信息
			async getData() {
				const res = await this.$http.post('/api/validate', {})
				if (res.data.success === true) {
					this.setUserInfo(res.data.data)
					this.intData()
					uni.stopPullDownRefresh();
				}
			},
			goIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			goLogIN() {
				uni.navigateTo({
					url: '/pages/login/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.contenner {}
/* #ifdef MP-WEIXIN */
.item {
		display: flex;
		padding: 20rpx;
		margin: 10rpx 0 ;
	}
	
	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}
	
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
/* #endif */
	.address {
		border-bottom: 0.5px solid $xt;
		display: flex;
		align-items: center;

		.address-left {
			width: 30%;
			text-align: center;
		}

		.address-right {
			width: 70%;
			display: flex;
			align-items: center;

			.laer {
				display: inline-block;
				width: 100%;
				padding: 4% 2.5%;
			}

			.ellipsis {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}

	.isActive {
		background-color: $zhuse;
		border: none !important;
	}

	.checkbox-warp {
		width: 40rpx;
		height: 40rpx;
		border: .5rpx solid $xt;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}

	.good-bottom {
		position: fixed;
		bottom: 0;
		/*#ifdef H5*/
		bottom: 50px;
		/*#endif*/
		width: 100%;
		border-top: 0.5px solid $xt;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10rpx 5%;
		z-index: 999;
		background-color: #fff;

		.good-right {
			display: flex;
			align-items: center;

			.all-price {
				margin-right: 20rpx;
				font-size: 26rpx;

				.text {
					margin-right: 5rpx;
				}

				.price {
					color: $u-type-error;

				}
			}

			.all-dell-warp {
				width: 180rpx;
				height: 80rpx;
				border-radius: 90rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border: .5px solid $u-type-error;

				.all-btn {
					text-align: center;
					font-size: 32rpx;
					color: $u-type-error;
				}
			}

			.all-btn-warp {
				width: 180rpx;
				height: 80rpx;
				border-radius: 90rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background-image: linear-gradient(62deg, rgb(247, 206, 104) 0%, rgb(251, 171, 126) 100%);

				.all-btn {
					text-align: center;
					font-size: 32rpx;
					color: #fff;
				}
			}
		}

		.good-left {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;
		}
	}

	.text-center {
		width: 100%;
		text-align: center;
		color: #fff;
	}

	.cart {
		width: 100%;
		/*#ifndef H5*/
		margin-top: 60rpx;
		// padding-bottom: 200rpx;
		/*#endif*/
		padding-bottom: 150rpx;

		.cart-warp {
			width: 100%;

			.cart-item {
				width: 90%;
				margin: 0 auto;
				display: flex;
				margin-top: 20rpx;
				box-shadow: 0px 0px 6px 1px rgba(18, 18, 3, 0.1);
				border-radius: 16rpx;

				.cart-checkbox {
					width: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.item-info {
					flex: 1;
					display: flex;
					align-items: center;

					.item-info-img {
						width: 200rpx;
						height: 200rpx;
						padding: 10rpx;
					}

					.item-info-desc {
						flex: 1;
						padding: 10rpx 10rpx;
						display: flex;
						flex-direction: column;
						justify-content: center;

						.price {
							color: red !important;
						}

						.titel {
							font-size: 32rpx;
						}

						.item-info-text {
							margin: 10rpx 0;
							font-size: 28rpx;
							color: $uni-text-color;
						}
					}
				}
			}
		}
	}

	.cartEmpty {
		width: 100%;
		height: 80%;
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.cartEmpty-laer {
			color: $u-type-error;
			margin-top: 30rpx;
		}

		.cartEmpty-img {
			width: 300rpx;
			position: relative;
			left: -20rpx;
		}

		.cartEmpty-text {
			display: inline-block;
			width: 100%;
			font-size: 32rpx;
			text-align: center;
			margin-top: 20rpx;
		}
	}

	.noLogIn {
		width: 100%;
		height: 100%;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.noLogIn-text {
			color: $uni-text-color-db;
			font-size: 30rpx;
			font-weight: bold;
			margin-bottom: 30rpx;
		}

		.noLogIn-img {
			width: 300rpx;
			height: 300rpx;
			margin-bottom: 30rpx;
		}

		.noLogIn-btn {
			width: 200rpx;
			border: none;
			height: 30px;
			line-height: 30px;
			font-size: 30rpx;
			background-color: $uni-color-error;
			color: $uni-text-color-inverse;
			border-radius: 50rpx;
		}

		.noLogIn-btn::after {
			border: none;
		}
	}
</style>
