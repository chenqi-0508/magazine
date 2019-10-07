//index.js
//获取应用实例
const app = getApp()

import {
  IndexModels
} from '../../models/indexModel.js'
const indexModels = new IndexModels();

import {
  random
} from '../../utils/random.js'

Page({
  data: {
    recommendInfo: [],
    markList: [],
    articleList: {},
    getMore: '',
    magazineId: 0,
    loading: true,

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //获取数据
    this.getData();
    // wx.showLoading();



    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getData(magazineId) {
    //1. 首页推荐详情
    const recommendInfo = indexModels.getRecommendInfo(magazineId);
    //2. 首页标记标签列表
    const markList = indexModels.getMarkList(magazineId);
    //3. 首页文章列表
    const articleList = indexModels.getArticleList(magazineId);
    Promise.all([recommendInfo, markList, articleList]).then(res => {
      console.log(res);
      // wx.hideLoading();
      this.hiddenLoading();
      this.setData({
        recommendInfo: res[0],
        markList: res[1],
        articleList: res[2]
      })
    })
  },
  onReachBottom() {
    this.setData({
      getMore: random(20)
    })
  },
  // lower() {
  //   this.setData({
  //     getMore: random(20)
  //   })
  // }

  onCatalog() {
    wx.switchTab({
      url: '/pages/catalog/catalog'
    })
  },
  hiddenLoading() {
    this.setData({
      loading: false
    })
  },
  //点击导航栏触发事件
  onNav(e) {
    const magazineId = e.detail.index;
    this.setMagazineId(magazineId);
    this.resetData();
    this.scrollPageToTop();
    this.getData(magazineId);
  },

  resetData() {
    this.setData({
      recommendInfo: [],
      markList: [],
      articleList: {}
    })
  },
  scrollPageToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },
  setMagazineId(magazineId) {
    this.setData({
      magazineId: magazineId
    })
  }
})