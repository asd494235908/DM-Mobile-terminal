<template>
	<view class="icons-warp">
		<swiper :autoplay="false" :interval="3000" :duration="1000" class="icons-contener">
			<swiper-item v-for="(item,index) in pages" :key="index" class="icons-item">
				<view class="icons-list" v-for="(o,j) in item" :key="j" @click="listgoood(o.hot_name)">
					<!-- <easy-loadimage mode="widthFix" :image-src="o.icon" class="icons-img"></easy-loadimage> -->
					<easy-loadimage mode="widthFix" :image-src="o.icon" class="icons-img" loading-mode="looming-gray" :scroll-top="scrollTop"></easy-loadimage>
					<text class="icons-text">{{o.hot_name}}</text>
				</view>
			</swiper-item>
		</swiper>
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
			}
		},
		props: {
			icons: Array,
			scrollTop:Number
		},
		computed: {
			//对数据进行分组
			pages() {
				const pages = []
				this.icons.forEach((item, index) => {
					const page = Math.floor(index / 8)
					if (!pages[page]) {
						pages[page] = []
					}
					pages[page].push(item)
				})
				return pages
			}
		},
		methods:{
			...mapMutations(['setLIstGoodName']),
			listgoood(name){
				uni.navigateTo({
				    url: '/pages/listgood/index?val='+name
				});
			},
		}
	}
</script>

<style lang="scss">
	.icons-warp {
		background-color: #fff;
		width: 90%;
		box-sizing: border-box;
		padding: 10rpx 0;

		border-radius: 12px;
		margin: 30rpx auto 0;
		box-shadow: 0px 0px 6px 1px rgba(18, 18, 3, 0.1);
		overflow: hidden;

		.icons-contener {
			width: 100%;
			height: 360rpx;

			.icons-item {
				display: flex;
				flex-wrap: wrap;

				// @for $i from 1 through 4 {
				// 	.icons-list:nth-child(#{$i}) {
				// 		margin-bottom: 0rpx;
				// 	}
				// }

				.icons-list {
					width: 25%;
					height: 50%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.icons-img {
						width: 100rpx;
						height: 100rpx;
					}

					.icons-text {
						font-size: 24rpx;
						margin-top: 5rpx;
						font-weight: bold;
						color: $uni-text-color;
					}
				}
			}
		}
	}
</style>
