<template>
	<view class="warp" v-if="show">
		<view class="warp-content">
			<u-loading mode="flower" size="60" :show="show"></u-loading>
		</view>
		
	</view>
</template>

<script>
	export default {
			props: {
				// 是否显示
				show: {
					type: Boolean,
					default: true
				}
			},
		
	}
</script>

<style lang="scss">
.warp{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	// transform: translate(-100rpx,-100rpx);
	background-color:rgba(0,0,0,.3);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;
	.warp-content{
		width: 160rpx;
		height: 160rpx;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0,0,0,.5);
	}
}
</style>
