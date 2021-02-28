<template>
	<view>
		<view class="item" @tap="shortTermVisible=true">短期日期时间</view>
		<view class="result">选择结果：{{result.result}}</view>
		
		<w-picker
			:visible.sync="shortTermVisible"
			mode="shortTerm"
			value="2020-04-08 13:18:00"
			:current="true"
			expand="60"
			@confirm="onConfirm($event,'shortTerm')"
			@cancel="onCancel"
			ref="shortTerm" 
		></w-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shortTermVisible:false,
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
