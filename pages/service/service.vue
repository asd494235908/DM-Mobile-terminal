<template>
	<view class="warp">
		
		<view class="img">
			
		</view>
		<view class="text-warp">
			<view class="text">
				<text>邮箱：</text>
				<text :selectable="true">asd494235908@qq.com</text>
				
			</view>
			<view class="text">
				<text>qq：</text>
				<text :selectable="true">494235908</text>
				
			</view>
			<view class="text">
				<text>微信：</text>
				<text :selectable="true">dc494235908</text>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.warp{
	position: fixed;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	.img{
		width: 40%;
		height: 350rpx;
		background-image: url(https://s1.ax1x.com/2020/11/08/BI2Zvt.png);
		background-size: cover;
	}
	.text{
		margin-top: 60rpx;
		font-size: 32rpx;
		color: #999;
	}
}
</style>
