import axio from 'axios';
import {
    constants
} from '../base'

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const rec = await axio(`${constants.baseApiLinkRecipe}${constants.API_KEY}&rId=${this.id}`);
            this.recipe = rec.data.recipe;
            this.title = rec.data.recipe.title;
            this.author = rec.data.recipe.publisher;
            this.image = rec.data.recipe.image_url;
            this.url = rec.data.recipe.source_url;
            this.ingredients = rec.data.recipe.ingredients;
            console.log(rec);
        } catch (error) {
            console.log(error);
        }
    }

    calcCockingTime() {
        const numberIng = this.ingredients.length;
        const periods = Math.ceil(numberIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }
}