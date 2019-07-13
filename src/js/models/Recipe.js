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

    parseIngredients() {
        const unitLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'coupes', 'pounds'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'cup', 'pound'];
        const units = [...unitShort, 'kg', 'g'];

        const newIngredient = this.ingredients.map(element => {
            let ingredient = element.toLowerCase();
            unitLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i]);
            });

            ingredient = ingredient.replace(/ *\([^]*\)*/g, '');
            const arrIng = ingredient.split(' ');

            // find loops through an array and includes check the exisitinse of that element in th loop returns a true or false depending if it finds it or not
            const unitIndex = arrIng.findIndex((element2) => units.includes(element2));
            let objIngredient;
            let count;

            if (unitIndex > -1) {

                const arrayCount = arrIng.slice(0, unitIndex);
                if (arrayCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count=eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIngredient={
                    count,
                    unit:arrIng[unitIndex],
                    ingredient:arrIng.slice(unitIndex+1).join(' ')
                }

            } else if (parseInt(arrIng[0], 10)) {
                objIngredient = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }

            } else if (unitIndex === -1) {
                // there is no unit
                objIngredient = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIngredient;

        });
        this.ingredients = newIngredient;
    }


}