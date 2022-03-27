// pages/songDetail/songDetail.js
import PubSub, {
  unsubscribe
} from "pubsub-js"
import utilrequest from "../../utils/request"
import filter from "../../utils/filter"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false, //标识是否播放
    song: {
      al: {
        picUrl: ''
      },
      ar: [{
        name: '歌手'
      }],
      name: ' '
    },
    songurl: {},
    progress: 0,
    duration: 0,
    progressTime: '00:00', //实时时间
    durationTime: '00:00' //总时长

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let musicid = options.songid;
    this.mid = musicid;
    if (app.globalData.isMusicPlay && app.globalData.musicId === musicid) {
      this.setData({
        isPlay: true
      })
    }
    this.bgAudioManager = wx.getBackgroundAudioManager();
    this.getSongDetail(musicid);
    this.getSongUrl(musicid, false);
    this.bgAudioManager.onPlay(() => {
      console.log("play");
      this.changePlayStatus(true);
      app.globalData.musicId = musicid;
      this.countTimeDown(this, this.bgAudioManager);
    });
    this.bgAudioManager.onPause(() => {
      this.changePlayStatus(false);
    });
    this.bgAudioManager.onStop(() => {
      console.log("stop");
      this.changePlayStatus(false);
    });
    // 播放自然结束自动切换到下一首
    this.bgAudioManager.onEnded(() => {
      console.log("end");
      PubSub.subscribe('musicId', (msg, musicId) => {
        this.getSongDetail(musicId);
        this.getSongUrl(musicId, true);
        //取消订阅
        PubSub, unsubscribe('musicId');
      })
      //发布消息给recommendSong页面
      PubSub.publish('switchType', 'next');
      //进度条归零
      this.setData({
        progress: 0,
        progressTime: '00:00'
      })
    })
  },

  changePlayStatus(isPlay) {
    this.setData({
      isPlay
    });
    app.globalData.isMusicPlay = isPlay;
  },
  //音乐静态样式控制
  handleMusicPlay() {
    let isplay = !this.data.isPlay;
    console.log(isplay);
    this.musicControl(isplay, this.mid);
  },
  //音乐播放控制
  musicControl(isPlay, musicId) {
    if (isPlay) {
      if (this.bgAudioManager.src == undefined || app.globalData.musicId != musicId) {
        this.getSongDetail(musicId);
        this.bgAudioManager.src = this.data.songurl.url;
        this.bgAudioManager.title = this.data.song.name;
      }
      else{
        this.bgAudioManager.play();
      }
    } else {
      this.bgAudioManager.pause();
    }
    // if (isPlay) {
    //   this.bgAudioManager.src = this.data.songurl.url;
    //   this.bgAudioManager.title = this.data.song.name
    // } else {
    //   this.bgAudioManager.pause();
    // }
  },
  //获取歌曲信息
  getSongDetail(id) {
    utilrequest("/song/detail", {
      ids: id
    }, "GET", (res) => {
      if (res.code == '200') {
        this.setData({
          song: res.songs[0],
          durationTime: filter.formatTime(res.songs[0].dt),
          duration: Math.round(res.songs[0].dt / 1000)
        });
      }
    }, (err) => {
      console.log(err);
    })
    this.setData({
      duration: Math.ceil(this.bgAudioManager.duration)
    })
  },
  //获取歌曲播放地址
  getSongUrl(id, isPlay) {
    utilrequest("/song/url", {
      id: id
    }, "GET", (res) => {
      if (res.code == '200') {
        this.setData({
          songurl: res.data[0]
        })
        if (isPlay) {
          this.musicControl(isPlay, id);
        }
      }
    }, (err) => {
      console.log(err);
    })
  },
  //切换歌曲
  handleSwitch(event) {
    let type = event.currentTarget.id;
    //关闭当前播放的音乐
    this.bgAudioManager.stop();
    PubSub.subscribe('musicId', (msg, musicId) => {
      console.log(musicId);
      this.getSongDetail(musicId);
      this.getSongUrl(musicId, true);
      //取消订阅
      PubSub.unsubscribe('musicId');
    })
    //发布消息给recommendSong页面
    PubSub.publish('switchType', type);
  },

  //循环计时
  countTimeDown(that, manager, cancel) {
    if (that.data.isPlay) {
      let ctime = Math.round(manager.currentTime);
      setTimeout(function () {
        that.setData({
          progress: ctime,
          progressTime: filter.formatTime(ctime * 1000)
        })
        that.countTimeDown(that, manager);
      }, 1000)
    }
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
    this.countTimeDown(this, this.bgAudioManager);
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