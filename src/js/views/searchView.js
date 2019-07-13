import {
    elements,
    htmlTagNames
} from '../base';

export const getInput = () => {
    return elements.searchInput.value;
};

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
};

export const clearHtml = () => {
    elements.searchResultList.innerHTML = "";
    elements.resultPagination.innerHTML = "";

};

const renderRecipe = recipe => {
    const markUp = ` 
    <li>
        <a class="results__link " href="#${recipe.recipe_id}">
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

};

/**
 *   <button class="btn-inline results__btn--prev">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-left"></use>
                    </svg>
                    <span>Page 1</span>
                </button>
                <button class="btn-inline results__btn--next">
                    <span>Page 3</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>
                </button>
 */


const createPaginationButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page-1:page+1}">
    
    <span>Page ${type === 'prev' ? page-1:page+1}</span><svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? "left":"right"}"></use>
            </svg>
    </button>
`;


const renderPaginationButton = (page, numberResult, resPerPage) => {
    /**
     * we use round because the api might give us an odd number the divistion will
     * give us a double number we use Math.ceil to fix that
     * it adds the number to the closesst to it
     * 4.4 will be rounded to 5 
     */
    const pages = Math.ceil(numberResult / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        button = createPaginationButton(page, 'next');
    } else if (page < pages) {
        button = `
        ${createPaginationButton(page, 'next')} 
        ${createPaginationButton(page, 'prev')}
        `;
    } else if (page === pages && pages > 1) {
        button = createPaginationButton(page, 'prev');

    }
    elements.resultPagination.insertAdjacentHTML('afterbegin', button);

};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    /**
     * the page is 1-1 = 0,  0* resPerPage which is 10 = 0  
     * and the start will be 0
     * the end page is 1 the resPerPage is 10 1*10 = 10 and slice  doens't include 
     * the  end arrgument so it will be 9 
     * 
     * page 2 when page goes to (2 -1 )* 10 = 10 that is what we want because before we didn't
     * see 10 we only saw 9 
     *  end 2 *10 =20 we will see 19 because of slice! 
     * 
     */

    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    renderPaginationButton(page, recipes.length, resPerPage);
};



export const highlightSelected = id => {
    const resutlsArray= Array.from(document.querySelectorAll('.resutls__link'));

    resutlsArray.forEach(element=>{
        element.classList.remove(' result__link--active');
    });
    document.querySelector(`a[href="#${id}"]`).classList.add(' result__link--active');
}