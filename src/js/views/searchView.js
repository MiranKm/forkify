import {
    elements
} from './base'

export const getInput = () => {
    return elements.searchInput.value;
}

export const clearInput = () => {
    elements.searchInput.value = "";
};

const limitRecipeTitle = (title, limit = 17) => {
    const titleHolder = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, currrent) => {
            if (acc + currrent.length >= limit) {
                titleHolder.push(currrent);
            }
            return acc + currrent.length;
        }, 0);
        return `${titleHolder.join(" ")} ...`;
    }
    return title;
}

export const clearHtml = () => {
    elements.searchResultList.innerHTML = "";
};

const renderRecipe = recipe => {
    const markUp = ` 
    <li>
        <a class="results__link " href="${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${limitRecipeTitle(recipe.title)}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
    elements.searchResultList.insertAdjacentHTML('beforeend', markUp);

}
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = 1;
    const end = 10;
    
    recipes.forEach(renderRecipe);
}