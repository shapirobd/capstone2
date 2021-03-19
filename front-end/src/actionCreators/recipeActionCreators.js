import axios from "axios";
import {
	LOAD_FEED,
	LOAD_RECIPE,
	FILTER_FEED,
	FILTER_BY_INGREDIENTS,
} from "../components/actionTypes";
import createMacrosParams from "../helpers/createMacrosParams";

export const loadFeed = (page = 1, keywords = null) => {
	return async (dispatch) => {
		try {
			console.log(keywords);
			const recipes = await axios.get(
				"https://api.spoonacular.com/recipes/complexSearch",
				{
					params: {
						apiKey: "73baf9bb95a14f5fb4d71e2f12ab8479",
						offset: 40 * (page - 1),
						number: 40,
						query: keywords,
					},
				}
			);
			console.log(recipes.data);
			dispatch(loadedFeed(recipes.data, page));
		} catch (e) {
			console.error(e);
		}
	};
};

const loadedFeed = (data, page) => {
	return {
		type: LOAD_FEED,
		payload: { recipes: data.results, totalResults: data.totalResults, page },
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
			const { diets, macros, recipeName } = filterData;
			const macrosParams = createMacrosParams(macros);
			const dietsParams = diets.join(",");
			console.log(macrosParams);
			const recipes = await axios.get(
				"https://api.spoonacular.com/recipes/complexSearch",
				{
					params: {
						apiKey: "73baf9bb95a14f5fb4d71e2f12ab8479",
						offset: 0,
						number: 40,
						diet: dietsParams,
						...macrosParams,
						query: recipeName,
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

export const getRecipesByIngredients = (ingredients) => {
	return async (dispatch) => {
		try {
			const ingredientsParams = ingredients.join(",");
			const recipes = await axios.get(
				"https://api.spoonacular.com/recipes/findByIngredients",
				{
					params: {
						apiKey: "73baf9bb95a14f5fb4d71e2f12ab8479",
						offset: 0,
						number: 6900,
						ingredients: ingredientsParams,
					},
				}
			);
			dispatch(
				filteredFeed({ results: recipes.data, totalResults: recipes.length })
			);
		} catch (e) {
			console.error(e);
		}
	};
};

// export const getRecipesByKeywords = (keywords) => {
// 	return async (dispatch) => {
// 		try {
// 			const ingredientsParams = ingredients.join(",");
// 			const recipes = await axios.get(
// 				"https://api.spoonacular.com/recipes/findByIngredients",
// 				{
// 					params: {
// 						apiKey: "73baf9bb95a14f5fb4d71e2f12ab8479",
// 						offset: 0,
// 						number: 6900,
// 						query: keywords,
// 					},
// 				}
// 			);
// 			dispatch(
// 				filteredFeed({ results: recipes.data, totalResults: recipes.length })
// 			);
// 		} catch (e) {
// 			console.error(e);
// 		}
// 	};
// };

// const gotRecipesByIngredients = (results) => {
// 	return {
// 		type: FILTER_BY_INGREDIENTS,
// 		payload: { recipes: data.results, totalResults: data.totalResults },
// 	};
// };
