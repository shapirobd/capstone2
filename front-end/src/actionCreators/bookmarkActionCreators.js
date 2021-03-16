import axios from "axios";
import { BOOKMARK_RECIPE } from "../components/actionTypes";

const API_URL = "http://localhost:5000";

export const bookmarkRecipe = async (username, recipeId) => {
	await axios.post(`${API_URL}/users/bookmarkRecipe`, {
		username,
		recipeId,
	});
};

export const unbookmarkRecipe = async (username, recipeId) => {
	await axios.post(`${API_URL}/users/unbookmarkRecipe`, {
		username,
		recipeId,
	});
};

export const getAllBookmarks = async (username) => {
	await axios.get(`${API_URL}/users/getAllBookmarks`, {
		username,
	});
};
