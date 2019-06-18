// Global app controller
import Search from '../models/Search';
import * as constants from '../constants'
import * as searchView from '../views/searchView';

// global state of the app
const state = {};

const controlSearch = async () => {
    const query = "pizza";
    if (query) {
        state.search = new Search(query);
        await state.search.getResults();
        console.log(state.search);
    }
    
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
