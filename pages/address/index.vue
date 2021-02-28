<template>
	<view class="address-warp">
		<view class="noAddress" v-if="address.length === 0">
			<view class="address-img">

			</view>
			<view class="address-text">
				没有收获地址哦
			</view>
			<view class="address-item addAddress" @click="addressShow">
				<u-icon name="plus"></u-icon>添加地址
			</view>
		</view>
		<view class="address-content" v-if="address.length !== 0">
			<view class="address-item" v-for="(item,index) in address" :key="index" v-if="address.length !==0 && item.difall === 0"
			 :class="{defall_address:item.difall === 0}" @click="handeAddress(item)">
				<view class="address-info">
					收货人姓名：{{item.name}}
				</view>
				<view class="address-info">
					联系方式：{{item.phone}}
				</view>
				<view class="address-info">
					地址：{{item.address}}
				</view>
				<view class="address-info">
					详细地址：{{item.address_info}}
				</view>
				<view class="defall-Address" v-if="item.difall === 0">
					<u-icon name="checkmark" color="#ff9344"></u-icon>
				</view>
			</view>
			<view class="address-item" v-for="(item,index) in address" :key="index" v-if="address.length !==0 && item.difall !== 0"
			 @click="handeAddress(item)">
				<view class="address-info">
					收货人姓名：{{item.name}}
				</view>
				<view class="address-info">
					联系方式：{{item.phone}}
				</view>
				<view class="address-info">
					地址：{{item.address}}
				</view>
				<view class="address-info">
					详细地址：{{item.address_info}}
				</view>
			</view>
			<view class="address-item addAddress" @click="addressShow">
				<u-icon name="plus"></u-icon>添加地址
			</view>
		</view>
		<view class="mask" v-if="isMask && list !==null" @click.self="IsMask">
			<view class="address-from" :style="{marginBottom:isBottom}">
				<view class="input-info">
					<u-icon name="account-fill" size="32" class="icon-left"></u-icon>
					<u-input @click="handelinput" class="input" v-model="currntAddress.name" :type="type" :border="border" placeholder="请输入姓名" />
				</view>
				<view class="input-info">
					<u-icon name="phone" size="32" class="icon-left"></u-icon>
					<u-input class="input" @click="handelinput" v-model="currntAddress.phone" type="number" :border="border"
					 placeholder="请输入电话号码" />
				</view>
				<view class="input-info">
					<u-icon name="map" size="32" class="icon-left"></u-icon>
					<u-input class="input" v-model="currntAddress.address" :type="type" :border="border" :disabled="true" placeholder="点击下拉选择省/市/县" />
					<u-icon name="arrow-down" size="32" class="icon-right" @click="seletShow"></u-icon>
					<w-picker :visible.sync="visible" mode="linkage" :value="list" :options="list" :level="3" default-type="name"
					 :default-props="defaultProps1" @confirm="onConfirm($event,'linkage')" @cancel="onCancel" ref="linkage"></w-picker>
				</view>
				<view class="input-info">
					<u-icon name="pushpin" size="32" class="icon-left"></u-icon>
					<u-input @click="handelinput" class="input" v-model="currntAddress.address_info" :type="type" :border="border"
					 placeholder="输入详细地址/街道/门牌号" />
				</view>
				<view class="isAddress-class">
					<evan-checkbox style="margin-right: 10rpx;" @change="difallAddress" v-model="isAddress">
						<template>
							<view class="checkbox-warp" :class="{isActive:isAddress}" slot="icon">
								<u-icon v-if="isAddress" name="checkbox-mark" color="#fff" size="28"></u-icon>
							</view>
						</template>
					</evan-checkbox>是否为默认地址
				</view>
				<view class="btn-warp">
					<u-button :hair-line="false" :ripple="true" type="error" v-if="isDell === false" :plain="true" size="mini"
					 throttle-time="500" @click="handelDell" style="margin-right:30rpx ;">删除</u-button>
					<u-button :hair-line="false" :ripple="true" type="default" :plain="true" border size="mini" throttle-time="500"
					 @click="hideMask">取消</u-button>
					<u-button style="margin-left: 30rpx;" :hair-line="false" :ripple="true" type="primary" :plain="true" size="mini"
					 throttle-time="500" @click="handelSubMit">确认
					</u-button>
				</view>
			</view>

		</view>
		<u-toast position="bottom" icon ref="uToast" />
		<my-loading :show="isLoading"></my-loading>
		<u-modal :show-cancel-button="true" :zoom="true" v-model="show" :content="content" @confirm="dellinff"></u-modal>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import MyLoading from '../../components/my-loading'
	export default {
		data() {
			return {
				isLoading: false,
				order_id: null,
				show: false,
				content: '删除后无法恢复',
				address: null,
				currntAddress: {
					address: null,
					difall: 1,
					id: null,
					name: null,
					phone: null,
					uid: null,
					address_info: null
				},
				isMask: false,
				list: null,
				visible: false,
				isAddress: false,
				isDell: false,
				isBottom: '',
				defaultProps1: {
					"label": "name",
					"value": "id",
					"children": "districts"
				},
				type: 'text',
				border: false,
				url: "https://restapi.amap.com/v3/config/district?keywords=&subdistrict=3&extensions=base&key=6dae34602eba34a1dffa8f63e47ed033"
			}
		},
		computed: {
			...mapState(['userInfo', 'login']),
			// isAddress(){
			// 	return this.currntAddress.difall ===0? true :false
			// },
		},
		components: {
			MyLoading
		},
		onLoad: function(option) {
			// console.log(option.order_id)
			this.order_id = option.order_id
			
		},
		created: function() {
			this.address = this.userInfo.address
			this.getAddress()
		},
		watch: {
			isAddress(x, y) {
				this.currntAddress.difall = x ? 0 : 1
			}
		},
		methods: {
			...mapMutations(['setUserInfo']),
			//二级提示确认是否删除
			handelDell() {
				this.show = true
			},
			//键盘高度
			handelinput() {
				uni.onKeyboardHeightChange((e) => {
					this.isBottom = e.height + 40 + 'rpx'
				})
			},
			//删除信息
			async dellinff() {
				this.isLoading = true
				const res = await this.$http.post('/api/dellAddress', {
					data: this.currntAddress
				})
				if (res.data.success === true) {
					this.getData()
					this.isMask = false

					this.$refs.uToast.show({
						title: '删除成功',
						type: 'success'
					})
					this.clerCurrntAddress()
					this.isLoading = false

				}
			},
			//提交信息
			async handelSubMit() {
				if (this.login === false) return
				if (this.currntAddress.name === null || this.currntAddress.phone === null || this.currntAddress.address === null ||
					this.currntAddress.address_info === null) {
					this.$refs.uToast.show({
						title: '请输入完整信息',
						type: 'error'
					})
					return
				}
				this.isLoading = true
				const res = await this.$http.post('/api/subAddress', {
					data: this.currntAddress,
					order_id: this.order_id
				})
				if (res.data.success === true) {
					uni.$emit('getOrderIdEve')
					this.getData()

					this.isMask = false
					this.isLoading = false
					this.$refs.uToast.show({
						title: '提交成功',
						type: 'success'
					})
				}
			},
			addressShow() {
				this.isMask = true
				this.isDell = true
				// this.userInfo.uid = this.currntAddress.uid
				this.currntAddress.uid = this.userInfo.uid
			},
			//是否设置为默认地址
			difallAddress(e) {
				// console.log(e)
				this.currntAddress.difall = 0
			},
			seletShow() {
				this.visible = true
			},
			handeAddress(item) {
				let data = item
				data = JSON.stringify(data)
				data = JSON.parse(data)
				this.currntAddress = data
				this.isAddress = item.difall === 0 ? true : false
				this.isDell = false
				this.isMask = true
			},
			hideMask() {
				this.clerCurrntAddress()
				this.isMask = false
			},
			IsMask (){
				// #ifndef MP-WEIXIN
				this.clerCurrntAddress()
				this.isMask = false
				// #endif
			},
			//清空信息
			clerCurrntAddress() {
				for (let i in this.currntAddress) {
					this.currntAddress[i] = null
				}
				this.currntAddress.difall = 1
				this.isAddress = false
			},
			getAddress() {
				uni.request({
					url: this.url,
					success: (res) => {
						this.list = res.data.districts[0].districts
					}
				})
			},
			onConfirm(x, y) {
				const province = x.obj.col1.name || ''
				const city = x.obj.col2.name || ''
				const area = x.obj.col3.name || ''
				if (area === '') {
					this.currntAddress.address = `${province}-${city}`
				} else {
					this.currntAddress.address = `${province}-${city}-${area}`
				}
			},
			onCancel() {},
			async getData() {
				const res = await this.$http.post('/api/validate', {})
				if (res.data.success === true) {
					this.setUserInfo(res.data.data)
					this.address = this.userInfo.address
				}
			},
		}
	}
</script>

<style lang="scss">
	.input {
		width: 100%;
	}

	.noAddress {
		position: fixed;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		.address-text {
			font-size: 32rpx;
			font-weight: bold;
			color: $uni-text-color-grey;
		}

		.address-img {
			width: 80%;
			height: 500rpx;
			background-image: url('../../static/imges/address_no.png');
			background-size: cover;
		}

		.address-item {
			width: 90%;
			margin: 40rpx auto;
			box-shadow: 0px 0px 6px 1px rgba(18, 18, 3, 0.1);
			border-radius: 16rpx;
			padding: 2.5%;
			box-sizing: border-box;
			position: relative;
		}

		.addAddress {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba($color: #000000, $alpha: .5);
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;

		.btn-warp {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 40rpx;

		}

		.isAddress-class {
			display: flex;
			justify-content: flex-end;
			margin: 20rpx;
		}

		.isActive {
			background-color: $zhuse;
			border: none !important;
		}

		.checkbox-warp {
			width: 40rpx;
			height: 40rpx;
			border: .5rpx solid $xt;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
		}

		.address-from {
			width: 90%;
			margin: 0 auto;
			background-color: #fff;
			border-radius: 8rpx;
			padding: 2.5%;

			.input-info {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 20rpx 0;

				.icon-left {
					margin: 0 20rpx;
				}

				.icon-right {
					margin: 0 20rpx;
				}
			}
		}
	}

	.address-content {
		width: 100%;

		.defall_address {
			border: solid 1px $zhuse;
		}

		.defall-Address {
			position: absolute;
			top: 14rpx;
			right: 20rpx;
			width: 40rpx;
			height: 40rpx;
			border: solid 1px $zhuse;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.address-info {
			margin: 10rpx 0;
		}

		.address-item {
			width: 90%;
			margin: 40rpx auto;
			box-shadow: 0px 0px 6px 1px rgba(18, 18, 3, 0.1);
			border-radius: 16rpx;
			padding: 2.5%;
			box-sizing: border-box;
			position: relative;
		}

		.addAddress {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
