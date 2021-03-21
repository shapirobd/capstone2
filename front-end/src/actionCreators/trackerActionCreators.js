import axios from "axios";
import { ADD_EATEN_MEAL, REMOVE_EATEN_MEAL } from "../components/actionTypes";

const API_URL = "http://localhost:5000";

export const addEatenMeal = (username, recipeId, date) => {
	return async (dispatch) => {
		try {
			await axios.post(`${API_URL}/users/addEatenMeal`, {
				username,
				recipeId,
				date,
			});
			dispatch(addedEatenMeal(recipeId, date));
		} catch (e) {
			console.error(e);
		}
	};
};

const addedEatenMeal = (recipeId, date) => {
	return {
		type: ADD_EATEN_MEAL,
		payload: {
			recipeId,
			date,
		},
	};
};

export const removeEatenMeal = (username, recipeId, date) => {
	return async (dispatch) => {
		try {
			await axios.post(`${API_URL}/users/removeEatenMeal`, {
				username,
				recipeId,
				date,
			});
			dispatch(removedEatenMeal(recipeId, date));
		} catch (e) {
			console.error(e);
		}
	};
};

const removedEatenMeal = (recipeId, date) => {
	return {
		type: REMOVE_EATEN_MEAL,
		payload: {
			recipeId,
			date,
		},
	};
};
