import {
    elements
} from '../base';
//<use href="img/icons.svg#icon-heart-outlined"></use>


export const likeBtnnToggle = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`)
};


export const toggleLikeView = numberOfLikes => {
    elements.likesField.getElementsByClassName.visibility = numberOfLikes > 0 ? 'visible' : 'hidden';
};