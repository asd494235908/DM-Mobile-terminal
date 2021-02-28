<template>
	<view>
		<view class="item" @tap="dateVisible1=true">日期1</view>
		<view class="item" @tap="dateVisible2=true">日期2</view>
		<view class="item" @tap="dateVisible3=true">日期3</view>
		<view class="result">选择结果：{{result.result}}</view>
		
		<w-picker
			:visible.sync="dateVisible1"
			mode="date" 
			startYear="2017" 
			endYear="2029"
			value="2020-04-08 16:45:45"
			:current="false"
			fields="second"
			@confirm="onConfirm($event,'date1')"
			@cancel="onCancel"
			:disabled-after="false"
			ref="date1"
		></w-picker>
		<w-picker
			:visible.sync="dateVisible2"
			mode="date" 
			startYear="2017" 
			endYear="2029"
			value="2020-03-07 16:45:45"
			:current="false"
			fields="second"
			@confirm="onConfirm($event,'date2')"
			@cancel="onCancel"
			:disabled-after="false"
			ref="date2"
		></w-picker>
		<w-picker
			:visible.sync="dateVisible3"
			mode="date" 
			startYear="2017" 
			endYear="2029"
			value="2018-11-07 16:25:45"
			:current="false"
			fields="second"
			@confirm="onConfirm($event,'date3')"
			@cancel="onCancel"
			:disabled-after="false"
			ref="date3"
		></w-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dateVisible1:false,
				dateVisible2:false,
				dateVisible3:false,
				result:{
					result:""
				}
			};
		},
		methods:{
			onConfirm(res,type){
				this.result=res;
				console.log(res)
			},
			onCancel(){
				
			}
		}
	}
</script>

<style lang="scss">

</style>
