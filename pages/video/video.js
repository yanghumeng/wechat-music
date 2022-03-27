// pages/video/video.js
import utilrequest from "../../utils/request"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [],
    navId: 0,
    videoList: [],
    isTriggered: false,
    loadtext: '',
    isShowError:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    });
    // 判断用户是否登录
    let userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        success: () => {
          // 跳转至登录界面
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      })
    }
    this.getVideoGroupList();
  },
  // 获取导航列表
  getVideoGroupList() {
    utilrequest("/video/group/list", {}, "GET", (res) => {
      if (res.code == '200') {
        this.setData({
          videoGroupList: res.data.slice(0, 14),
          navId: res.data[0].id
        });
        this.getVideoList(this.data.navId);
      } 
      wx.hideLoading();
      this.setData({
        isShowError:false
      })
    }, (err) => {
      console.log(err);
      wx.hideLoading();
      wx.showToast({
        title: '数据请求失败',
        icon:'none'
      });
      this.setData({
        isShowError:true
      })
    })
  },
  //获取视频列表
  getVideoList(navid) {
    utilrequest("/video/group", {
      id: navid
    }, "GET", (res) => {
      if (res.code == '200') {
        this.setData({
          videoList: res.datas,
          isTriggered: false
        });
        if (this.data.videoList.length > 2) {
          this.setData({
            loadtext: '上拉加载更多'
          });
        }
      }
      wx.hideLoading();
    }, (err) => {
      console.log(err);
      wx.hideLoading();
      wx.showToast({
        title: '数据请求失败',
        icon:'none'
      })
    });
  },

  //切换导航
  changeNav(event) {
    let id = event.currentTarget.id;
    this.setData({
      navId: id,
      videoList: []
    });
    wx.showLoading({
      title: '拼命加载中...',
    });
    //获取视频数据
    this.getVideoList(this.data.navId);
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
    this.getVideoList(this.data.navId);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("bottom");
    this.setData({
      loadtext: '加载中...'
    })
    let newvideolist = this.data.videoList;
    let videoList = this.data.videoList

    if (newvideolist.length >= 8) {
      this.setData({
        loadtext: '------我是有底线的------'
      })
    } else {
      this.setData({
        loadtext: '上拉加载更多'
      })
      videoList.push(...newvideolist);
      this.setData({
        videoList: videoList
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})