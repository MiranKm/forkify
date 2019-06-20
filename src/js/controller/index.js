// Global app controller
import Search from '../models/Search';
import {
    elements,
    renderSpinnerLoader,
    clearRenderSpinnerLoader
} from '../views/base'
import * as searchView from '../views/searchView';

// global state of the app
const state = {};

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