
export const htmlTagNames = {
    searchField: '.search__field',
    searchForm: '.search',
    searchResultList:'.results__list'
};

export const constants = {
    baseApiLink: "https://www.food2fork.com/api/search?key=",
    API_KEY: "3fdba3d2309da661bd3f278b40839766",
};

export const elements = {
    searchInput: document.querySelector(htmlTagNames.searchField),
    searchForm: document.querySelector(htmlTagNames.searchForm),
    searchResultList: document.querySelector(htmlTagNames.searchResultList)
};



// 