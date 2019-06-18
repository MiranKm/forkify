import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        const api_key = "3fdba3d2309da661bd3f278b40839766";
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${api_key}&q=${this.query}`);
            this.result = res.data.recipes
            if (this.result == undefined)
                this.result = "Limit Reached"
        } catch (error) {
            console.log(error);
        }
    }
}