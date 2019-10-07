// components/article/cmp.js
import {
  LikeModle
} from '../../models/likeModel.js'
const likeModle = new LikeModle();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    articleDetail: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeStatus: false
  },
  attached() {
    let likeStatus = this.data.likeStatus;
    const articleDetail = this.data.articleDetail;
    const artId = articleDetail.artId;

    likeStatus = likeModle.getLikeStatus(artId);
    this.setData({
      likeStatus
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(e) {
      const like = e.detail.like;
      const articleDetail = this.data.articleDetail;
      const artId = articleDetail.artId;
      if (like) {
        likeModle.addLikeList(articleDetail);
      } else {
        likeModle.removeLikeList(artId);
      }
    }
  }
})