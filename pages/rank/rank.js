// pages/rank.js
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "网易云音乐",
    bgUrl:'../../static/images/bg.png',
    topmusiclist: [],
    listid: [3, 0, 2, 1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'加载中'
    });
    request("/toplist/detail", {}, "GET",(res) => {
      let musiclist = res.list.slice(0, 4);
      this.setData({
        topmusiclist:musiclist
      })
      wx.hideLoading();
    },(err) => {
      console.log(err)
      wx.showToast({
        title:'数据请求失败',
        icon:'error'
      })
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