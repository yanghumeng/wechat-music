// pages/search/search.js
import PubSub from 'pubsub-js';
import utilrequest from "../../utils/request"
let isSend = false; // 函数节流使用
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderContent: '', // placeholder的内容
    hotList: [], // 热搜榜数据
    searchContent: '', // 用户输入的表单项数据
    searchList: [], // 关键字模糊匹配的数据
    historyList: [], // 搜索历史记录
    musicId: [], //音乐id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取初始化的数据
    this.getInitData();

    // 获取历史记录
    this.getSearchHistory();
  },
  // 获取初始化的数据
  getInitData() {
    utilrequest("/search/default", {}, "GET", (res) => {
      if (res.code == '200') {
        this.setData({
          placeholderContent: res.data.showKeyword
        })
      }
    }, (err) => {
      console.log(err);
    });
    utilrequest("/search/hot/detail", {}, "GET", (res) => {
      if (res.code == '200') {
        this.setData({
          hotList: res.data
        })
      }
    }, (err) => {
      console.log(err);
    });
  },

  // 获取本地历史记录的功能函数
  getSearchHistory() {
    let historyList = wx.getStorageSync('searchHistory');
    if (historyList) {
      this.setData({
        historyList
      })
    }
  },

  // 表单项内容发送改变的回调
  handleInputChange(event) {
    // console.log(event);
    // 更新searchContent的状态数据
    this.setData({
      searchContent: event.detail.value.trim()
    })
    if (isSend) {
      return
    }
    isSend = true;
    this.getSearchList();
    // 函数节流
    setTimeout(() => {
      isSend = false;
    }, 300)
  },

  // 获取搜索数据的功能函数
  getSearchList() {
    if (!this.data.searchContent) {
      this.setData({
        searchList: []
      })
      return;
    }
    let {
      searchContent,
      historyList
    } = this.data;
    // 发请求获取关键字模糊匹配数据
    utilrequest("/search", {
      keywords: searchContent,
      limit: 10
    }, "GET", (res) => {
      if (res.code == '200') {
        this.setData({
          searchList: res.result.songs
        })
      }
    }, (err) => {
      console.log(err);
    });

    // 将搜索的关键字添加到搜索历史记录中
    if (historyList.indexOf(searchContent) !== -1) {
      historyList.splice(historyList.indexOf(searchContent), 1);
    }
    historyList.unshift(searchContent);
    this.setData({
      historyList
    })

    wx.setStorageSync('searchHistory', historyList);

  },

  // 清空搜索内容
  clearSearchContent() {
    console.log('clear()');
    this.setData({
      searchContent: '',
      searchList: []
    })
  },

  // 删除搜索历史记录
  deleteSearchHistory() {
    wx.showModal({
      content: '确认删除吗？',
      success: (res) => {
        if (res.confirm) {
          // 清空data中historyList
          this.setData({
            historyList: []
          })
          // 移除本地的历史记录缓存
          wx.removeStorageSync('searchHistory');
        }
      }
    })
  },
  // 跳转至歌曲详情
  toSongDetail(event) {
    let songid = event.currentTarget.dataset.id;
    this.setData({
      // 存储musicid
      musicId: songid
    })
    console.log(songid);
    wx.navigateTo({
      url: '../songDetail/songDetail?songid=' + songid
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