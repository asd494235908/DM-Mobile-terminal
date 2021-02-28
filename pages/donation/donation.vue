<template>
	<view>
		<text class="laer"> 祝捐赠者：一帆风顺，两全其美，三山五岳，四平八稳，五谷丰登，六六大顺，七窍玲珑，八面驶风，九九归原，十全十美。<br />天天做新郎，天天换新娘，夜夜入洞房。走遍天下都有丈母娘</text>
		<view class="donation_warp">

			<view class="donation_top">
				<view class="top">
					昵称
				</view>
				<view class="top">
					捐赠方式
				</view>
				<view class="top">
					金额
				</view>
				<view class="top top_more">
					留言
				</view>
				<view class="top top_more">
					<text class="top_text">捐赠时间</text>
					<view class="icons">
						<u-icon name="arrow-up" @click="chanheIndex(7)"></u-icon>
						<u-icon name="arrow-down" @click="chanheIndex(8)"></u-icon>
					</view>
				</view>
			</view>
			<view class="donation_item_warp">
				<view class="donation_item" v-for="(item,index) in order_Data" :key="item.id">
					<view class="name">
						{{item.name}}
					</view>
					<view class="payType">
						{{item.payType}}
					</view>
					<view class="pirce">
						{{Number(item.pirce).toFixed(2)}}
					</view>
					<view class="mesg">
						{{item.mesg}}
					</view>
					<view class="play_time">
						{{item.play_time}}
					</view>
				</view>
			</view>
		</view>
		<view class="pagination_warp">
			<onion-pagination :page.sync="page" :pageSize="size" :total="total" @update:page="handelpage"></onion-pagination>
		</view>
	</view>
</template>

<script>
	import onionPagination from '@/components/onion-pagination/onion-pagination.vue'
	export default {
		data() {
			return {
				order_Data: [],
				page: 1,
				size: 10,
				index: 7,
				total: 0,
			};
		},
		onLoad: function() {
			this.getDonationData()
		},
		components: {
			onionPagination
		},
		watch: {
			page(x, y) {
				
				this.page = x
				// console.log(this.page)
				this.getDonationData()
			},
		},
		methods: {
			chanheIndex(idx) {

				if (this.index === idx) return;
				this.index = idx;
				this.getDonationData();

			},
			handelpage(page) {
				let oldpage = page
				let maxpage = Math.ceil(this.total / this.size)
				let newpage = page
				newpage = newpage <= 0 ? 1 : newpage
				newpage = newpage > maxpage ? maxpage : newpage
				this.page = newpage
				
				
			},
			async getDonationData() {
				const res = await this.$http.post('/api/Donation', {
					page: this.page,
					size: this.size,
					index: this.index,
				})
				if (res.data.success === true) {
					this.order_Data = res.data.data
					// console.log(this.order_Data)
					this.total = res.data.total
				}
			}
		}
	}
</script>

<style lang="scss">
	.pagination_warp {
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.laer {
		padding: 20rpx;
		display: inline-block;
		width: 100%;
		text-align: center;
		color: $uni-text-color-grey;
		// box-shadow: 0px 0px 6px 1px rgba(18, 18, 3, 0.1);
		border-radius: 4rpx;
		margin-bottom: 30rpx;
		font-size: 16px;
	}

	.donation_item_warp {
		width: 100%;

		.donation_item+.donation_item {
			border-top: 1rpx solid $xt;
		}

		.donation_item {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 120rpx;


			.payType,
			.pirce,
			.name {
				flex: 1;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.payType {}

			.play_time,
			.mesg {
				flex: 1.5;
				height: 100%;
				text-align: center;
			}

			.play_time {}
		}
	}

	.donation_warp {
		width: 95%;
		margin: 0 auto;
		box-shadow: 0px 0px 6px 1px rgba(18, 18, 3, 0.1);
		border-radius: 4rpx;
		padding: 10rpx 2%;

		.donation_top {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.top {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 90rpx;

			.icons {
				margin: 0 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
			}
		}

		.top_more {
			flex: 1.5;
		}
	}
</style>
