// Global app controller
import Search from '../models/Search';
import Recipe from '../models/Recipe';
import {
    elements,
    htmlTagNames,
    renderSpinnerLoader,
    clearRenderSpinnerLoader
} from '../base'
import * as searchView from '../views/searchView';

// global state of the app
const state = {};

/**
 * Search golobal Controller
 */
const controlSearch = async () => {
    const query = searchView.getInput();
    console.log(`you wrote ${query}`);

    if (query) {
        state.search = new Search(query);

        renderSpinnerLoader(elements.searchResults);
        searchView.clearInput();
        searchView.clearHtml();

        await state.search.getResults();

        clearRenderSpinnerLoader();
        searchView.renderResults(state.search.result);

    }

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.resultPagination.addEventListener('click', e => {
    const btn = e.target.closest(htmlTagNames.btnInline)
    console.log(btn);
    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.clearHtml();

        searchView.renderResults(state.search.result, gotoPage);
        console.log(gotoPage);
    }
});


/**
 * Recipe golobal Controller
 */


const controlRecipe =async () => {
    const id = window.location.hash.replace("#", "");
    console.log(id);
    if (id) {
        state.recipe = new Recipe(id);
        await state.recipe.getRecipe()
        state.recipe.calcServings();
        state.recipe.calcCockingTime();
    }

    console.log(state.recipe);
};

window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load", controlRecipe);
