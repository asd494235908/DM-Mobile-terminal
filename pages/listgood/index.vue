<template>
	<view class="">
		<u-toast ref="uToast" />
		<u-dropdown ref="uDropdown" @open="open" @close="close" style="margin-bottom: 20rpx;">
			<u-dropdown-item v-model="value1" title="排序" :options="options1" @change="change" style="z-index: 1;"></u-dropdown-item>
		</u-dropdown>
		<view class="listGood">
			<my-detail v-for="(o,j) in list" :key="j" :datas="o" class="contenner-item" :scrollTop="scrollTop"></my-detail>
		</view>
	</view>
</template>

<script>
	import MyDetail from "@/components/mydetail/index.vue"
	export default {
		data() {
			return {
				scrollTop:0,
				list: [],
				val: '',
				sort: 0,
				page: 1,
				name: '',
				value1: 1,
				options1: [{
						label: '默认排序',
						value: 0,
					},
					{
						label: '价格从高到低',
						value: -1,
					},
					{
						label: '价格从低到高',
						value: 1,
					}
				],
			}
		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: option.val
			})
			this.name = option.val
			this.getdata()
		},
		onPageScroll({
			scrollTop
		}) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			this.scrollTop = scrollTop;
		},
		onPullDownRefresh: function() {
			uni.startPullDownRefresh({
				success: () => {
					this.page = this.page + 1
					this.list = []
					this.getdata()
				}
			})
		},
		onReachBottom: function() {
			// console.log('触底了')
			this.page = this.page + 1
			this.getdata()
		},
		components: {
			MyDetail
		},
		methods: {
			open(index) {
				// 展开某个下来菜单时，先关闭原来的其他菜单的高亮
				// 同时内部会自动给当前展开项进行高亮
				this.$refs.uDropdown.highlight();
			},
			close(index) {
				// 关闭的时候，给当前项加上高亮
				// 当然，您也可以通过监听dropdown-item的@change事件进行处理
				this.$refs.uDropdown.highlight(index);
			},
			change(e) {
				// 更多的细节，如有需要请自行根据业务逻辑进行处理
				// this.$refs.uDropdown.highlight(xxx);
				// console.log(e)
				this.sort = e
				this.getdata()
			},
			async getdata() {
				const res = await this.$http.get(`/api/listgood?val=${this.name}&srot=${this.sort}&page=${this.page}`)
				if (res.data.success === true) {
					uni.stopPullDownRefresh()
					if (res.data.allData === this.list.length) {
						this.list = []
						this.list = res.data.data
						this.$refs.uToast.show({
							title: '已经加载全部了',
							type: 'success',
							position: 'top'
						})
						return
					}
					this.list = []
					this.list = res.data.data
				}
			}
		}
	}
</script>

<style lang="scss">
	.listGood {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding: 0 5%;

		.contenner-item {
			width: 45%;
			/* #ifdef MP-WEIXIN */
			margin: 0 2.5%;
			/* #endif */
		}
	}
</style>
