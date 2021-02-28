<template>
	<view class="warp" :class="{warp_active:isbg}" v-if="iswarp" @touchmove.stop.prevent="() => {}">
		<view class="warp_box" :style="[isstyle]">
			<view class="titel">
				提示
			</view>
			<slot class="content" name='content'>
			</slot>
			<view class="btn">
				<view class="btn_close" v-if="isclose" @click="close">
					取消
				</view>
				<view class="btn_determine" @click="determine">
					{{cntentText}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				isbg: false,
				iswarp: false,
				isstyle: 'animation: myfirst 0.2s ease-in-out'
			};
		},
		watch: {
			show(x, y) {
				if (x === true) {
					this.isstyle = 'animation: myfirst 0.25s ease-in-out'
					this.iswarp = x
				} else {
					this.isstyle = 'animation: myfirst 0.25s ease-in-out'
					this.isbg = false
					setTimeout(() => {
							this.iswarp = x
						},250)
			}
		}
	},
	props: {
			//是否显示取消按钮
			isclose: {
				type: Boolean,
				default: true
			},
			//是否显示组件
			show: {
				type: Boolean,
				default: true
			},
			cntentText:{
				type:String,
				default:"确认"
			}
		},
		created() {
			setTimeout(() => {
				this.isbg = true
			}, 0)
		},
		methods: {
			determine() {
				this.$emit('determine')
			},
			close() {
				this.$emit('close')
			},
		}
	}
</script>

<style lang="scss">
	.warp {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100vh;
		z-index: 9999;
		background-color: rgba(0, 0, 0, .5);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		opacity: 0;
		transition: all 0.25s linear 0s;

		.warp_box {
			opacity: 1;
			width: 90%;
			background-color: #fff;
			border-radius: 12rpx;
			padding: 10rpx;


			.titel {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 90rpx;
				font-size: 18px;
			}

			.btn {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 16px;
				height: 90rpx;
				border-top: .5px solid $xt;
			}

			.btn_close,
			.btn_determine {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.btn_close {
				flex: 1;
				color: #999;
			}

			.btn_determine {
				flex: 1;
				color: rgb(41, 121, 255);
			}
		}
	}

	@keyframes myfirst {
		0% {
			opacity: 0;
			transform: scale(1.4);
		}

		25% {
			opacity: .25;
			transform: scale(1.3);
		}

		50% {
			opacity: .5;
			transform: scale(1.2);
		}

		75% {
			opacity: .75;
			transform: scale(1.1);
		}

		100% {
			opacity: 1;
			transform: scale(1.0);
		}
	}

	@keyframes mytow {
		0% {
			opacity: 1;
			transform: scale(1.0);
		}

		25% {
			opacity: .75;
			transform: scale(1.1);
		}

		50% {
			opacity: .5;
			transform: scale(1.2);
		}

		75% {
			opacity: .25;
			transform: scale(1.3);
		}

		100% {
			opacity: 0;
			transform: scale(1.4);
		}








	}

	.warp_active {
		opacity: 1;
	}
</style>
