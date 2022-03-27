// components/common/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    // 跳转至搜索界面
    toSearch() {
      wx.navigateTo({
        url: '/pages/search/search'
      })
    },
    qiandao(){
      wx.showToast({
        title: '签到成功',
        icon:'success'
      })
    }
  }
})