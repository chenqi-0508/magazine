// components/subscribe/cmp.js
import {
  SubscribeModel
} from '../../models/subscribeModel.js'
const subscribeModel = new SubscribeModel();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tagObj: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    class: 'common'
  },
  attached() {
    this.renderTagList();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    renderTagList() {
      const tagObj = this.properties.tagObj;
      const tagFlag = subscribeModel.renderTagList(tagObj);
      if (tagFlag) {
        //切换订阅状态
        this.triggerClass();
      }
    },
    onTap() {
      const tagObj = this.properties.tagObj;
      if (this.data.class == 'common') {
        //放入缓存
        subscribeModel.setTagList(tagObj);
      } else {
        //移除缓存
        subscribeModel.removeTagList(tagObj);
      }
      //切换订阅状态
      this.triggerClass();
    },
    triggerClass() {
      let className = '';
      if (this.data.class == 'common') {
        className = 'subscribe';
      } else {
        className = 'common';
      }
      this.setData({
        class: className
      })
    }
  }
})