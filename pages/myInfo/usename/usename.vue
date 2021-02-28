<template>
	<view>
		<view class="warp">
			<u-toast position="bottom" icon ref="uToast" />
			<u-input placeholder="请输入用户名" v-model="value" :type="type" :border="border" />
		</view>
		<view class="warp-btn">
			<u-button class="" :isClass="true" :ripple="true" type="primary" shape="circle" @click="back">保 存</u-button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				value: '',
				type: 'text',
				border: false
			};
		},
		computed: {
			...mapState(['login', 'userInfo']),
		},
		methods: {
			...mapMutations(['setUserInfo']),
			back() {
				let info = JSON.stringify(this.userInfo)
				info = JSON.parse(info)
				info.user_name = this.value
				this.subMit(info)
			},
			async subMit(data) {
				const res = await this.$http.post('/api/modifyUserInfo', {
					data
				})
				if (res.data.success === true) {
					// uni.$emit('changeUserInfe',{})
					let page = getCurrentPages()
					uni.navigateBack({
						delta: page.length - 1
					})
				} else{
					this.$refs.uToast.show({
						title: '修改失败',
						type: 'error'
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.warp {
		width: 90%;
		margin: 30rpx auto 0;
		border-bottom: 1px solid $zhuse;
	}

	.warp-btn {
		width: 90%;
		margin: 30rpx auto 0;
	}
</style>
