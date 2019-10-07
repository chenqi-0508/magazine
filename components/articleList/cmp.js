// components/articleList/cmp.js
import {
  IndexModels
} from '../../models/indexModel.js'
const indexModels = new IndexModels();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    articleList: Array,
    more: {
      type: String,
      value: '',
      observer: 'loadMore'
    },
    magazineId: {
      type: Number,
      value: 0,
      observer: 'hasMoreData'
    },
    noMoreData: Boolean,
    hidden: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    //加锁
    loading: false,
    //没有更多数据
    noMoreData: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (this._isLock() || this.data.noMoreData) {
        return;
      }
      this._loadLock();
      const magazineId = this.data.magazineId;
      let start = this.data.articleList.length;
      indexModels.getArticleList(magazineId, start).then(res => {
        this._setMoreData(res);
        this._loadLock();
      })
    },
    //切换主题时
    hasMoreData() {
      this.setData({
        noMoreData: false
      })
    },
    //加锁
    _isLock() {
      return this.data.loading;
    },
    _loadLock() {
      this.setData({
        loading: !this.data.loading
      })
    },
    //获取更多数据
    _setMoreData(list) {
      if (list.length == 0) {
        this.data.noMoreData = true;
        this.setData({
          noMoreData: true
        })
      }
      const combineList = this.data.articleList.concat(list);
      this.setData({
        articleList: combineList
      })
    }
  }
})