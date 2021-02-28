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
					<u-icon name="search" class="input-icon" color="#999" size="36"></u-icon>
					<input placeholder-class="placeholder" @confirm="listgoood()" class="input" type="text" v-model="value"
					 placeholder="请输入你想搜索的内容" />
					<u-icon name="close" class="close-icon" size="26" color="#999" v-if="isClose" @click="clerInput"></u-icon>
				</view>
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<view slot="right" class="serch-text" @click="listgoood()">
				搜索
			</view>
			<!-- #endif -->
		</uni-nav-bar>
		<view class="serch-item-warp" v-if="value !==''">
			<view class="serch-item" v-for="(item,index) in list" :key="index" v-if="list.length !==0" @click="goodList(item)">
				<text class="serch-item-text ellipsis">{{item.spu_title}}</text>
			</view>
			<view class="serch-item-none" v-if="list.length ===0">
				没有搜索到内容哦
			</view>
		</view>
		<view class="content">
			<view class="serch-lishi">
				<view class="serch-lishi-titel">
					<view class="serch-list-text desc">
						搜索历史
					</view>
					<view class="serch-list-text" @click="handeIsShow">
						{{lishi.name}}
						<u-icon :name="lishi.icon" size="32" color="#b4b4b4" class="icon"></u-icon>
					</view>

				</view>

				<view class="serch-list-content" :class="{serch_list_content:isLishiShow}">
					<view class="serch-list-item" v-for="(item,index) in serchList" :key="index" @click="goSerch(item)" v-if="serchList !== ''">
						{{item}}
					</view>
					<view class="serch-list-item" v-if="serchList === ''">
						没有搜索历史
					</view>
				</view>
				<view class="clear-serch-list" @click="removeSerch">
					清空历史
					<u-icon name="trash-fill" size="32" color="#b4b4b4" class="icon"></u-icon>
				</view>
			</view>
			<view class="serch-hot">
				<view class="serch-hot-titel">
					热门搜索
				</view>
				<view class="serch-hot-warp">
					<view class="serch-hot-item" v-for="(item,index) in serchListHot" :key="item.id">
						<view class="item-mum" :class="{one:index===0}" v-if="index===0">
							{{index+1}}
						</view>
						<view class="item-mum" :class="{tow:index===1}" v-if="index===1">
							{{index+1}}
						</view>
						<view class="item-mum" :class="{thr:index===2}" v-if="index===2">
							{{index+1}}
						</view>
						<view class="item-mum" :class="{default_hot:index>2}" v-if="index>2">
							{{index+1}}
						</view>
						<view class="item-text" @click="listgoood(item.search_name)">
							<text class="item-text-desc ellipsis">{{item.search_name}}</text>
							<u-icon  size="30" name="https://www.dcmaomi.com:3000/serverImage/fier.png" v-if="index<3" style="margin-left:20rpx ;"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-toast position="bottom" icon ref="uToast" />
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
				value: '',
				border: false,
				isClose: false,
				timer: null,
				list: [],
				isLishiShow: true,
				lishi: {
					name: '展开',
					icon: 'arrow-down'
				},
				serchList: [],
				serchListHot: [],
			};
		},
		onShow: function() {
		},
		created() {
			this.getSerch()
			this.getSerchHot()
		},
		computed: {

		},
		watch: {
			//检测val值获取数据
			value(x, y) {
				clearTimeout(this.timer)
				if (x === '') {
					this.isClose = false
				} else {
					this.isClose = true
					this.timer = setTimeout(() => {
						this.getData()
					}, 800)
				}
			},
		},
		methods: {
			...mapMutations(['setGoodList']),
			isbgCrlor(index) {
				switch (index) {
					case 0:
						return 'one'
						break;
					case 1:
						return 'tow'
						break;
					case 2:
						return 'thr'
						break;
					default:
						return 'default_hot'
				}
			},
			//点击历史项去详细列表
			goSerch(item) {
				uni.navigateTo({
					url: '/pages/listgood/index?val=' + item
				});
				this.setSerch(item)
				this.getSerch()
			},
			//删除历史记录
			removeSerch() {
				uni.setStorage({
						key: 'Serch',
						data: ''
					}),
					this.getSerch()
			},
			//获取历史记录
			getSerch() {
				let data = uni.getStorageSync('Serch')
				this.serchList = data
			},
			//设置历史记录
			setSerch(str) {
				let data = uni.getStorageSync('Serch')
				if (data === '') {
					let list = []
					list.unshift(str)
					uni.setStorage({
						key: 'Serch',
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
						key: 'Serch',
						data: data
					})
				}

			},
			//是否展开历史列表
			handeIsShow() {
				this.isLishiShow = !this.isLishiShow
				if (this.isLishiShow) {
					this.lishi = {
						name: '展开',
						icon: 'arrow-down'
					}
				} else {
					this.lishi = {
						name: '收起',
						icon: 'arrow-up'
					}
				}
			},
			//去搜索结果页面
			listgoood(name) {
				let val
				if (name === undefined) {
					val = this.value
					if (val === '' || this.list.length === 0) {
						this.$refs.uToast.show({
							title: '请输入关键字',
							type: 'error'
						})
						return
					}
				} else {
					val = name
				}
				uni.navigateTo({
					url: '/pages/listgood/index?val=' + val
				});
				this.setSerch(val)
				this.getSerch()
			},
			//去搜索商品页面
			goodList(item) {
				this.setSerch(item.spu_title)
				this.getSerch()
				this.setGoodList(item)
				uni.setStorage({
					key: 'goodlist',
					data: item
				})
				uni.navigateTo({
					url: '/pages/goodlist/index'
				})
			},
			//初始化input内容
			clerInput() {
				this.value = ''
			},
			//页面返回
			banck() {
				let page = getCurrentPages()
				uni.navigateBack({
					delta: page.length - 1
				})
			},
			//获取搜索结果
			async getData() {
				const res = await this.$http.get(`/api/search?val=${this.value}`)
				if (res.data.success === true) {
					this.list = res.data.data
				}

			},
			async getSerchHot() {
				const res = await this.$http.get('/api/getSerchHot')
				if (res.data.success = true) {
					this.serchListHot = res.data.data
					// this.serchListHot = res.data.data.slice(0, 9)
				}
			},
		}
	}
</script>

<style lang="scss">
	.content {
		margin-top: 20rpx;
		/* #ifndef H5 */
		padding-top: 80rpx;

		/* #endif */
		.serch-hot {
			width: 100%;
			padding: 0 2.5%;
			margin-top: 30rpx;

			.serch-hot-warp {
				margin-top: 30rpx;

				.serch-hot-item {
					display: flex;
					align-items: center;
					height: 60rpx;
					margin: 20rpx 0;

					.item-text-desc {
						font-size: 32rpx;
					}

					.item-mum {
						width: 50rpx;
						height: 50rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 8rpx;
						margin-right: 20rpx;
						font-size: 32rpx;
					}

					.one {
						// background-color: #ec4141;
						font-weight: bold;
						color: #ec4141;
					}

					.tow {
						// background-color: #FA8072;
						font-weight: bold;
						color: #FA8072;
					}

					.thr {
						// background-color: yellow;
						font-weight: bold;
						color: #f8ba02;
					}

					.default_hot {
						// background-color: #eee;
						font-weight: bold;
						color: #999;
					}
				}
			}

			.serch-hot-titel {
				font-size: 32rpx;
				color: $uni-text-color !important;
				font-weight: bold;
			}
		}

		.serch-lishi {
			width: 100%;
			padding: 0 2.5%;

			.clear-serch-list {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				color: $uni-text-color-grey;

				.icon {
					margin-left: 20rpx;
				}
			}

			.serch_list_content {
				max-height: 160rpx !important;
				overflow: hidden !important;
			}

			.serch-list-content {
				width: 100%;
				max-height: 310rpx;
				overflow: auto;

				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				margin-top: 30rpx;

				.serch-list-item {
					height: 60rpx;
					background-color: #f8f8f8;
					padding: 10rpx 20rpx;
					border-radius: 50rpx;
					margin: 10rpx 10rpx;
					color: $uni-text-color;
				}
			}

			.serch-lishi-titel {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.desc {
					font-size: 32rpx;
					color: $uni-text-color !important;
					font-weight: bold;
				}

				.serch-list-text {
					color: $uni-text-color-grey;

					.icon {
						margin-left: 20rpx;
					}
				}
			}
		}
	}

	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.serch-item-warp {
		width: 100%;
		height: 100%;
		position: fixed;
		overflow: auto;
		/* #ifndef H5 */
		padding-top: 60rpx;
		/* #endif */
		padding-bottom: 120rpx;
		z-index: 99;
		background-color: #fff;

		.serch-item {
			width: 90%;
			margin: 0 auto;
			display: flex;
			align-items: center;
			padding: 0 2.5%;
			height: 90rpx;
			border-bottom: .5px solid $xt;

			.serch-item-text {
				width: 100%;
				display: inline-block;
			}
		}

		.serch-item-none {
			width: 90%;
			margin: 0 auto;
			display: flex;
			align-items: center;
			padding: 0 2.5%;
			height: 90rpx;
			border-bottom: 1px solid $xt;
		}
	}

	.banck {
		display: flex;
		align-items: center;
	}

	.search-text {
		color: #fff;
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
		background-color: #fff;
		border-radius: 50rpx;

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
