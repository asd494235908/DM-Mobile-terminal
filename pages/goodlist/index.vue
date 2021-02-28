<template>
	<view class="goodList-content">
		<u-toast position="top" ref="uToast" />
		<uni-nav-bar background-color="#ff9344" shadow class="nav" :fixed="true">
			<view slot="left" @click="banck">
				<uni-icons type="arrowleft" size="30" color="#fff"></uni-icons>
			</view>
			<view slot="default" class="text-center ellipsis">
				{{list.spu_title}}
			</view>
		</uni-nav-bar>
		<view class="contenner">
			<view class="swiper">
				<swiper :circular="true" :autoplay="false" :interval="5000" :duration="1000" class="swiper-contener" :current="imgIndex"
				 @change="changeIndex">
					<swiper-item @click="swiperImg" v-for="(item,index) in imgs" :key="index" class="swiper-item">
						<easy-loadimage mode="widthFix" :image-src="item" class="swiper-img" :scroll-top="scrollTop"></easy-loadimage>
					</swiper-item>
				</swiper>
			</view>
			<view class="imgs">
				<view class="listimg" @click="handelIndex(index)" :class="{listimg_active:index === imgIndex}" v-for="(item,index) in imgs"
				 :key="index">
					<easy-loadimage mode="widthFix" :image-src="item" :scroll-top="scrollTop"></easy-loadimage>
				</view>

			</view>

			<view class="classList">
				<view class="classInfo">
					<view class="classInfo-titel">
						<text class="titel-info">商品信息</text>
						<text class="titel-info-desc">{{list.spu_title}}</text>
					</view>
					<view class="classInfo-desc">
						<text class="text-laer">简介</text>
						<text class="titel-text">{{list.spu_sub_title}}</text>
					</view>
					<view class="classInfo-price">
						<text class="text-laer">价格</text>
						<view class="price-warp">
							<text class="price" v-show="listImg.price !==null">￥{{towNum(listImg.price)}}</text>
							<text class="oldprice" :class="{oldprice_active:listImg.price ===null}">￥{{towNum(newprise===0?listImg.oldprice: newprise)}}</text>
						</view>
					</view>
					<view class="classInfo-price">
						<text class="text-laer">分类</text>
						<view class="classList-right">
							<text class="classList-item" v-for="(item,index) in list.list" :key="index" @click="handelListItem(item,index)"
							 :class="{classList_item_active:index === itemIndex}">
								{{item.show_name}}</text>
						</view>
					</view>
					<view class="classInfo-price" v-if="descShow">
						<text class="text-laer">大小</text>
						<view class="classList-right">
							<text class="classList-item" v-for="(item,index) in listImg.size" :key="index" :class="{classList_item_active:index === sizeindex}"
							 @click="handelSize(item,index)">{{item.size}}</text>
						</view>
					</view>
					<view class="classInfo-price">
						<text class="text-laer">数量</text>
						<lxc-count :min="1" @handleCount="handleCountClick" :index="perDuckNum" :value="perDuckNum" :delayed="200">
						</lxc-count>
					</view>
				</view>
			</view>
		</view>
		<view class="goodInfo">
			<view class="titel">服务说明</view>
			<view class="info">
				<view class="text">7天无理由退款</view>
				<view class="text">15天包换</view>
			</view>
		</view>
		<view class="goodInfo last" v-show="listImglaer !=='' ">
			<view class="titel">商品详情</view>
			<image :src="listImglaer+'?x-oss-process=image/resize,w_600/format,webp/quality,Q_100'" mode="widthFix" style="width: 100%;"
			 @click="handleImg"></image>
		</view>
		<view class="addgood">

			<view class="btn">
				<view class="addgood-list" :class="{goodShow:cartInfo}" :style="{height:cartInfo?hightgood:0}">
					<view class="name-text"><text class="ellipsis" style="text-align: center;font-size: 30rpx;">已选择</text></view>
					<view class="name-text"><text class="laer-text">名称</text><text class="ellipsis">{{goodlistInfo.name}}</text></view>
					<view class="name-text"><text class="laer-text">款式</text><text class="ellipsis">{{goodlistInfo.list}}</text></view>
					<view class="name-text"><text class="laer-text">数量</text><text class="ellipsis">{{goodlistInfo.num}}</text></view>
					<view class="name-text" v-if="descShow"><text class="laer-text">大小</text><text class="ellipsis">{{goodlistInfo.size}}</text></view>
					<view class="name-text"><text class="laer-text">价格</text><text class="ellipsis isprice">￥{{towNum(goodlistInfo.price)}}</text></view>
					<view class="icon" @click="cartInfoHide">
						<uni-icons type="closeempty" size="32" style="color: #545454;" class="icon-list"></uni-icons>
					</view>
				</view>
				<view class="name-good" v-if="isValidate">
					<view class="name-good-left" @click="cartInfoShow">
						<uni-icons :type="cartInfo?'arrowdown':'arrowup'" size="22" color="#fff" class="icon-list"></uni-icons>
						查看已选择
					</view>
					<view class="name-good-right" @click="addCart" >
						加入购物车
					</view>
				</view>
			</view>
		</view>
	</view>

	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import lxcCount from '@/components/lxc-count/lxc-count.vue'
	import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				list: {},
				//listImg 是当前显示的商品
				listImg: {},
				imgIndex: 0,
				itemIndex: 0,
				sizeindex: -1,
				newprise: 0,
				descShow: false,
				perDuckNum: 1,
				show: false,
				scrollTop: 0,
				cartInfo: false,
				goodlistInfo: {
					id: 0,
					name: '',
					list: '',
					num: 1,
					size: '',
					price: 0,
					sup_id: 0
				}
			}
		},
		onPageScroll({
			scrollTop
		}) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			this.scrollTop = scrollTop;
		},
		components: {
			uniIcons,
			lxcCount,
			easyLoadimage,
			uniNavBar
		},
		computed: {
			...mapState(['goodList', 'login', 'userInfo','isValidate']),
			imgs() {
				let img = []
				for (let i in this.listImg) {
					if (i.indexOf('img') !== -1) {
						if (i.indexOf('show_img') !== -1) continue;
						if (this.listImg[i] !== null) {
							img.push(this.listImg[i])
						}
					}
				}
				return img
			},
			listImglaer() {
				if (this.list.listImg === undefined) {
					return ''
				} else {
					return this.list.listImg.list_url
				}
			},
			allprice() {
				let num = 0
				if (this.listImg.price === null) {
					num = this.listImg.oldprice
					num = this.newprise === 0 ? this.listImg.oldprice : this.newprise
					num = this.perDuckNum * num
					return num
				} else {
					num = this.listImg.price
					num = this.newprise === 0 ? this.listImg.price : this.newprise
					num = this.perDuckNum * num
					return num
				}
			},
			hightgood() {
				return this.descShow ? 420 + 'rpx' : +380 + 'rpx'
			}
		},

		onShow() {
			this.list = this.goodList
			const res = uni.getStorageSync('goodlist')
			this.list = res
			// console.log(res)
			this.listImg = this.list.list[0] //默认显示地第一款
			this.goodlistInfo.id = this.list.id
			this.goodlistInfo.name = this.list.spu_title
			this.goodlistInfo.list = this.listImg.show_name
			this.goodlistInfo.sup_id = this.listImg.spec_id

			this.descShow = this.listImg.size === undefined ? false : true
			if (this.descShow) {
				this.goodlistInfo.size = this.listImg.size[0].size
			}
			this.goodlistInfo.price = this.allprice
		},

		methods: {
			//加入购物车
			async addCart() {
				if (this.login) {
					if (this.descShow) {
						if (this.sizeindex === -1) {
							this.$refs.uToast.show({
								title: '请选择尺寸',
								type: 'warning'
							})
							return
						}
					}
					this.cartInfo = false
					this.goodlistInfo.price = this.goodlistInfo.price / this.goodlistInfo.num
					// console.log(this.listImg.id, this.userInfo.uid, this.goodlistInfo)
					// return
					const res = await this.$http.post('/api/GoodItem', {
						isAdd: true,
						isWeb:false,
						id: this.listImg.id,
						uid: this.userInfo.uid,
						data: this.goodlistInfo
					})
					if (res.data.success === true) {
						this.$refs.uToast.show({
							title: '加入成功',
							type: 'success'
						})
						uni.$emit('updataGood')
					}
				} else {
					uni.navigateTo({
						url: '/pages/login/index'
					})
				}
			},
			//预览图片 
			swiperImg() {
				uni.previewImage({
					urls: this.imgs
				})
			},
			//预览图片
			handleImg() {
				// +'?x-oss-process=image/resize,w_900/format,webp/quality,Q_100'
				if (this.listImglaer !== '') {
					uni.previewImage({
						urls: [this.list.listImg.list_url]
					})
				}
			}, //计数器
			handleCountClick(index) {
				this.perDuckNum = index
				this.goodlistInfo.num = index
				this.goodlistInfo.price = this.allprice
			},
			handelSize(item, index) {
				this.sizeindex = index
				this.newprise = item.price === 0 || item.price === null ? 0 : item.price
				this.goodlistInfo.size = item.size
				this.goodlistInfo.price = this.allprice
			},
			changeIndex(e) {
				this.imgIndex = e.detail.current
			},
			banck() {
				uni.navigateBack({
					delta: 1
				})

			},
			handelIndex(index) {
				this.imgIndex = index
			},
			handelListItem(item, index) {
				this.listImg = item
				this.itemIndex = index
				this.sizeindex = -1
				this.goodlistInfo.list = item.show_name
			},
			cartInfoShow() {
				this.cartInfo = !this.cartInfo
			},
			cartInfoHide() {
				this.cartInfo = false
			},
			towNum(num) {
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goodShow {
		padding: 10rpx 0 !important;
		opacity: 1 !important;
	}

	.icon {
		position: absolute;
		right: 0;
		top: 20rpx;
		width: 40rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.addgood-list {
		width: 90%;
		height: 0;
		margin: 0 auto;
		background-color: $uni-text-color-inverse;
		position: relative;
		overflow: hidden;
		opacity: 0;
		transition: all .6s ease-in-out;
	}

	.isprice {
		color: red;
	}

	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 450rpx;
		padding-left: 30rpx;
	}

	.goodList-content {
		padding-bottom: 140rpx;
	}

	.addgood {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 999;

		.btn {
			width: 100%;
			margin: 0 auto;
			background-color: $uni-text-color-inverse;
			box-shadow: 0px 4px 8px 2px rgba(18, 18, 3, 0.1);
			// border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			font-size: 28rpx;
			overflow: hidden;

			.name-text {
				display: flex;
				align-items: center;
				margin: 0 6rpx 20rpx;

				.laer-text {
					color: $uni-text-color-grey;
					margin: 0 0 10rpx;
					width: 70rpx;
				}
			}

			.name-good {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.name-good-left {
					width: 260rpx;
					text-align: center;
					height: 90rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #808080;
					color: $uni-text-color-inverse;
				}

				.name-good-right {
					flex: 1;
					text-align: center;
					height: 90rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: $zhuse;
					color: $uni-text-color-inverse;
				}
			}
		}
	}

	.last {
		padding-bottom: 40rpx;
	}

	.goodInfo {
		width: 80%;
		margin: 30rpx auto 0;
		padding: 20rpx 32rpx;
		box-shadow: 0px 4px 8px 2px rgba(18, 18, 3, 0.1);
		border-radius: 12rpx;
		font-size: 30rpx;
		color: $uni-text-color;

		.titel {
			text-align: center;
			font-weight: bold;
			margin-bottom: 30rpx;
		}

		.info {
			display: flex;

			.text {
				margin: 20rpx 20rpx 0;
			}
		}
	}

	.classInfo {
		font-size: 32rpx;
		color: $uni-text-color;

		.price {
			color: red;
			font-size: 36rpx;
			padding-right: 30rpx;
		}

		.oldprice {
			font-size: 28rpx;
			text-decoration: line-through;
			// padding-left: 30rpx;
		}

		.oldprice_active {
			text-decoration: none;
			color: red;
			font-size: 36rpx;
		}

		.text-laer {
			display: block;
			width: 160rpx;
			// text-align: justify;
			text-align: center;
			font-size: 28rpx;
			margin-bottom: 20rpx;
		}

		.titel-text {
			flex: 1;
			color: $uni-text-color;
			line-height: 50rpx;
			text-align: center;
			padding: 0 40rpx;

		}


		.classInfo-titel {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.titel-info {
				margin-bottom: 20rpx;
				font-size: 36rpx;
				font-weight: bold;
			}

			.titel-info-desc {
				margin-bottom: 20rpx;
			}
		}

		.class-size,
		.classInfo-desc,
		.classInfo-price {
			color: $uni-text-color-grey;
			padding-bottom: 10rpx;
			margin-bottom: 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			// border-bottom: 1px solid $xt;
		}

		.price-warp {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.imgs {
		width: 100%;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.listimg {
		width: 120rpx;
		height: 120rpx;
		margin: 0 10rpx;
		border-radius: 8rpx;
		box-shadow: 0px 4px 8px 2px rgba(18, 18, 3, 0.1);
		box-sizing: border-box;
		border: solid 1rpx #fff;
		overflow: hidden;
	}

	.listimg_active {
		border: solid 1rpx $zhuse;
	}

	.classList {
		width: 80%;
		margin: 0 auto;
		padding: 20rpx 32rpx;
		margin-top: 32rpx;
		display: flex;
		flex-direction: column;
		box-shadow: 0px 4px 8px 2px rgba(18, 18, 3, 0.1);
		border-radius: 12rpx;

		.classList-warp {
			display: flex;
		}

		.classList-left {
			display: inline-block;
			width: 160rpx;
			font-size: 32rpx;
			color: $uni-text-color-grey;
			text-align-last: justify;
			padding-right: 30rpx;
		}

		.classList-right {
			flex: 1;
			display: flex;
			flex-wrap: wrap;

			.classList-item {
				border: 1px solid $xt;
				padding: 10rpx 10rpx;
				margin: 10rpx 20rpx 20rpx;
				border-radius: 10rpx;
				font-size: 26rpx;
				color: $uni-text-color;
			}

			.classList_item_active {
				border: solid 1rpx $zhuse;
			}
		}

	}

	.swiper {
		width: 100%;
		overflow: hidden;
		box-shadow: 0px 4px 8px 2px rgba(18, 18, 3, 0.1);
		margin-top: 30rpx;
		/* #ifdef H5*/
		margin-top: 5rpx;
		/* #endif*/

		/*#ifndef H5*/
		/*为了兼容小程序及app端必须这样写才有效果*/
		margin-top: 54rpx;

		/*#endif*/
		.swiper-contener {
			height: 750rpx;
			overflow: hidden;

			.swiper-item {
				.swiper-img {
					width: 100%;
					height: auto;
				}
			}
		}
	}

	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.text-center {
		width: 100%;
		margin-bottom: 10rpx;
		text-align: center;
		color: $uni-bg-color;
	}
</style>
