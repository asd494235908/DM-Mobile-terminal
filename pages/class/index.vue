<template>
	<view class="class-warp">
		<view class="class-left">
			<text class="class-left-item" v-for="(item,index) in list" :key="item.name" @click="itemShow(item,index)" :class="{item_active:index === Isindex }">{{item.name}}</text>
		</view>
		<view class="class-right" :style="{paddingBottom: ispadding}">
			<Detail  :listItem="itemdata" :scrollTop="scrollTop"></Detail>
		</view>
	</view>
</template>

<script>
	import Detail from "@/pages/class/classdetail/index.vue"
	export default {
		data() {
			return {
				list: [],
				Isindex: 0,
				itemdata: {},
				scrollTop:0,
				windowHeight:0,
			}
		},
		// onPageScroll({
		// 	scrollTop
		// }) {
		// 	// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
		// 	console.log(scrollTop)
		// 	this.scrollTop = scrollTop;
		// },
		components: {
			Detail
		},
		onLoad:function(){
			this.getClassData()
			const self = this
			// uni.getSystemInfo({
			// 	success(e) {
			// 		self.windowHeight = e.safeArea.height
			// 	}
			// })
		},
		computed:{
			ispadding(){
				// #ifdef H5
				return this.windowHeight*0.30+'rpx'
				// #endif
			},
		},
		methods: {
			itemShow(item, index) {
				this.Isindex = index
				this.itemdata = item
			},
			async getClassData() {
				const res = await this.$http.get('/api/navData')
				if (res.data.success === true) {
					this.list = res.data.data
					this.itemdata = this.list[0]
				}
			},
		}
	}
</script>

<style lang="scss">
	.class-warp {
		width: 100%;
		height: 100%;
		position: fixed;
		display: flex;

		.class-left {
			width: 180rpx;
			height: 100%;
			display: flex;
			flex-direction: column;
			overflow: auto;
			background-color: #f8f8f8;
			padding-bottom: 220rpx;

			.class-left-item {
				display: inline-block;
				padding: 30rpx 20rpx;
				color: $uni-text-color;
				font-size: 24rpx;
				text-align: center;
				font-weight: 601;
			}

			.item_active {
				background-color: #fff;
				position: relative;
				color: $uni-text-color;
			}

			.item_active::after {
				content: '';
				position: absolute;
				width: 10rpx;
				height: 50rpx;
				left: 5rpx;
				top: 0;
				transform: translateY(50%);
				background-color: $zhuse;
			}

		}

		.class-right {
			flex: 1;
			height: 100%;
			/* #ifdef H5 */
			overflow: auto;
			/* #endif */
			
		}
	}
</style>
