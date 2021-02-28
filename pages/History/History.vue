<template>
	<view>
		<uni-nav-bar background-color="#ff9344" shadow class="nav" fixed="true">
			<view slot="left" class="serch-warp">
				<view class="banck" @click="banck">
					<u-icon name="arrow-left" class="" color="#fff" size="40"></u-icon>
				</view>
			</view>
			<view slot="default" class="serch-warp">
				<view class="input-warp">
					浏览历史
				</view>
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<view slot="right" class="serch-text" @click="showcheckbox">
				操作
			</view>
			<!-- #endif -->
		</uni-nav-bar>

		<!-- #ifdef MP-WEIXIN -->
		<view class="operation" @click="showcheckbox">
			操作
		</view>
		<!-- #endif -->
		<view class="dellfal" v-if="datas.length ===0">
			<image src="https://www.dcmaomi.com:3000/serverImage/history_none.png" mode="widthFix" class="dellfal_img"></image>
			<view class="dellfal_text">
				浏览记录为空哦
			</view>
		</view>
		<view class="history-warp" v-if="datas.length !==0">
			<view class="history-item">
				<evan-checkbox-group v-model="list" class="cart-warp">
					<view class="cart-item" v-for="(item,index) in datas" :key="index">
						<view class="cart-checkbox" :class="{showcheckbox:isWidth}">
							<evan-checkbox :label="item.id" v-model="item.checkbox">
								<template>
									<view class="checkbox-warp" :class="{isActive:item.checkbox}" slot="icon">
										<u-icon v-if="item.checkbox" name="checkbox-mark" color="#fff" size="28"></u-icon>
									</view>
								</template>
							</evan-checkbox>
						</view>
						<view class="item-info">
							<!-- <u-lazy-load :image="item.list[0].img_url1" class="item-info-img"></u-lazy-load> -->
							<easy-loadimage mode="widthFix" :image-src="item.list[0].img_url1" class="item-info-img" loading-mode="looming-gray" :scroll-top="scrollTop"></easy-loadimage>
							<view class="item-info-desc">
								<view class="item-info-text titel">
									<text class="ellipsis desc">{{item.list[0].spu_title}}</text>
								</view>
								<view class="item-info-text titel">
									<text class=" ellipsis desc">{{item.spu_sub_title}}</text>
								</view>
								<view class="item-info-text price ">
									<text class="">￥{{item.price}}</text>
								</view>


							</view>
						</view>
					</view>
				</evan-checkbox-group>
			</view>
		</view>
		<view class="bouttom" v-if="isWidth == true && datas.length !==0">
			<view class="bouttom-left">
				<evan-checkbox style="margin-right: 10rpx;" @change="HandelAllGoods" v-model="allGoods">
					<template>
						<view class="checkbox-warp" :class="{isActive:allGoods}" slot="icon">
							<u-icon v-if="allGoods" name="checkbox-mark" color="#fff" size="28"></u-icon>
						</view>
					</template>
				</evan-checkbox>
				全选
			</view>
			<view class="bouttom-right" @click="rmoveHistory">
				删除
			</view>
		</view>
		<u-toast position="bottom" icon ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datas: [],
				list: [],
				isWidth: false,
				allGoods: false,
				scrollTop:0
			};
		},
		onPageScroll({
			scrollTop
		}) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			this.scrollTop = scrollTop;
		},
		created() {
			this.getHistory()
		},
		methods: {
			rmoveHistory() {
				let data = uni.getStorageSync('history')
				if (data === '' || data.length === 0) {
				} else {
					if (this.list.length === 0) {
						this.$refs.uToast.show({
							title: '未选择',
							type: 'error'
						})
						return
					}
					// console.log(this.list)
					this.list.forEach(o => {
						data.forEach((item, index) => {

							if (item === o) {
								data.splice(index, 1)
							}
						})
					})
					// console.log(data)
					uni.setStorage({
						key: 'history',
						data: data
					})
					this.getHistory()
					this.$refs.uToast.show({
						title: '删除成功',
						type: 'success'
					})
				}
			},
			HandelAllGoods(e) {
				if (this.datas === null) return
				if (e) {
					this.list = []
					this.datas.forEach(item => {
						item.checkbox = true
						this.list.push(item.id)
					})
				} else {
					this.datas.forEach(item => {
						item.checkbox = false
						this.list = []
					})
				}
			},
			showcheckbox() {
				this.isWidth = !this.isWidth
			},
			getHistory() {
				let data = uni.getStorageSync('history')
				if (data === '') {
				} else {
					this.getdata(data)
				}
			},
			banck() {
				let page = getCurrentPages()
				uni.navigateBack({
					delta: page.length - 1
				})
			},
			async getdata(data) {
				const res = await this.$http.post('/api/getHistory', {
					data
				})
				if (res.data.success === true) {
					res.data.data.forEach(item => {
						item.checkbox = false
					})
					this.datas = res.data.data
				}
			},
		}
	}
</script>

<style lang="scss">
	.dellfal {
		position: fixed;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.dellfal_img {
			width: 30%;
		}
		.dellfal_text{
			margin-top: 60rpx;
			color: $uni-text-color-grey;
		}
	}

	.bouttom {
		width: 100%;
		height: 120rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 2.5%;
		background-color: #fff;
		border-top: .5px solid $xt;

		.bouttom-right {
			border: .5px solid #ec4141;
			margin-right: 20rpx;
			padding: 10rpx 20rpx;
			border-radius: 50rpx;
			color: #ec4141;
		}

		.bouttom-left {
			display: flex;
			font-size: 32rpx;
			color: $uni-text-color-grey;
		}
	}

	.desc {
		display: inline-block;
		width: 350rpx;
	}

	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.history-warp {
		/* #ifndef H5 */
		margin-top: 90rpx;
		/* #endif */
		margin-bottom: 30rpx;
	}

	.showcheckbox {
		width: 80rpx !important;
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

	.isActive {
		background-color: $zhuse;
		border: none !important;
	}

	.cart-warp {
		width: 100%;

		.cart-item {
			width: 90%;
			margin: 0 auto;
			display: flex;
			margin-top: 40rpx;
			box-shadow: 0px 0px 6px 1px rgba(18, 18, 3, 0.1);
			border-radius: 16rpx;
			padding: 2.5%;

			.cart-checkbox {
				width: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				overflow: hidden;
				transition: all .3s ease-in-out;
			}

			.item-info {
				flex: 1;
				display: flex;
				align-items: center;
				margin-left: 10rpx;

				.item-info-img {
					width: 200rpx;
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

	.operation {
		position: fixed;
		width: 90rpx;
		height: 90rpx;
		// background-color: red;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		bottom: 10%;
		right: 10%;
		box-shadow: 0px 0px 6px 1px rgba(18, 18, 3, 0.1);
		color: #6d6d6d;
	}

	.serch-warp {
		width: 100%;
		/* #ifdef MP-WEIXIN */
		width: 85%;

		/* #endif */
	}

	.serch-text {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
	}

	.input-warp {
		width: 100%;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 5%;
		color: #fff;

		// border: 1px solid $xt;
		.placeholder {
			color: $uni-text-color-grey;
			font-size: 26rpx;
			letter-spacing: 2rpx;
		}

		.input {
			flex: 1;
			color: $uni-text-color;
			font-size: 28rpx;
			letter-spacing: 2rpx;
			margin-right: 2.5%;
		}

		.input-icon {
			margin-right: 20rpx;
			// position: relative;
			// top: 1rpx;
		}

		.close-icon {}
	}
</style>
