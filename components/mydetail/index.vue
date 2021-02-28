<template>
	<view class="detail-content">
		<view class="detail-warp" @click="goodList">
			<!-- <image class="detail-img" :src="img" mode="widthFix"></image> -->
			<!-- <u-lazy-load :image="img" class="detail-img"></u-lazy-load> -->
			<view class="detail-img-warp">
				<!-- #ifndef MP-WEIXIN -->
				<dc-loadimage mode="widthFix" :image-src="img" class="detail-img" loading-mode="looming-gray" :scroll-top="scrollTop"></dc-loadimage>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<easy-loadimage mode="widthFix" :image-src="img" class="detail-img" loading-mode="looming-gray" :scroll-top="scrollTop"></easy-loadimage>
				<!-- #endif -->
			</view>
			<text class="detail-titel"><text class="detail-text ellipsis">{{datas.spu_title}}</text></text>
			<text class="detail-desc"><text class="detail-text ellipsis">{{datas.spu_sub_title}}</text></text>
			<text class="detail-price" :class="{show:price === null}">￥{{towNum(price)}}</text>
			<text class="detail-oldprice" :class="{red:price === null}">￥{{towNum(oldprice)}}</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import dcLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	// import dcLoadimage from '@/components/dc-loadimage/dc-loadimage.vue'
	export default {
		data() {
			return {
				index: 0,
				price: 0,
				oldprice: 0,
			}
		},
		props: {
			dcLoadimage
		},
		computed: {
			img() {
				let img = null
				if (this.datas.spu_defall_show != null) {
					this.index = Number(this.datas.spu_defall_show)
				}
				this.datas.list.forEach((item, j) => {
					if (this.index === j) {
						img = item.img_url1
						this.price = item.price
						this.oldprice = item.oldprice
					}
				})
				return img
			}
		},
		props: {
			datas: Object,
			scrollTop: Number
		},
		methods: {
			...mapMutations(['setGoodList']),
			goodList() {
				this.setGoodList(this.datas)
				uni.setStorage({
					key: 'goodlist',
					data: this.datas
				})
				uni.navigateTo({
					url: '/pages/goodlist/index'
				})
				this.setHistory(this.datas.id)
			},
			setHistory(str) {
				let data = uni.getStorageSync('history')
				if (data === '') {
					let list = []
					list.unshift(str)
					uni.setStorage({
						key: 'history',
						data: list
					})
				} else {
					//历史记录中有相同的，删除原有的项，添加新项
					data.forEach((item, index) => {
						if (item === str || item === '') {
							data.splice(index, 1)
						}
					})
					data.unshift(str)
					uni.setStorage({
						key: 'history',
						data: data
					})
				}

			},
			towNum(num) {
				return Number(num).toFixed(2)
			},

		},
	}
</script>

<style lang="scss">
	.show {
		opacity: 0;
	}

	.detail-price {
		color: red;
	}

	.red {
		color: red;
		text-decoration: none !important;
	}

	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.detail-desc {
		margin-top: 10rpx;
		padding: 0 10rpx;

		.detail-text {
			display: inline-block;
			/* #ifdef  MP-WEIXIN */
			width: 260rpx;
			/* #endif*/
			width: 280rpx;
			margin: 0 auto;
			text-align: center;
			color: $uni-text-color-placeholder;
			margin-bottom: 5rpx;
		}
	}

	.detail-titel {
		.detail-text {
			display: inline-block;
			/* #ifdef  MP-WEIXIN */
			width: 230rpx;
			/* #endif*/
			width: 230rpx;
			margin: 0 auto;
			text-align: center;
			font-weight: bold;
			font-size: 16px;
		}
	}


	.detail-content {
		width: 100%;
		height: auto;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: $uni-text-color;
		margin: 0 2.5% 30rpx;
		/* #ifdef  MP-WEIXIN */
		margin: 0 5% 30rpx;
		/* #endif*/
		box-shadow: 0px 0px 6px 1px rgba(18, 18, 3, 0.1);
		border-radius: 12rpx;

		.detail-warp {
			padding: 20rpx 5rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-sizing: border-box;

			.detail-oldprice {
				text-decoration: line-through;
				margin-bottom: 5rpx;
			}
		}

		.detail-img-warp {
			// width: 60%;
			width: 230rpx;
			height: 230rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 10rpx 0;
			/* #ifndef MP-WEIXIN */
			// min-height: 260rpx;
			/* #endif */
			/* #ifdef MP-WEIXIN */
			// height: 260rpx;
			/* #endif */
		}

		.detail-img {
			width: 230rpx;
			// margin-bottom: 10rpx;
			height: 230rpx;
			/* #ifndef MP-WEIXIN */
			// height: auto;
			/* #endif */
		}
	}
</style>
