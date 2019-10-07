// components/recommend/cmp.js
import {getDate} from '../../utils/date.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgSrc: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: getDate()
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
