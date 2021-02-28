<template>
	<view class="warp">
		
		<view class="img">
			
		</view>
		<view class="text">
			暂无优惠券哦
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:'https://s1.ax1x.com/2020/11/08/BIcwLT.png'
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
		width: 76%;
		height: 620rpx;
		background-image: url(https://s1.ax1x.com/2020/11/08/BIcwLT.png);
		background-size: cover;
	}
	.text{
		margin-top: 60rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #999;
	}
}
</style>
