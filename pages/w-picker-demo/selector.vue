<template>
	<view>
		<view class="item" @tap="selectorVisible=true">单列选择</view>
		<view class="result">选择结果：{{result.result}}</view>
		<w-picker
			:visible.sync="selectorVisible"
			mode="selector"
			value="女"
			default-type="name"
			:default-props="defaultProps"
			:options="selectorList"
			@confirm="onConfirm($event,'selector')"
			@cancel="onCancel"
			ref="selector" 
		></w-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectorVisible:false,
				result:{
					result:""
				},
				defaultProps:{
					label:"name",
					value:"id"
				},
				selectorList:[
					{
						name:"男",
						id:"1"
					},{
						name:"女",
						id:"2"
					}
				]
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
