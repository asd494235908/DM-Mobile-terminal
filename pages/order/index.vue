<template>
	<view class="order-warp">
		<view class="oder-top">
			<!-- <text class="order-item" :class="{order_item_active:indexSwper === index}" v-for="(item,index) in order_titel" :key="index"
			 @click="handeSwper(index)">{{item}}</text> -->
			<u-subsection active-color="#ff9344" :list="order_titel" :current="indexSwper" @change="handeSwper" :bold="false"
			 class="order-item" :height="titleHeight"></u-subsection>
		</view>
		<view class="page-section-spacing">
			<swiper class="swiper" :current="indexSwper" @change="changeSwper" :circular="true" :indicator-dots="false"
			 :autoplay="false" :interval="2000" :duration="500">
				<swiper-item class="swiper-item-list">
					<scroll-view class="swiper-item uni-bg-red" :scroll-top="scrollTopone" scroll-y="true" :scroll-with-animation="true"
					 @scroll="onScrollone">

						<view class="" v-for="(item,index) in order_data" :key="index" v-if="item.type ===0">
							<order-list @getData="getUidData" @handelItem="handelShow(item)" :item="item" @handelShowMask="MaskShow"
							 :scrollTop="scrollTopone"></order-list>
						</view>
						<view class="no_data" v-if="!loadData && !isOrderOne">
							已经加载完毕了
						</view>
						<view class="order-Default" v-if="isOrderOne">
							<view class="order-img">

							</view>
							<view class="order-text">
								还没有订单哦
							</view>
						</view>

					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item-list">
					<scroll-view class="swiper-item uni-bg-red" :scroll-top="scrollToptow" scroll-y="true" :scroll-with-animation="true"
					 @scroll="onScrolltow" @scrolltolower="scrolltolower">
						<view class="" v-for="(item,index) in order_data" :key="index" v-if="item.type ===1">
							<order-list :item="item" @handelShowMask="MaskShow" :scrollTop="scrollToptow"></order-list>
						</view>
						<view class="no_data" v-if="!loadData && !isOrderTow">
							已经加载完毕了
						</view>
						<view class="order-Default" v-if="isOrderTow">
							<view class="order-img">

							</view>
							<view class="order-text">
								还没有订单哦
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item-list">
					<scroll-view class="swiper-item uni-bg-red" :scroll-top="scrollTopthr" scroll-y="true" :scroll-with-animation="true"
					 @scroll="onScrollher">
						<view class="" v-for="(item,index) in order_data" :key="index" v-if="item.type ===2">
							<order-list :item="item" @handelShowMask="MaskShow" :scrollTop="scrollTopthr"></order-list>
						</view>
						<view class="no_data" v-if="!loadData && !isOrderTrre">
							已经加载完毕了
						</view>
						<view class="order-Default" v-if="isOrderTrre">
							<view class="order-img">

							</view>
							<view class="order-text">
								还没有订单哦
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item-list">
					<scroll-view class="swiper-item uni-bg-blue" :scroll-top="scrollTopfur" scroll-y="true" :scroll-with-animation="true"
					 @scroll="onScrollfuer">
						<view class="" v-for="(item,index) in order_data" :key="index" v-if="item.type ===3">
							<order-list @handelItem="handelShow(item)" :item="item" @handelShowMask="MaskShow" :scrollTop="scrollTopone"></order-list>
						</view>
						<view class="no_data" v-if="!loadData && !isOrderFuor">
							已经加载完毕了
						</view>
						<view class="order-Default" v-if="isOrderFuor">
							<view class="order-img">

							</view>
							<view class="order-text">
								还没有订单哦
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view class="mask" v-show="isMask" @click.self="maskHide" v-if="list_Item !==null">
			<scroll-view class="mask-content" :scroll-top="maskscrollTop" scroll-y="true" :scroll-with-animation="true" @scroll="maskscrollTopes">
				<view class="order-info-titel">
					<view class="order-desc">
						订单编号：{{list_Item.oder_id}}
					</view>
					<view class="order-desc">
						提交时间：{{list_Item.time}}
					</view>
					<view class="order-desc">
						收货人姓名：{{list_Item.name}}
					</view>
					<view class="order-desc">
						联系方式：{{list_Item.phone}}
					</view>
					<view class="order-desc">
						地址：{{list_Item.address}}
					</view>
					<view class="order-desc">
						地址详情：{{list_Item.address_info}}
					</view>
				</view>
				<view class="order-content">
					<view class="order-item" v-for="(o,j) in list_Item.data_list" :key="j">
						<view class="item-left" style="width: 160rpx;height: 160rpx;">
							<easy-loadimage mode="widthFix" :image-src="o.img+'?x-oss-process=image/resize,w_300/format,webp/quality,Q_100'"
							 class="item-list-item-img" loading-mode="looming-gray" :scroll-top="maskscrollTop"></easy-loadimage>
						</view>
						<view class="item-right">
							<view class="item-desc">
								<view class="item-name item-text">
									<text class="item-name-text">{{o.name}}</text>
								</view>
								<view class="item-style item-text">
									{{o.style}}<text class="item-size">{{o.size}}</text>
								</view>
							</view>
							<view class="item-info ">
								<view class="item-price item-text">
									￥{{o.price}}
								</view>
								<view class="item-num item-style">
									x{{o.suplist_num}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="btn" v-if="list_Item.type ===0 || list_Item.type ===3|| list_Item.type ===2">
					<u-button @click="handelShow(undefined)" :hair-line="false" :ripple="true" type="error" :plain="true" size="default"
					 throttle-time="500">删除</u-button>
				</view>
			</scroll-view>
			<view class="dell" @click="maskHide">
				<u-icon name="close" color="#fff"></u-icon>
			</view>
		</view>
		<u-toast position="bottom" icon ref="uToast" />
		<u-modal :show-cancel-button="true" :zoom="true" v-model="show" :content="content" @confirm="deellOrder"></u-modal>
		<my-loading :show="isLoading"></my-loading>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import OrderList from '../../components/orderList/index.vue'
	import MyLoading from '../../components/my-loading'
	export default {
		data() {
			return {
				indexSwper: 0,
				order_titel: ['待付款', '待收货', '已完成', '未完成'],
				order_data: [],
				isMask: false,
				list_Item: null,
				show: false,
				content: '删除后无法恢复',
				scrollTopone: 0,
				scrollToptow: 0,
				scrollTopthr: 0,
				scrollTopfur: 0,
				maskscrollTop: 0,
				timer: null,
				windowHeight: 0,
				isLoading: false,
				page: 1,
				size: 4,
				AllData: 0,
				loadData: true
			}
		},
		onLoad: function(option) {
			let index = Number(option.index) || 0
			this.indexSwper = index
			const self = this
			uni.getSystemInfo({
				success(e) {
					self.windowHeight = e.safeArea.height + 'px'
				}
			})
			uni.$on('update', (data) => {
				this.getUidData()
			})
		},
		components: {
			OrderList,
			MyLoading
		},
		created: function() {
			if (this.login === false) {
				uni.redirectTo({
					url: '/pages/login/index'
				})
			} else {
				this.getUidData()
			}
		},
		computed: {
			...mapState(['login', 'userInfo']),
			isOrderOne() {
				let list = this.order_data.filter(item => item.type === 0)
				list = list.length === 0 ? true : false
				return list
			},
			isOrderTow() {
				let list = this.order_data.filter(item => item.type === 1)
				list = list.length === 0 ? true : false
				return list
			},
			isOrderTrre() {
				let list = this.order_data.filter(item => item.type === 2)
				list = list.length === 0 ? true : false
				return list
			},
			isOrderFuor() {
				let list = this.order_data.filter(item => item.type === 3)
				list = list.length === 0 ? true : false
				return list
			},
			titleHeight() {
				// #ifdef MP-WEIXIN
				return '70'
				// #endif
				// #ifndef MP-WEIXIN
				return '70'
				// #endif
			}
		},
		watch: {
			login(x) {
				if (x === false) {
					uni.navigateTo({
						url: '/pages/login/index'
					})
				}
			},
		},
		methods: {
			//滚动到底部触发
			scrolltolower() {
				this.page += 1
				this.getUidData()
			},
			maskscrollTopes(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.maskscrollTop = e.detail.scrollTop
				}, 100)
			},
			onScrollone(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.scrollTopone = e.detail.scrollTop
				}, 100)
			},
			onScrolltow(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.scrollToptow = e.detail.scrollTop
				}, 100)
			},
			onScrollher(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.scrollTopthr = e.detail.scrollTop
				}, 100)
			},
			onScrollfuer(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.scrollTopfur = e.detail.scrollTop
				}, 100)
			},
			//调起删除
			handelShow(item) {
				if (item !== undefined) {
					this.list_Item = item
					this.show = true
				} else if (item === undefined) {
					this.show = true
				}

			},
			//删除的订单
			async deellOrder() {
				this.isLoading = true
				const res = await this.$http.post('/api/dellOrder', {
					data: this.list_Item
				})
				if (res.data.success === true) {
					this.isLoading = false
					this.$refs.uToast.show({
						title: '删除成功',
						type: 'success'
					})
					this.isMask = false
					this.loadData = true
					this.order_data = []
					this.getUidData()
				}
			},
			MaskShow(item) {
				this.isMask = true
				this.list_Item = item
			},
			maskHide() {
				this.isMask = false
			},
			changeSwper(e) {
				this.indexSwper = e.detail.current
				this.order_data = []
				this.loadData = true
				this.AllData = 0
				this.page = 1
				this.size = 4
				this.getUidData()
			},
			handeSwper(e) {
				this.indexSwper = e
			},
			async getUidData() {

				if (this.loadData === false) return
				// this.isLoading = true
				const res = await this.$http.post('/api/getScrollOrder', {
					uid: this.userInfo.uid,
					page: this.page,
					size: this.size,
					idx: this.indexSwper
				})
				if (res.data.success === true) {
					res.data.data.forEach(item => {
						item.time = this.dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')
					})
					this.order_data.push(...res.data.data)
					this.AllData = res.data.allData
					if (this.AllData === this.order_data.length) {
						this.loadData = false
						// this.$refs.uToast.show({
						// 	title: '加载完毕',
						// 	type: 'success'
						// })
						// this.isLoading = false
						return

					}

					this.isLoading = false
				}
			}
		}
	}
</script>

<style lang="scss">
	.order-Default {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.order-img {
			width: 80%;
			height: 500rpx;
			/* #ifdef MP-WEIXIN */
			background: url('https://www.dcmaomi.com:3000/serverImage/order_no.png');
			/* #endif */
			/* #ifndef MP-WEIXIN */
			background: url('../../static/imges/order_no.png');
			/* #endif */
			background-size: cover;
		}

		.order-text {
			font-size: 32rpx;
			font-weight: bold;
			color: #999;
		}
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba($color: #000000, $alpha: 0.5);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.btn {
			margin-top: 20rpx;
		}

		.dell {
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 60rpx;
			border: 2rpx solid $uni-text-color-inverse;
			border-radius: 50%;
		}

		.order-desc {
			margin: 20rpx 0;
		}

		.order-item {
			margin-top: 20rpx;
			display: flex;
			align-items: center;

			.item-right {
				display: flex;

				.item-info {
					display: flex;
					flex-direction: column;

				}

				.item-style {
					color: $uni-text-color-grey;
				}

				.item-size {
					margin-left: 20rpx;
				}

				.item-text {
					margin: 20rpx 0;
				}

				.item-name-text {
					display: inline-block;
					width: 360rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					white-space: normal !important;
					word-wrap: break-word;
				}
			}
		}

		.mask-content {
			width: 90%;
			height: 700rpx;
			padding: 2%;
			background-color: #fff;
			border-radius: 16rpx;

			.order-info-titel {
				padding-left: 20rpx;
			}
		}
	}

	.order_item_active {
		color: $zhuse !important;
		background-color: #fff;
	}

	.oder-top {
		display: flex;
		align-items: center;
		background-color: #eee;

		.order-item {
			flex: 1;
			text-align: center;
			padding: 20rpx 5rpx;
			color: $uni-text-color-placeholder;
			box-sizing: border-box;
		}
	}

	.page-section-spacing {
		position: fixed;
		width: 100%;
		height: 100%;

		.swiper {
			height: 100%;

			.swiper-item-list {
				overflow: auto;
				height: 90%;
			}

			.swiper-item {
				height: 90%;

				.no_data {
					width: 100%;
					height: 100rpx;
					display: flex;
					align-items: flex-start;
					justify-content: center;
				}
			}
		}
	}
</style>
