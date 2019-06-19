import axios from 'axios';
import {constants} from '../views/base'


export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        try {
            const res = await axios(`${constants.baseApiLink}${constants.API_KEY}&q=${this.query}`);
            this.result = res.data.recipes
        } catch (error) {
            console.log(error);
        }
    }
}