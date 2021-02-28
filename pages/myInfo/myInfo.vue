<template>
	<view v-if="login">
		<u-toast position="bottom" icon ref="uToast" />
		<view class="user-img-warp">
			<view class="user-titel">
				头像
			</view>
			<u-upload ref="uUpload" :action="action" :auto-upload="true" on-success="imgSuccess" on-error="imgError" max-count="1"
			 :header="isData" :custom-btn="true" :show-progress="false" :deletable="false" class="img-warp">
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-avatar :src="userInfo.user_img" class="user-img" size="120"></u-avatar>
				</view>
			</u-upload>
			<u-icon name="arrow-right" size="32"></u-icon>
		</view>
		<view class="user-name" @click="goUserNamePage">
			<view class="user-titel">
				昵称
			</view>
			<view class="user-desc">
				<text v-if="userInfo.user_name!==null">{{userInfo.user_name}}</text>
				<text v-else>未置设</text>
			</view>
			<u-icon name="arrow-right" size="32"></u-icon>
		</view>
		<view class="user-name" @click="sexShow">
			<view class="user-titel">
				性别
			</view>
			<view class="user-desc">
				<text v-if="userInfo.sex!==null &&userInfo.sex!=='null'">{{userInfo.sex}}</text>
				<text v-else>未置设</text>
			</view>
			<u-icon name="arrow-right" size="32"></u-icon>
			<w-picker :visible.sync="sexVisible" mode="selector" value="女" default-type="name" :options="sexOption" @confirm="onConfirm($event,'selector')"
			 @cancel="onCancel" ref="selector"></w-picker>
		</view>
		<view class="user-name" @click="timeShow">
			<view class="user-titel">
				出生年月
			</view>
			<view class="user-desc" v-if="userInfo.user_time!==null &&userInfo.user_time!=='null'">
				{{userInfo.user_time}}
			</view>
			<view class="user-desc" v-else>
				未设置
			</view>
			<u-icon name="arrow-right" size="32"></u-icon>
			<w-picker :visible.sync="timeVisible" mode="date" startYear="1970" endYear="2029" value="2020-04-07" :current="true"
			 fields="day" @confirm="onTimeConfirm($event,'date')" @cancel="onTimeCancel" :disabled-after="false" ref="date"></w-picker>
		</view>
		<view class="user-name" @click="goUserDescPage">
			<view class="user-titel">
				个性签名
			</view>
			<view class="user-desc">
				<text class="user-desc-text ellipsis">{{userInfo.user_autograph}}</text>
			</view>
			<u-icon name="arrow-right" size="32"></u-icon>
		</view>
		<!-- <u-button @click="submit">提交</u-button> -->
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
				// action: 'https://www.dcmaomi.com:3000/api/upload',
				action: 'http://192.168.2.202:3000/api/upload',
				isData: {
					'uid': null,
				},
				timeVisible: false,
				sexVisible: false,
				sexOption: [{
					"label": "男",
					"value": "1"
				}, {
					"label": "女",
					"value": "2"
				}],
			};
		},
		created: function() {
			this.initData()

		},
		computed: {
			...mapState(['login', 'userInfo']),
		},
		methods: {
			...mapMutations(['setUserInfo']),

			goUserDescPage() {
				if (this.login) {
					uni.navigateTo({
						url: 'userdesc/userdesc'
					})
				}
			},
			goUserNamePage() {
				if (this.login) {
					uni.navigateTo({
						url: 'usename/usename'
					})
				}
			},
			timeShow() {
				this.timeVisible = true
			},
			sexShow() {
				this.sexVisible = true
			},
			onTimeConfirm(e) {
				const data = this.copUserInfo()
				data.user_time = e.result
				this.subMit(data)
			},
			onTimeCancel() {},
			onConfirm(e) {
				const data = this.copUserInfo()
				data.sex = e.result
				this.subMit(data)
			},
			onCancel() {},
			//深拷贝用户信息
			copUserInfo() {
				let data = JSON.parse(JSON.stringify(this.userInfo))
				return data
			},
			imgError(e) {
				// console.log('上传失败')
			},
			imgSuccess(e) {
				// console.log('上传成功')
			},
			submit() {
				let files = [];
				// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
				// files = this.$refs.uUpload.lists.filter(val => {
				// 	console.log(val)
				// 	return val.progress == 100;
				// })
				// 如果您不需要进行太多的处理，直接如下即可

				this.$refs.uUpload.upload();
				files = this.$refs.uUpload.lists;
			},
			initData() {
				if (this.login) {
					this.isData.uid = this.userInfo.uid
					this.isData.uid = this.isData.uid.toString()
				} else {
					uni.navigateTo({
						url: "/pages/login/index"
					})
				}
			},
			async subMit(data) {
				const res = await this.$http.post('/api/modifyUserInfo', {
					data
				})
				if (res.data.success === true) {
					// uni.$emit('changeUserInfe',{})
					this.$refs.uToast.show({
						title: '修改成功',
						type: 'success'
					})
					this.getData()
				} else {
					this.$refs.uToast.show({
						title: '修改失败',
						type: 'error'
					})
				}
			},
			async getData() {
				const res = await this.$http.post('/api/validate', {})
				if (res.data.success === true) {
					this.setUserInfo(res.data.data)
				}
			},
		}
	}
</script>

<style lang="scss">
	.user-name {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 2.5%;
		border-bottom: 1px solid $xt;
		height: 90rpx;

		.user-titel {
			flex: 1;
		}

		.user-desc {
			margin-right: 20rpx;

			.user-desc-text {
				display: inline-block;
				width: 300rpx;
				text-align: end;
			}
		}
	}

	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.slot-btn {
		width: 120rpx;
		height: 120rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 20rpx;
		// background: rgb(244, 245, 246);
		// border-radius: 50%;
	}

	.user-img-warp {
		padding: 0 2.5%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid $xt;


		.user-titel {
			flex: 1;
		}
	}

	.img-warp {
		display: flex;
		border-radius: 50% !important;
	}

	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}
</style>
