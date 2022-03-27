// pages/index/index.js
import request from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowError: false,
    bannerList: [], //轮播图
    recommendList: [], //推荐歌单
    topList: [], //排个版数据
    // 图标列表
    navcontainer: [{
        icon: "iconhotfill",
        title: "每日推荐"
      },
      {
        icon: "iconedit",
        title: "歌单"
      },
      {
        icon: "iconglobal",
        title: "排行榜"
      },
      {
        icon: "iconwefill",
        title: "电台"
      },
      {
        icon: "iconvideofill",
        title: "直播"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanner();
    this.getRecommendList();
    // 获取排行榜数据
    this.getTopList();
  },
  getBanner() {
    console.log('1')
    wx.showLoading({
      title: '拼命加载中...',
      mask: true
    });
    request('/banner', {
      type: 2
    }, 'GET', (res) => {
      if (res.code == 200) {
        this.setData({
          bannerList: res.banners
        })
      }
      wx.hideLoading()
    }, (err) => {
      console.log(err)
      wx.hideLoading()
      wx.showToast({
        title: '数据请求失败',
        icon: 'none'
      })
    });
  },
  getTopList() {
    let index = 0;
    let resultArr = [];
    while (index < 5) {
      request('/top/list', {
          idx: index++
        }, 'GET',
        (res) => {
          let topListItem = {
            name: res.playlist.name,
            tracks: res.playlist.tracks.slice(0, 3)
          };
          resultArr.push(topListItem);
          this.setData({
            topList: resultArr
          })
        },
        (err) => {
          console.log(err)
        });
    }
  },
  getRecommendList() {
    request('/personalized', {
      limit: 10
    }, 'GET', (res) => {
      if (res.code == 200) {
        this.setData({
          recommendList: res.result
        })
        this.showError(false);
      } else {
        this.showError(true);
      }
    }, (err) => {
      console.log(err);
      this.showError(true);
    });
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
  showError(iserror) {
      this.setData({
        isShowError: iserror
      })
  },
  handelNavigateTo(event) {
    let id = event.currentTarget.id;
    let url = "";
    switch (id) {
      case '0':
        url = "../recommendSong/recommendSong";
        break;
      case '1':
        url = "";
        break;
      case '2':
        url = "../rank/rank";
        break;
      case '3':
        url = "";
        break;
      case '4':
        url = "";
        break;
      default:
        url: ""
    }
    if (url != "") {
      wx.navigateTo({
        url: url,
      })
    } else {
      wx.showToast({
        title: '该模块正在开发中',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.getBanner();
    this.getRecommendList();
    this.getTopList();
    setTimeout(function(){
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },1500)
    
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