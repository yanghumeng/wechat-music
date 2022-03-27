// components/rank/rank-musci-list/rank-music-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicitem:Object,
    listid:Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleToList(listid){
      // uni.navigateTo({
      //   url:"../../pages/list/list?id="+listid
      // })
    }
  }
})
