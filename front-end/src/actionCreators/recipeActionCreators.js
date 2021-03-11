import axios from "axios";
import { LOAD_FEED, LOAD_RECIPE, LOGIN } from "../components/actionTypes";

export const loadFeed = (page) => {
	return async (dispatch) => {
		try {
			const recipes = await axios.get(
				"https://api.spoonacular.com/recipes/complexSearch",
				{
					params: {
						apiKey: "73baf9bb95a14f5fb4d71e2f12ab8479",
						offset: 30 * (page - 1),
						number: 30,
					},
				}
			);
			console.log(recipes.data);
			dispatch(loadedFeed(recipes.data));
		} catch (e) {
			console.error(e);
		}
	};
};

const loadedFeed = (data) => {
	return {
		type: LOAD_FEED,
		payload: { recipes: data.results, totalResults: data.totalResults },
	};
};

export const loadRecipe = (recipeId) => {
	return async (dispatch) => {
		try {
			const recipe = await axios.get(
				`https://api.spoonacular.com/recipes/${recipeId}/information`,
				{
					params: {
						apiKey: "73baf9bb95a14f5fb4d71e2f12ab8479",
					},
				}
			);
			const instructions = await axios.get(
				`https://api.spoonacular.com/recipes/{id}/analyzedInstructions`,
				{
					params: {
						stepBreakdown: true,
					},
				}
			);
			dispatch(loadedRecipe(recipe.data, instructions.data));
		} catch (e) {
			console.error(e);
		}
	};
};

const loadedRecipe = (recipe, instructions) => {
	return {
		type: LOAD_RECIPE,
		payload: { currentRecipe: { recipe, instructions } },
	};
};
