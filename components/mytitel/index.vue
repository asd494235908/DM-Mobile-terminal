<template>
	<view class="contenner">
		<view class="titel">
			<view class="titel-text">
				{{titel}}
			</view>
			<view class="titel-moer">
				<slot name="moer">

				</slot>
			</view>
		</view>
		<view class="content">
			<slot name="good"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			titel: String
		},
	}
</script>

<style lang="scss">
	.contenner {
		width: 90%;
		margin: 30rpx auto;
		border-radius: 8rpx;
		overflow: hidden;
		box-sizing: border-box;

		.titel {
			width: 100%;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 10rpx;

			.titel-text {
				font-size: 32rpx;
				padding-left: 10rpx;
				color: $uni-text-color;
				font-weight: bold;
				letter-spacing: 8rpx;
			}
		}
	}
</style>
