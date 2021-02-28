const home = [{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/index/index',
		name: 'index',
		aliasPath: '/', //对于h5端你必须在首页加上aliasPath并设置为/
		meta: {
			title: '首页',

		}
	}, {
		path: '/pages/login/index',
		name: 'login',
	}, {
		path: '/pages/my/index',
		name: 'my',
	},
	{
		path: '/pages/class/index',
		name: 'class',
	}, {
		path: '/pages/good/index',
		name: 'good',
		myDiy: {
					islogin: true
				}
	},
	{
		path: '/pages/listgood/index',
		name: 'listgood',
	},
	{
		path: '/pages/goodlist/index',
		name: 'goodlist',
	},
	{
		path: '/pages/order/index',
		name: 'order',
	},
	{
		path: '/pages/address/index',
		name: 'address',
	},
	{
		path: '/pages/myInfo/myInfo',
		name: 'myInfo',
	},
	{
		path: '/pages/myInfo/usename/usename',
		name: 'usename',
	},
	{
		path: '/pages/myInfo/userdesc/userdesc',
		name: 'userdesc',
	},
	{
		path: '/pages/coupon/coupon',
		name: 'coupon',
	},
	{
		path: '/pages/service/service',
		name: 'service',
	},
	{
		path: '/pages/search/search',
		name: 'search',
	},
	{
		path: '/pages/History/History',
		name: 'History',
	},
	{
		path: '/pages/settlement/settlement',
		name: 'settlement',
	},
	{
		path: '/pages/pay/pay',
		name: 'pay',
	},
	{
		path: '/pages/donation/donation',
		name: 'donation',
	},
	
]
export default home
