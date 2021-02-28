<template>
	<view>
		<view class="item" @tap="regionVisible=true">省市区三级联动</view>
		<view class="result">选择结果：{{result.result}}</view>
		
		<w-picker
			:visible.sync="regionVisible"
			mode="region"
			:value="defaultRegion"
			default-type="value"
			:hide-area="false"
			@confirm="onConfirm($event,'region')"
			@cancel="onCancel"
			ref="region" 
		></w-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				regionVisible:false,
				result:{
					result:""
				},
				defaultRegion:["150000","150100","150103"]
			};
		},
		methods:{
			onConfirm(res){
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
