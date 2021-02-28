<template>
	<scroll-view class="item-warp" :scroll-top="scrollTop" scroll-y="true" @scroll="onScroll">
		<view class="item-img-warp">
			<image v-if="listItem.img&&listItem.img !==''" :src="listItem.img+'?x-oss-process=image/resize,w_600/format,webp/quality,Q_100'" mode="widthFix" class="item-img"></image>
			<!-- <u-lazy-load :image="listItem.img" class="item-img"></u-lazy-load> -->
		</view>
		<view class="item-list" v-for="(item,index) in listItem.list" :key="index">
			<text class="item-list-titel">{{item.list_name}}</text>
			<view class="item-list-list">
				<view class="item-list-item" v-for="(o,j) in item.dtail_list" :key="j" @click="goListgood(o)">
					<view class="item-list-item-img-laer">
						<easy-loadimage mode="widthFix"  v-if="o.img&&o.img !==''" :image-src="o.img+'?x-oss-process=image/resize,w_300/format,webp/quality,Q_100'"
						 class="item-list-item-img" loading-mode="looming-gray" :scroll-top="scrollTop"></easy-loadimage>
					</view>
					<text class="item-list-item-text">{{o.name}}</text>
				</view>
			</view>
		</view>

	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				timer: null
			}
		},
		props: {
			listItem: Object,
		},
		methods: {
			onScroll(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.scrollTop = e.detail.scrollTop
				}, 100)

			},
			goListgood(item) {
				uni.navigateTo({
					url: '/pages/listgood/index?val=' + item.search
				});
			},
		},
	}
</script>

<style lang="scss">
	.item-warp {
		width: 100%;
		height: 100%;
		/* #ifdef H5 */
		// padding-bottom: 220rpx;
		/* #endif */
		.item-list {
			width: 100%;
			margin-top: 30rpx;

			.item-list-list {
				display: flex;
				flex-wrap: wrap;
				margin-top: 20rpx;

				.item-list-item {
					width: 18%;
					display: flex;
					margin: 10rpx 40rpx;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					font-size: 28rpx;

					.item-list-item-text {
						width: 200rpx;
						text-align: center;
						line-height: 38rpx;
						margin-top: 10rpx;
					}

					.item-list-item-img-laer {
						width: 120rpx;
						height: 120rpx;
						/* #ifdef MP-WEIXIN ||MP-QQ*/
						box-shadow: 0px 0px 6px 1px rgba(18, 18, 3, 0.1);
						border-radius: 12rpx;
						overflow: hidden;
						/* #endif */
					}

					.item-list-item-img {
						width: 120rpx;
						height: 120rpx;
						box-shadow: 0px 0px 6px 1px rgba(18, 18, 3, 0.1);
						margin-bottom: 20rpx;
						border-radius: 12rpx;
						overflow: hidden;
					}
				}
			}

			.item-list-titel {
				font-size: 32rpx;
				font-weight: bold;
				padding-left: 20rpx;
			}
		}

		.item-img-warp {
			margin: 0 auto;
			width: 90%;
			height: 300rpx;
			position: relative;
			top: 30px;

			.item-img {
				width: 100%;
				height: 100%;
				border-radius: 4rpx;
				box-shadow: 0px 0px 6px 1px rgba(18, 18, 3, 0.1);
			}
		}
	}
</style>
