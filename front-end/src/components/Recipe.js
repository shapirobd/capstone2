import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadRecipe } from "../actionCreators/recipeActionCreators";

const Recipe = () => {
	const { recipeId } = useParams();
	const dispatch = useDispatch();
	const currentRecipe = useSelector((state) => state.currentRecipe);
	console.log(currentRecipe);

	useEffect(() => {
		const getRecipe = async () => {
			console.log("1. INITIAL RENDER");
			dispatch(loadRecipe(recipeId));
		};
		getRecipe();
	}, []);

	return (
		<div>
			{" "}
			{currentRecipe ? (
				<>
					<h1>{currentRecipe.recipe.title}</h1>
					<img src={currentRecipe.recipe.image} />
					<h2>Steps: </h2>
					<ol>
						{currentRecipe.instructions.steps.map((step) => (
							<li key={step.number}>{step.step}</li>
						))}
					</ol>
				</>
			) : null}
		</div>
	);
};

export default Recipe;
