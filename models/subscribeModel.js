class SubscribeModel {
    setTagList(tagObj) {
        const tagList = this.getTagList('tagList') || [];
        tagList.push(tagObj);
        wx.setStorageSync('tagList', tagList);
    }
    getTagList() {
        return wx.getStorageSync('tagList');
    }
    removeTagList(tagObj) {
        let myIndex = 0;
        const tagList = this.getTagList('tagList') || [];
        tagList.forEach((ele, index) => {
            if (ele.tagId == tagObj.tagId) {
                myIndex = index;
                tagList.splice(myIndex, 1);
            }
        })
        wx.setStorageSync('tagList', tagList);
    }
    renderTagList(tagObj) {
        let tagFlag = false;
        const tagList = this.getTagList();
        tagList.forEach((ele, index) => {
            if (ele.tagId == tagObj.tagId) {
                tagFlag = true;
            }
        })
        return tagFlag;
    }
}

export {
    SubscribeModel
}