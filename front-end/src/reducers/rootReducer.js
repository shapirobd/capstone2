const INITIAL_STATE = {
	feed: [],
	page: 1,
	countPerPage: 40,
	totalResults: null,
	token: null,
	user: null,
	filtered: false,
	currentRecipe: null,
	isIngredientBased: false,
};

const rootReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "LOAD_FEED": {
			const { recipes, totalResults, page } = action.payload;
			return {
				...state,
				feed: recipes,
				totalResults,
				page,
				isIngredientBased: false,
			};
		}
		case "FILTER_FEED": {
			const { recipes, totalResults, page } = action.payload;
			return {
				...state,
				feed: recipes,
				totalResults,
				page,
				isIngredientBased: false,
			};
		}
		case "FILTER_BY_INGREDIENTS": {
			const { recipes, totalResults } = action.payload;
			return {
				...state,
				page: 1,
				feed: recipes,
				totalResults,
				isIngredientBased: true,
			};
		}
		case "CHANGE_PAGE": {
			return { ...state, page: action.payload };
		}
		case "LOAD_RECIPE": {
			const { currentRecipe } = action.payload;
			return { ...state, currentRecipe };
		}
		case "LOGIN": {
			const { token, user } = action.payload;
			return { ...state, token, user };
		}
		case "LOGOUT": {
			return { ...state, user: null, token: null, feed: [] };
		}
		case "EDIT_PROFILE": {
			const { user } = action.payload;
			return { ...state, user };
		}
		case "BOOKMARK_RECIPE": {
			const { recipeId } = action.payload;
			return {
				...state,
				user: {
					...state.user,
					bookmarks: [...state.user.bookmarks, recipeId],
				},
			};
		}
		case "UNBOOKMARK_RECIPE": {
			const { recipeId } = action.payload;
			console.log(recipeId);
			return {
				...state,
				user: {
					...state.user,
					bookmarks: state.user.bookmarks.filter(
						(bookmark) => bookmark !== recipeId
					),
				},
			};
		}
		case "ADD_EATEN_MEAL": {
			const { recipeId, date } = action.payload;
			return {
				...state,
				user: {
					...state.user,
					eatenMeals: {
						...state.user.eatenMeals,
						[date]: [...state.user.eatenMeals[date], recipeId],
					},
				},
			};
		}
		case "REMOVE_EATEN_MEAL": {
			const { recipeId, date } = action.payload;
			console.log(recipeId);
			return {
				...state,
				user: {
					...state.user,
					eatenMeals: {
						...state.user.eatenMeals,
						[date]: state.user.eatenMeals[date].filter(
							(meal) => meal !== recipeId
						),
					},
				},
			};
		}
		default: {
			return state;
		}
	}
};

export default rootReducer;
