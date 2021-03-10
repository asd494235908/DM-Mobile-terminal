<template>
	<view class="container">
		<!-- 导航栏 -->
		<uni-nav-bar background-color="#ff9344" shadow class="nav" fixed="true">
			<!--  #ifdef  MP-WEIXIN ||MP-QQ -->
			<view slot="left" class="lishi" @click="goHistory">
				<u-icon name="clock" color="#fff" size="50" class="lishi-img"></u-icon>
			</view>
			<!--  #endif -->
			<view slot="default" class="serch-warp" @click="goSearch">
				<view class="serch">
					<image src="/static/imges/search.png" class="serch-img" mode="widthFix"></image>
					<text class="serch-text">请输入你想搜索的商品</text>
				</view>
			</view>
			<!--  #ifndef  MP-WEIXIN ||MP-QQ-->
			<view slot="right" class="lishi" @click="goHistory">
				<u-icon name="clock" color="#fff" size="50" class="lishi-img"></u-icon>
			</view>
			<!--  #endif -->

		</uni-nav-bar>
		<!-- 轮播图组件 -->
		<!-- #ifdef MP-WEIXIN ||MP-QQ-->
		<view class="desc-swper">

		</view>
		<!-- #endif -->
		<u-swiper :list="swiper" class="swiper-contener" :effect3d="true" mode="round" :height="300" :bgColor="'#fff'" @click="handeSwiper"></u-swiper>
		<!-- icons组件 -->
		<icons :icons="icons" :scrollTop="scrollTop"></icons>
		<view class="contenner" v-for="(item,index) in hot" :key="index">
			<my-titel v-if="item.type ===1" :titel="item.activity">
				<view class="contenner-list" slot="good">
					<my-detail v-for="(o,j) in item.list" :key="o.id" :datas="o" class="contenner-item" :scrollTop="scrollTop"></my-detail>
				</view>
			</my-titel>
			<my-titel v-if="item.type ===2" :titel="item.activity">
				<view class="contenner-list" slot="good">
					<image :src="item.hot_img" mode="widthFix" class="contenner-img"></image>
					<!-- <u-lazy-load :image="item.hot_img" class="contenner-img"></u-lazy-load> -->
					<my-detail v-for="(o,j) in item.list" :key="o.id" :datas="o" class="contenner-item" :scrollTop="scrollTop"></my-detail>
				</view>
			</my-titel>
		</view>
		<u-toast position="bottom" icon ref="uToast" />
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import Icons from "@/pages/index/icosns/index.vue"
	import MyTitel from "@/components/mytitel/index.vue"
	import MyDetail from "@/components/mydetail/index.vue"
	export default {
		data() {
			return {
				swiper: [],
				icons: [],
				hot: [],
				scrollTop: 0,
				timer: null,
			}
		},
		created() {
			this.getData()
		},
		onPageScroll({
			scrollTop
		}) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				this.scrollTop = scrollTop;
			}, 100)
		},
		components: {
			uniNavBar,
			uniIcons,
			Icons,
			MyTitel,
			MyDetail
		},
		computed: {},
		methods: {
			handeSwiper(e) {

				const data = this.swiper[e]
				if (data.link && data.link !== 'null') {
					this.goGood(data.link)
				} else {
					this.goList(data.alt)
				}
			},
			async goGood(id) {
				const res = await this.$http.post("/api/getItem", {
					id
				})
				if (res.data.success === true) {
					uni.setStorage({
						key: 'goodlist',
						data: res.data.data[0],
						success() {
							uni.navigateTo({
								url: '/pages/goodlist/index'
							})
						}
					})

				} else {
					this.$refs.uToast.show({
						title: '数据有误',
						type: 'error'
					})
				}
			},
			goList(alt) {
				uni.navigateTo({
					url: '/pages/listgood/index?val=' + alt
				});
			},
			goHistory() {
				uni.navigateTo({
					url: '/pages/History/History'
				})
			},
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			handelClick(id) {
				// console.log(id)
			},
			listPages() {
				this.$Router.push('/pages/goodlist/index')

			},
			hotIcons(item) {
				item.list.forEach(o => {
					this.icons.push(o)
				})
			},
			async getData() {
				const res = await this.$http.get('/api/home')
				if (res.data.success === true) {
					this.swiper = res.data.data.swiper
					let hot = res.data.data.hot
					hot.forEach((item) => {
						if (item.type === 0) {
							this.hotIcons(item)
						}
					})
					this.hot = hot
				}
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef MP-WEIXIN ||MP-QQ */
	.desc-swper {
		height: 80rpx;
	}

	/* #endif */
	.swiper-contener {
		margin-top: 50rpx;
		/* #ifndef H5*/
		margin-top: 80rpx;
		/* #endif*/
	}

	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.contenner-list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;

		.contenner-img {
			width: 95%;
			margin: 0 auto;
			border-radius: 8px;
			margin-bottom: 30rpx;
			box-shadow: 0px 0px 6px 1px rgba(18, 18, 3, 0.1);

		}

		.contenner-item {
			width: 45%;
			/* #ifdef MP-WEIXIN||MP-QQ */
			width: 50%;
			/* #endif */
			height: auto;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
		}
	}

	.icon {
		width: 120rpx;
		height: 90rpx;
	}

	/* #ifdef MP-WEIXIN ||MP-QQ */
	.lishi {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.lishi-img {
			width: 42rpx;
			height: 42rpx;
		}
	}

	/* #endif */
	.lishi {
		display: flex;
		align-items: center;

		.lishi-img {
			width: 42rpx;
			height: 42rpx;
		}
	}

	.nav-left {
		color: $uni-text-color-inverse;
		font-size: 48rpx;
	}

	/* #ifdef MP-WEIXIN ||MP-QQ */
	.serch-warp {
		width: 85%;

		.serch-text {
			font-size: 20rpx;
			margin-left: 10rpx;
			letter-spacing: 2rpx;
			color: #a5a8a9;
		}

		/* #endif */
		/* #ifndef MP-WEIXIN ||MP-QQ*/
		.serch-warp {
			width: 100%;
			padding: 10rpx 0;
			display: flex;
			align-items: center;

			.serch-text {
				height: 36rpx;
				display: flex;
				align-items: center;

				font-size: 24rpx;
				margin-left: 10rpx;
				letter-spacing: 5rpx;
				color: #a5a8a9;
			}

			/* #endif */

			/* #ifndef H5 */
			.serch-text {
				font-size: 28rpx;
				margin-left: 10rpx;
				letter-spacing: 2rpx;
				color: #a5a8a9;
			}

			/* #endif */
			.serch {
				width: 100%;
				background-color: #fff;
				height: 58rpx;
				display: flex;
				align-items: center;
				border-radius: 100rpx;
			}

			.serch-img {
				width: 32rpx;
				height: 32rpx;
				margin-left: 20rpx;
			}
		}

		.nav-hiet {
			width: 100%;
			background-color: $zhuse;
			height: 60rpx;
		}

		.swiper {
			width: 90%;
			border-radius: 10rpx;
			overflow: hidden;
			margin: 20rpx auto 0;

			.swiper-contener {
				border-radius: 10rpx;
				overflow: hidden;
				margin-top: 120rpx;

				.swiper-item {
					.swiper-img {
						border-radius: 10rpx;
						width: 100%;
					}
				}
			}
		}
</style>
