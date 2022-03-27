// components/video/swiper-tab-head.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabBars: Array,
    tabIndex: Number,
    scrollStyle: {
      type: String,
      default: ""
    },
    scrollItemStyle: {
      type: String,
      default: ""
    }
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
    //点击切换导航
    tabtap(index) {
      // this.tabIndex = index;
      this.$emit('tabtap', index)
    }
  }
})