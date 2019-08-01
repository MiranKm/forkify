import {
    elements
} from '../base';

import {limitRecipeTitle} from './searchView';
//<use href="img/icons.svg#icon-heart-outlined"></use>


export const likeBtnnToggle = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`)
};


export const toggleLikeView = numberOfLikes => {
    elements.likesField.getElementsByClassName.visibility = numberOfLikes > 0 ? 'visible' : 'hidden';
};

export const renderLikes = like => {
    markUp = ` <li>
    <a class="likes__link" href="#${like.link}">
        <figure class="likes__fig">
            <img src="${like.image}" alt="${like.title}">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
            <p class="likes__author">${like.author}</p>
        </div>
    </a>
</li>`;

    elements.likesList.insertAdjacentHTML('beforeend', markUp);
};


export const deleteLike = id => {
    const element = document.querySelector(`.likes__link[href="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
};