# DM移动商城
[![](https://img.shields.io/badge/version-1.0-brightgreen)](https://github.com/asd494235908/DM-Mobile-terminal)
[![GitHub stars](https://img.shields.io/github/stars/asd494235908/DM-Mobile-terminal.svg?style=social&label=Stars)](https://github.com/asd494235908/DM-Mobile-terminal)
[![GitHub forks](https://img.shields.io/github/forks/asd494235908/DM-Mobile-terminal.svg?style=social&label=Fork)](https://github.com/asd494235908/DM-Mobile-terminal)
 - [若图片显示不完整请跳转码云](https://gitee.com/dcmaomi/Dm)
### [UNI-APP](https://uniapp.dcloud.io/)
 - uni-app是一个基于Vue.js的跨平台多端应用前端开发框架，由数字天堂DCloud开发并开源。通过uni-app开发框架，开发者只需编写一套代码，即可同时编译生成多个平台的应用。
 ### 项目已部署，在线Demo
 - DM商城(h5)：https://dmh5.dcmaomi.com
 - 下载app(安卓)：https://www.dcmaomi.com:3000/api/downloadApp
 - Swagger接口文档：https://www.dcmaomi.com:3000/api/Swagger
### 疑问
  - 为什么没有ios平台？
    - 答：ios 平台申请appID有条件限制 
  - 为什么没有小程序？
    - 答：此项目属于电商[类目](https://developers.weixin.qq.com/miniprogram/product/material/#%E9%9D%9E%E4%B8%AA%E4%BA%BA%E4%B8%BB%E4%BD%93%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%BC%80%E6%94%BE%E7%9A%84%E6%9C%8D%E5%8A%A1%E7%B1%BB%E7%9B%AE) 在平台发布小程序之后 需要营业执照所以无法正式上线。可以打包本地浏览
### 项目预览
[![WX20190924-234416@2x.png](https://www.dcmaomi.com:3010/serverImage/20210305010710_12523.png)](https://github.com/asd494235908/DM-Mobile-terminal)
  - ![](https://www.dcmaomi.com:3010/serverImage/20210306224256_12147.png)
  - ![](https://www.dcmaomi.com:3010/serverImage/20210306224255_12887.png)
  - ![](https://www.dcmaomi.com:3010/serverImage/20210306224255_11225.png)
  - ![](https://www.dcmaomi.com:3010/serverImage/20210306224255_14772.png)
  
  - ![](https://www.dcmaomi.com:3010/serverImage/20210306224255_12105.png)
  ### 后端所用技术 [后端](https://github.com/asd494235908/DM-Server) 
- 主要
   - [Node Js](https://nodejs.org/zh-cn/)：Node.js
   - [express](https://www.expressjs.com.cn/)：基于 Node.js 平台， Web 开发框架
   - [mysql](https://www.mysql.com/)：基于 Node.js 平台， Web 开发框架
   - [Swagger2](https://www.dcmaomi.com:3000/api/swagger/#/)：Api文档生成
   - [svg-captcha](https://www.npmjs.com/package/svg-captcha)：登录验证码
   - [silly-datetime](https://www.npmjs.com/package/silly-datetime)：时间格式化工具
   - [qr-image](https://www.npmjs.com/package/silly-datetime)：链接生成二维码
- 第三方接口
  - 高德地图城市列表API：获取全国省/市/县(区)三级列表 需要注册appid
  - [天气api](http://www.tianqiapi.com/index/doc?version=day)：根据Ip地址获取城市天气（服务器主要用来获取城市）需要注册appid
- 第三方SDK
  - [alipay-sdk](http://www.tianqiapi.com/index/doc?version=day)：支付宝支付Sdk
- 服务器
  - [宝塔建站](https://www.bt.cn/)：宝塔建站
  - [Apache](http://httpd.apache.org/)
### 运行项目
- HBuilderX 打开此项目
- 配置 manifest.json
  - h5  
    - ![](https://www.dcmaomi.com:3010/serverImage/20210306230914_12476.png)
  - 小程序填写你的app id (也要下载对应的编辑器)
  - app 
     - 配置您的启动图标![](https://www.dcmaomi.com:3010/serverImage/20210306231313_13458.png)
     - 配置 启动页面图(为了适配各个终端最好使用.9图)![](https://www.dcmaomi.com:3010/serverImage/20210306231521_16377.png)
     - 模块配置 勾选(oauth登录鉴权) 配置对应的登录权限与appid
- 在main.js 配置您的服务器地址  
    ```javascript
    //main.js 配置
    axios.defaults.baseURL = "http://您的本地服务器地址:端口号"  //注意http与https
    ```
- 点击左上角的运行 运行到对应的项目
### 作者其他项目推荐
- [DM商城：分布式电商购物商城](https://www.dcmaomi.com/)
  ![](https://www.dcmaomi.com:3010/serverImage/20210305011146_17326.png "前台首页")
- [DcPay](https://github.com/asd494235908/DcPay)
    
    [![WX20190924-234416@2x.png](https://www.dcmaomi.com:3010/serverImage/20210306141208_16064.png)](https://github.com/asd494235908/DcPay)

- [DM-TM后端](https://github.com/asd494235908/TerMinal)

    ![](https://www.dcmaomi.com:3010/serverImage/20210305011146_16923.png)

### 技术疑问交流
- 免费交流群 `949139553` [![](http://pub.idqqimg.com/wpa/images/group.png)](https://qm.qq.com/cgi-bin/qm/qr?k=dtD6X04E3q7v3C8wuOnUENoW5S7hdGHO&jump_from=webapi)
- 作者邮箱 asd494235908@qq.com
### 商用授权
- 个人学习使用遵循GPL开源协议
- 商用需联系作者低价授权
### [捐赠](https://dcpay.dcmaomi.com/pay)
