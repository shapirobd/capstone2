import axios from "axios";
import { LOAD_FEED, LOAD_RECIPE, FILTER_FEED } from "../components/actionTypes";
import createMacrosParams from "../helpers/createMacrosParams";

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
	console.log("2: ", recipeId);
	return async (dispatch) => {
		try {
			const recipe = await axios.get(
				`https://api.spoonacular.com/recipes/${recipeId}/information`,
				{
					params: {
						apiKey: "73baf9bb95a14f5fb4d71e2f12ab8479",
						includeNutrition: true,
					},
				}
			);
			const instructions = await axios.get(
				`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`,
				{
					params: {
						apiKey: "73baf9bb95a14f5fb4d71e2f12ab8479",
						stepBreakdown: true,
					},
				}
			);
			dispatch(loadedRecipe(recipe.data, instructions.data[0]));
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

export const filterFeed = (filterData) => {
	return async (dispatch) => {
		try {
			const { diets, macros } = filterData;
			const macrosParams = createMacrosParams(macros);
			console.log(macrosParams);
			const recipes = await axios.get(
				"https://api.spoonacular.com/recipes/complexSearch",
				{
					params: {
						apiKey: "73baf9bb95a14f5fb4d71e2f12ab8479",
						offset: 0,
						number: 30,
						...macrosParams,
					},
				}
			);
			console.log(recipes.data);
			dispatch(filteredFeed(recipes.data));
		} catch (e) {
			console.error(e);
		}
	};
};

const filteredFeed = (data) => {
	return {
		type: FILTER_FEED,
		payload: { recipes: data.results, totalResults: data.totalResults },
	};
};
