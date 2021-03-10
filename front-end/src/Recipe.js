import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadRecipe } from "./actionCreators/recipeActionCreators";

const Recipe = () => {
	const { recipeId } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadRecipe(recipeId));
	}, []);

	return <h1>Recipe</h1>;
};

export default Recipe;
