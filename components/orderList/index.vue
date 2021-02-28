<template>
	<view class="order-warp">
		<view class="order-titel">
			<view class="order-titel-left">
				订单编号：{{item.oder_id}}
			</view>
			<view class="order-titel-right">
				<view class="order-color" v-if="item.type === 0">
					<u-count-down class="jusuqi" ref="uCountDown" @end="getdata" color="red" separator-color="red" :timestamp="timeNum(item.time)"
					 :autoplay="true"></u-count-down>
					后关闭交易
				</view>
				<view class="order-color" v-if="item.type === 3"> 交易已关闭
				</view>
				<view class="order-color" v-if="item.type === 1"> 待收货
				</view>
				<view class="order-color" v-if="item.type === 2"> 已完成
				</view>
			</view>
		</view>
		<view class="order-item-warp">
			<view class="order-item" v-for="(o,j) in item.data_list" :key="j">
				<view class="item-left" style="width: 160rpx;height: 160rpx;">
					<!-- <u-lazy-load :image="o.img" class="item-list-item-img"
					 border-radius="8"></u-lazy-load> -->

					<view @click="goList(o)">
						<u-lazy-load :image="o.img+'?x-oss-process=image/resize,w_300/format,webp/quality,Q_100'" class="item-list-item-img"
						 border-radius="8"></u-lazy-load>
					</view>
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
		<view class="item-buttom">
			<view class="item-allNum">
				共计{{allNum}}件商品
			</view>
			<view class="item-allprice">
				合计 <text style="color: red;">￥{{allPrice}}</text>
			</view>
		</view>
		<view class="btn-warp">
			<view class="btn-left">
				<view class="btn desc" @click="handeItem">查看详情</view>
			</view>
			<view class="btn-right">
				<view class="btn submit" v-if="item.type === 0" @click="gosettlement(item)">去付款</view>
				<view class="btn dell" v-if="item.type === 3" @click="dellList(item)">删除订单</view>
				<view class="btn confirm " v-if="item.type === 1">确认收货</view>
				<view class="btn handle" v-if="item.type === 2">已完成</view>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {}
		},
		props: {
			item: Object,
			scrollTop: Number
		},
		created: function() {},
		computed: {
			allNum() {
				let num = 0
				this.item.data_list.forEach(o => {
					num += o.suplist_num
				})
				return num
			},
			allPrice() {
				let num = 0
				this.item.data_list.forEach(o => {
					num += o.suplist_num * o.price
				})
				return num.toFixed(2)
			},
		},
		methods: {
			...mapMutations(['setUserInfo', 'setGoodList']),
			async goList(o) {
				const res = await this.$http.post('/api/getItem', {
					id:o.sup_id
				})
			},
			gosettlement(item) {
				uni.navigateTo({
					url: '/pages/settlement/settlement?orid=' + item.oder_id
				})
			},
			//删除订单
			dellList(item) {
				this.$emit('handelItem', item)
			},
			handeItem() {
				this.$emit('handelShowMask', this.item)
			},
			timeNum(time) {
				let times = time
				const arr = this.arrnNuber(time.match(/\d+/g)) // 数组字符串返回数组 数字类型
				const nowTime = this.arrnNuber(this.getTime().match(/\d+/g)) // 数组字符串返回数组 数字类型
				const arrs = this.alls(arr)
				const nowTimes = this.alls(nowTime)
				const nowLaer = nowTimes - arrs
				//判断订单是否大于1天
				if (nowLaer >= 86400000) {
					// console.log('订单大于1天')
				} else {

					const num = 86400000 - nowLaer
					if (num === 0) {
						// console.log('订单大于1天')
						return 0
					} else {
						// console.log('订单不大于1天')
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
			getdata(){
				this.$emit('getData')
			}
		}
	}
</script>

<style lang="scss">
	.btn-warp {
		width: 100%;
		display: flex;
		justify-content: space-between;

		.btn {
			width: 200rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			border-radius: 30rpx;
			margin-top: 20rpx;
			box-sizing: border-box;
		}

		.desc {
			color: $uni-text-color-grey;
		}

		.submit,
		.confirm {
			background-image: linear-gradient(62deg, rgb(247, 206, 104) 0%, rgb(251, 171, 126) 100%);
			color: $uni-text-color-inverse;
		}

		.dell {
			border: 1px solid $uni-text-color-grey;
			color: $uni-text-color-grey;
		}
	}

	.item-buttom {
		display: flex;
		justify-content: space-between;
		margin-top: 10rpx;
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

	.order-warp {
		width: 90%;
		margin: 40rpx auto 40rpx;
		padding: 2.5% 2.5%;
		box-shadow: 0px 0px 6px 1px rgba(18, 18, 3, 0.1);
		border-radius: 8rpx;

		.order-titel {
			font-size: 30rpx;

			.order-titel-left {
				height: 60rpx;
				display: flex;
				align-items: center;
			}

			.order-titel-right {
				display: flex;
				align-items: center;
				height: 60rpx;
			}

			.order-color {
				color: $zhuse;

				.jusuqi {
					margin-right: 16rpx;
				}
			}
		}
	}
</style>
