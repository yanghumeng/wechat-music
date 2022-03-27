// pages/me/me.js
let startY = 0; // 手指起始的坐标
let moveY = 0; // 手指移动的坐标
let moveDistance = 0; // 手指移动的距离
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: "translateY(0)",
    coverTransition: "transform 1s linear",
    userInfo: {}, //用户信息
    recentPlayList: [], //用户播放记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 读取用户的基本信息
    //  wx.setData({
    //    userInfo:{}
    //  })
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      // 更新userInfo的状态
      this.setData({
        userInfo: JSON.parse(userInfo)
      })
      // 获取用户播放记录
      this.getUserRecentPlayList(this.data.userInfo.userId);
    }
  },
  // 获取用户播放记录到的功能函数
  getUserRecentPlayList(userId) {
    console.log(userId);
    request('/user/record', {
      uid: userId,
      type: 0
    }, "GET", (res) => {
      let index = 0;
      let recentPlayList = res.allData.splice(0, 10).map(item => {
        item.id = index++;
        return item;
      })
      console.log(recentPlayList);
      this.setData({
        recentPlayList
      })
    }, (err) => {
      console.log(err);
    });

  },
  handleTouchStart(event) {
    this.setData({
      coverTransition: "transform 0.3s linear"
    });
    // 获取手指位置
    startY = event.touches[0].clientY;
  },
  handleTouchMove(event) {
    //移动距离
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY;
    if (moveDistance < 0 || moveDistance > 80) {
      return;
    }
    this.setData({
      coverTransform: 'translateY(' + moveDistance + 'rpx)'
    })
  },
  handleTouchEnd() {
    this.setData({
      coverTransform: 'translateY(0)',
      coverTransition: "transform 1s linear"
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 跳转至登录login页面的回调
  toLogin() {
    //判断用户是否登录
    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
    // wx.navigateTo({
    //   url: '/pages/login/login'
    // })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})