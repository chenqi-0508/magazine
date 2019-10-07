class LikeModle {
    getLikeList() {
        return wx.getStorageSync('likeList') || [];
    }
    setLikeList(likeList) {
        wx.setStorageSync('likeList', likeList);
    }
    addLikeList(articleDetail) {
        const likeList = this.getLikeList();
        likeList.unshift(articleDetail);
        this.setLikeList(likeList);
    }
    removeLikeList(artId) {
        const likeList = this.getLikeList();
        likeList.forEach((ele, index) => {
            if (ele.artId == artId) {
                likeList.splice(index, 1);
            }
        })
        this.setLikeList(likeList);
    }
    getLikeStatus(artId) {
        let likeStatus = false;
        const likeList = this.getLikeList();
        likeList.forEach((ele, index) => {
            if (ele.artId == artId) {
                likeStatus = true;
            }
        })
        return likeStatus;
    }
}

export {
    LikeModle
}