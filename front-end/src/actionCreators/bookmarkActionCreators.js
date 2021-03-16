import axios from "axios";
import { BOOKMARK_RECIPE, UNBOOKMARK_RECIPE } from "../components/actionTypes";

const API_URL = "http://localhost:5000";

export const bookmarkRecipe = (username, recipeId) => {
	return async (dispatch) => {
		try {
			await axios.post(`${API_URL}/users/bookmarkRecipe`, {
				username,
				recipeId,
			});
			dispatch(bookmarkedRecipe(recipeId));
		} catch (e) {
			console.error(e);
		}
	};
};

const bookmarkedRecipe = (recipeId) => {
	return {
		type: BOOKMARK_RECIPE,
		payload: {
			recipeId,
		},
	};
};

export const unbookmarkRecipe = (username, recipeId) => {
	return async (dispatch) => {
		try {
			await axios.post(`${API_URL}/users/unbookmarkRecipe`, {
				username,
				recipeId,
			});
			dispatch(unbookmarkedRecipe(recipeId));
		} catch (e) {
			console.error(e);
		}
	};
};

const unbookmarkedRecipe = (recipeId) => {
	return {
		type: UNBOOKMARK_RECIPE,
		payload: {
			recipeId,
		},
	};
};

export const getAllBookmarks = async (username) => {
	const bookmarks = await axios.get(`${API_URL}/users/getAllBookmarks`, {
		username,
	});
	return bookmarks;
};
