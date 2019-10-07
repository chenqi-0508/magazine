import {Request} from '../utils/request.js'

class IndexModels extends Request {
    //3. 首页文章列表
    getArticleList(magazineId=0, start=0) {
        return this.getData(`/getIndexArticleList/${magazineId}/${start}`)
    }
    //2. 首页标记标签列表
    getMarkList(magazineId=0) {
        return this.getData(`/getMarkTypeList/${magazineId}`)
    }
    //1. 首页推荐详情
    getRecommendInfo(magazineId=0) {
        return this.getData(`/getRecommendInfo/${magazineId}`)
    }
}

export {IndexModels}