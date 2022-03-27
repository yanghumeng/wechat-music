// components/video/video-list/video-list.js
Component({
  
  /**
   * 组件的属性列表
   */
  properties: {
    videolists: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    videoId:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    videoPlayHandle(e) {
      let id = e.currentTarget.id;
      this.setData({
        videoId:id
      });
      let newVideo = wx.createVideoContext(id,this);
        console.log("newvideo:" + JSON.stringify(newVideo));
        newVideo.id = id;
        if (!this.video) {
          this.video = newVideo;
          this.video.play();
          console.log(JSON.stringify(this.video) + "播放");
          return
        }
        if (this.video.id !== newVideo.id) {
          console.log("切换视频主体");
          newVideo.play();
          console.log("目前视频主体播放");
          this.video.pause();
          console.log("之前视频主体暂停");
          this.video = newVideo;
          console.log("播放主体切换");
        }
    }
  }
})