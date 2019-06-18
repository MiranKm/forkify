// Global app controller
import Search from '../models/Search';
import * as searchView from '../views/searchView';

// global state of the app
const state = {
        
}

const search = new Search('pizza');
search.getResults();
console.log(search);