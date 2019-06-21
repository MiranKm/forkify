import axios from 'axios';
import {constants} from '../base'


export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        try {
            const res = await axios(`${constants.baseApiLinkSearch}${constants.API_KEY}&q=${this.query}`);
            this.result = res.data.recipes
        } catch (error) {
            console.log(error);
        }
    }
}