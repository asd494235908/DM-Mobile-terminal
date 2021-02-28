<template>
	<view class="w-picker-demo">
		<view class="item" @tap="navLink('date')">日期</view>
		<view class="item" @tap="navLink('time')">时间</view>
		<view class="item" @tap="navLink('selector')">单列选择</view>
		<view class="item" @tap="navLink('half')">上下午</view>
		<view class="item" @tap="navLink('shortTerm')">短期日期时间</view>
		<view class="item" @tap="navLink('range')">日期区间</view>
		<view class="item" @tap="navLink('region')">省市区三级联动</view>
		<view class="item" @tap="navLink('linkage')">自定义多级联动</view>
	</view>
</template>


<script>
	import wPicker from "@/components/w-picker/w-picker.vue"
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				selectorList1:[],
				rangeVal:['2018-12-12','2020-04-02']
			}
		},
		onLoad() {

		},
		methods: {
			navLink(page){
				uni.navigateTo({
					url:`/pages/w-picker-demo/${page}`
				})
			}
		}
	}
</script>

<style>
	.w-picker-demo{
		padding:30rpx 0;
		text-align: center;
	}
</style>
