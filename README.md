# 音乐微信小程序

#### 介绍
大部分UI使用本人的设计，本人只涉及到前端编写，因为接口使用网易云api 
1. 参照网易云APP，开发轻量级小程序  
2. 使用组件化开发，易维护  
3. 实现视频播放切换、音乐播放切换、搜索歌曲、登录注册  
4. 利用Pubsub消息订阅发布进行页面之间的通信，实现歌曲切换  
5. 使用内网穿透实现网络服务连接

#### 软件架构
原生微信小程序
使用pubsub.js第三方库来实现页面之间通信
npm命令：npm install pubsub-js



#### 安装教程
运行小程序前可以先构建下环境以免出现其他问题  
npm install  
构建好后会出现一个新的文件夹（node_modules）  
![输入图片说明](https://images.gitee.com/uploads/images/2021/0822/211331_1bf7a111_8258296.png "屏幕截图.png")
1.  由于微信小程序现在支持npm，使用项目中使用到了，如果报错  
![输入图片说明](https://images.gitee.com/uploads/images/2021/0820/204914_7c9b9dcf_8258296.png "屏幕截图.png")  
 **解决方法：**   
![输入图片说明](https://images.gitee.com/uploads/images/2021/0820/205027_59400f52_8258296.png "屏幕截图.png")  
![输入图片说明](https://images.gitee.com/uploads/images/2021/0820/205153_498023d5_8258296.png "屏幕截图.png")  

2.  后端直接使用网易云api
    https://gitee.com/yanghumeng/netease-cloud-api.git

3.  如果还有其他错误，可以私信我，哈哈哈 :joy: 

#### 效果图（部分）
![输入图片说明](https://images.gitee.com/uploads/images/2021/0820/210909_e755b781_8258296.jpeg "index.JPG")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0820/210933_a3294080_8258296.jpeg "video.JPG")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0820/210954_ff2c1224_8258296.jpeg "recommend.JPG")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0820/211011_3c507a02_8258296.jpeg "search.JPG")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0820/211023_ea259386_8258296.jpeg "music.JPG")
