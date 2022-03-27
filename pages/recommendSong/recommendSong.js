// pages/recommendSong/recommendSong.js
import PubSub from "pubsub-js"
import utilrequest from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '',
    month: '',
    recommendList: [],
    index:0,
    isShowError:false,
    musicCount:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    });
    this.getRecommendList();

    //订阅songDetail发布的消息
    PubSub.subscribe('switchType',(msg,type)=>{
      let {recommendList,index}=this.data;
      if(type=='pre'){
        (index===0)&&(index=recommendList.length);
        index-=1;
      }else{
        (index===recommendList.length-1)&&(index=-1);
        index+=1;
      }
      this.setData({
        index
      })
      let musicId=recommendList[index].id;
      //将musicId回传给songDetail页面
      PubSub.publish('musicId',musicId);
    })
  },
  // 获取推荐列表
  getRecommendList() {
    wx.showLoading({
      title: '拼命加载中...'
    });
    utilrequest("/recommend/songs", {}, "GET", (res) => {
      if (res.code == '200') {
        this.setData({
          recommendList: res.recommend,
          musicCount:'共有'+res.recommend.length+'首歌曲'
        });
      } else{
        if (this.data.recommendList.length == 0) {
          this.setData({
             isShowError: true
          })
        }
      }
      wx.hideLoading();
    }, (err) => {
      console.log(err);
      wx.hideLoading();
      if (this.data.recommendList.length == 0) {
        this.setData({
           isShowError: true
        })
      }
    })
    
  },

  toSongDetail(event){
    let songid=event.currentTarget.id;
    let index=event.currentTarget.dataset.index;
    this.setData({
      index
    })
    wx.navigateTo({
      url: '../songDetail/songDetail?songid='+songid,
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