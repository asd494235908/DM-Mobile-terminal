<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			// #ifndef MP-WEIXIN|| MP-QQ
			uni.preloadPage({
				url: "/pages/login/index"
			})
			// #endif
			// #ifdef MP-WEIXIN || MP-QQ
			if (this.isValidate === false) {
				uni.setTabBarItem({
					index: 2,
					text: '发现',
					iconPath: 'static/imges/faxian.png',
					selectedIconPath: 'static/imges/faxian-active.png'
				})
			}

			// console.log(this.isValidate)
			// #endif
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		computed: { ...mapState(['isValidate']),
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";

	page {
		background-color: #fff;
		font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Microsoft Yahei, \\5FAE\8F6F\96C5\9ED1, STHeiti, \\534E\6587\7EC6\9ED1, sans-serif;
	}

	.u-wrap {
		background-color: #fff !important;
	}

	/*每个页面公共css */
</style>
