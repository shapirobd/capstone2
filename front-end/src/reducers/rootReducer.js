const INITIAL_STATE = {
	feed: [],
	page: 1,
	countPerPage: 30,
	totalResults: null,
	token: null,
	user: null,
	currentRecipe: null,
};

const rootReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "LOAD_FEED": {
			const { recipes, totalResults } = action.payload;
			return { ...state, feed: recipes, totalResults };
		}
		case "FILTER_FEED": {
			const { recipes, totalResults } = action.payload;
			return { ...state, page: 1, feed: recipes, totalResults };
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
			return { ...state, user: null, token: null };
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
		default: {
			return state;
		}
	}
};

export default rootReducer;
