export default class Like {
    constructor() {
        this.like = [];
    }


    addLike(id, title, author, image) {
        const item = {
            id,
            title,
            author,
            image
        };
        this.like.push(item);
        return item;
    }


    deleteLike(id) {
        const index = this.like.findIndex(el => el.id === id);
        this.like.splice(index, 1);
    }


    isLiked(id) {
        return this.like.findIndex(el => el.id === id) !== -1;
    }

    getNumberLikes() {
        return this.like.length;
    }
}