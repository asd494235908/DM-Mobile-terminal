<template>
	<view>
		<view class="item" @tap="linkageVisible=true">自定义多级联动</view>
		<view class="result">选择结果：{{result.result}}</view>
		
		<w-picker
			:visible.sync="linkageVisible"
			mode="linkage"
			:value="defaultRegion1"
			:options="options"
			:level="4"
			default-type="id"
			:default-props="defaultProps1"
			@confirm="onConfirm($event,'linkage')"
			@cancel="onCancel"
			ref="linkage" 
		></w-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				linkageVisible:false,
				result:{
					result:""
				},
				defaultProps1:{
					label:"name",
					value:"id",
					children:"child"
				},
				defaultRegion1:["120000","120100","120101","12010102"],
				options:[
					{
						id: '110000',
						name: '北京市',
						child: [{
							id: "110100",
							name: "北京市",
							child: [{
								id: "110101",
								name: "东城区",
								child:[{
									id: "11010101",
									name: "小区1",
								},{
									id: "11010102",
									name: "小区2",
								}]
							}, {
								id: "110102",
								name: "西城区"
							},{
								id: "110105",
								name: "朝阳区"
							}, {
								id: "110106",
								name: "丰台区"
							}, {
								id: "110107",
								name: "石景山区"
							}, {
								id: "110108",
								name: "海淀区"
							}, {
								id: "110109",
								name: "门头沟区"
							}, {
								id: "110111",
								name: "房山区"
							}, {
								id: "110112",
								name: "通州区"
							}, {
								id: "110113",
								name: "顺义区"
							}, {
								id: "110114",
								name: "昌平区"
							}, {
								id: "110115",
								name: "大兴区"
							}, {
								id: "110116",
								name: "怀柔区"
							}, {
								id: "110117",
								name: "平谷区"
							}, {
								id: "110118",
								name: "密云区"
							}, {
								id: "110119",
								name: "延庆区"
							}]
						}]
					}, {
						id: '120000',
						name: '天津市',
						child: [{
							id: "120100",
							name: "天津市",
							child: [{
								id: "120101",
								name: "和平区",
								child:[{
									id: "12010101",
									name: "小区3",
								},{
									id: "12010102",
									name: "小区4",
								}]
							}, {
								id: "120102",
								name: "河东区"
							}, {
								id: "120103",
								name: "河西区"
							}, {
								id: "120104",
								name: "南开区"
							}, {
								id: "120105",
								name: "河北区"
							}, {
								id: "120106",
								name: "红桥区"
							}, {
								id: "120110",
								name: "东丽区"
							}, {
								id: "120111",
								name: "西青区"
							}, {
								id: "120112",
								name: "津南区"
							}, {
								id: "120113",
								name: "北辰区"
							}, {
								id: "120114",
								name: "武清区"
							}, {
								id: "120115",
								name: "宝坻区"
							}, {
								id: "120116",
								name: "滨海新区"
							}, {
								id: "120117",
								name: "宁河区"
							}, {
								id: "120118",
								name: "静海区"
							}, {
								id: "120119",
								name: "蓟州区"
							}]
						}]
					}
				]
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
