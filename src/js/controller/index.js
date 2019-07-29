// Global app controller
import Search from '../models/Search';
import Recipe from '../models/Recipe';
import List from '../models/List';
import {
    elements,
    htmlTagNames,
    renderSpinnerLoader,
    clearRenderSpinnerLoader
} from '../base'
import * as searchView from '../views/searchView';
import * as recipeView from '../views/recipeView';
import * as listView from '../views/listView';
import Like from '../models/Like';

// global state of the app
const state = {};

/**
 * Search golobal Controller
 */
const controlSearch = async () => {
    const query = searchView.getInput();

    if (query) {
        state.search = new Search(query);

        renderSpinnerLoader(elements.searchResults);
        searchView.clearInput();
        searchView.clearHtml();

        await state.search.getResults();

        clearRenderSpinnerLoader();

        console.log(state.search.result);
        if (state.search.result.length > 0)
            searchView.renderResults(state.search.result);
        else
            searchView.doesnotExist()

    }

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.resultPagination.addEventListener('click', e => {
    const btn = e.target.closest(htmlTagNames.btnInline)
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

const controlRecipe = async () => {
    const id = window.location.hash.replace("#", "");
    recipeView.clearRecipe();

    if (state.search)
        searchView.highlightSelected(id);

    if (id) {
        renderSpinnerLoader(elements.recipeDetails);
        state.recipe = new Recipe(id);
        await state.recipe.getRecipe()

        state.recipe.parseIngredients();
        state.recipe.calcServings();
        state.recipe.calcCockingTime();

        clearRenderSpinnerLoader();
        recipeView.renderRecipe(state.recipe)
    }

};


/**
 * Recipe View
 */

window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load", controlRecipe);


const controlList = () => {
    if (!state.list) state.list = new List();
    state.recipe.ingredients.forEach(element => {
        const item = state.list.addItem(element.count, element.unit, element.ingredient);
        listView.renderItem(item);
    });
}
elements.shoppingList.addEventListener('click', (e) => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    console.log(id);

    if (e.target.matches('.shopping__delete, .shopping__delete * ')) {
        state.list.deleteItem(id);
        list.listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        const value = parseFloat(e.target.value);
        state.list.updateCount(id, value);
    }
});


const controlLike = () => {
    if (!state.like) state.like = new Like();
    const currentId = state.recipe.id;
    if (!state.like.isLiked(currentId)) {
        const newLik = state.like.addLike(currentId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.image);

    } else {
        state.like.deleteLike(currentId);
    }
    console.log(state.like);
};



elements.recipeDetails.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease * ')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServings(state.recipe)
        }
    } else if (e.target.matches('.btn-increase, .btn-increase * ')) {
        state.recipe.updateServings('inc');
        recipeView.updateServings(state.recipe)
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add * ')) {
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love * ')) {
        controlLike();
    }
});