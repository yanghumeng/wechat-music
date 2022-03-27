import config from "./config"
export default  (url, data, method='GET',  callback, errFun)=> {
   wx.request({
   url:config.baseURL+url,
   method,
   data,
   header: {
    'content-type': method == 'GET'?'application/json':'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    cookie: wx.getStorageSync('cookies') ? wx.getStorageSync('cookies').find(item=>item.indexOf('MUSIC_U') !== -1) : ''
   },
   dataType: 'json',
   success: function (res) {
     // console.log('请求成功:', res);
				if(data.isLogin){	// 登录请求
					// 将用户的cookie存入本地
					wx.setStorage({
						key: 'cookies',
						data: res.cookies
					})
				}
    callback(res.data);
   },
   fail: function (err) {
     errFun(err)
   }
  })
 }