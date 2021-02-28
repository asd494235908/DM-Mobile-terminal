<template>
	<view>
		<view class="item"  @tap="halfVisible=true">上下午</view>
		<view class="result">选择结果：{{result.result}}</view>
		
		<w-picker
			:visible.sync="halfVisible"
			mode="half" 
			startYear="2017" 
			endYear="2030"
			value="2018-02-11 下午"
			:current="true"
			@confirm="onConfirm($event,'half')"
			@cancel="onCancel"
			:disabled-after="false"
			ref="half" 
		></w-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				halfVisible:false,
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
