export const htmlTagNames = {
    searchField: '.search__field',
    searchForm: '.search',
    searchResultList: '.results__list',
    searchResult: '.results',
    loader:'loader',
    resultPagination:'.results__pages',
    btnInline:'.btn-inline',
    recipeDetails:'.recipe',


};

export const constants = {
    baseApiLinkSearch: "https://www.food2fork.com/api/search?key=",
    API_KEY: "3fdba3d2309da661bd3f278b40839766",
    baseApiLinkRecipe: "https://www.food2fork.com/api/get?key="

};

export const elements = {
    searchInput: document.querySelector(htmlTagNames.searchField),
    searchForm: document.querySelector(htmlTagNames.searchForm),
    searchResultList: document.querySelector(htmlTagNames.searchResultList),
    searchResults: document.querySelector(htmlTagNames.searchResult),
    resultPagination:document.querySelector(htmlTagNames.resultPagination),
    recipeDetails:document.querySelector(htmlTagNames.recipeDetails)
};

export const renderSpinnerLoader = parent => {
    const loader = `
    <div class="${htmlTagNames.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearRenderSpinnerLoader = () => {
    const loader= document.querySelector(`.${htmlTagNames.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}
