import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	bookmarkRecipe,
	unbookmarkRecipe,
} from "../../actionCreators/bookmarkActionCreators";
import {
	addEatenMeal,
	removeEatenMeal,
} from "../../actionCreators/trackerActionCreators";
import { useStyles } from "./styles/RecipeStyles";
import PieChart from "./PieChart";
import NutrientList from "./NutrientList";
import DietList from "./DietList";
import RecipeSteps from "./RecipeSteps";
import { generateMacros } from "../../helpers/generateMacros";
import { Typography, Grid, Button, ButtonGroup } from "@material-ui/core";
import axios from "axios";
import convertDate from "../../helpers/convertDate";

const Recipe = () => {
	const classes = useStyles();
	const { recipeId } = useParams();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const bookmarks = useSelector((state) => state.user.bookmarks);
	const eatenMeals = useSelector((state) => state.user.eatenMeals);

	console.log(user);

	const [isBookmarked, setIsBookmarked] = useState(
		bookmarks.includes(+recipeId)
	);
	const [isEaten, setIsEaten] = useState(
		eatenMeals[convertDate()].includes(+recipeId)
	);

	const [currentRecipe, setCurrentRecipe] = useState(null);

	const toggleEaten = () => {
		if (!isEaten) {
			dispatch(
				addEatenMeal(user.username, currentRecipe.recipe.id, convertDate())
			);
		} else {
			dispatch(
				removeEatenMeal(user.username, currentRecipe.recipe.id, convertDate())
			);
		}
		setIsEaten(!isEaten);
	};

	const toggleBookmarked = () => {
		if (!isBookmarked) {
			dispatch(bookmarkRecipe(user.username, currentRecipe.recipe.id));
		} else {
			dispatch(unbookmarkRecipe(user.username, currentRecipe.recipe.id));
		}
		setIsBookmarked(!isBookmarked);
	};

	useEffect(() => {
		const getRecipe = async () => {
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
				setCurrentRecipe({
					recipe: recipe.data,
					instructions: instructions.data,
				});
			} catch (e) {
				console.error(e);
			}
		};
		getRecipe();
	}, [recipeId]);

	return (
		<div className={classes.root}>
			{currentRecipe ? (
				<>
					<Typography variant="h4">{currentRecipe.recipe.title}</Typography>
					<Grid container spacing={3} className={classes.grid}>
						<Grid item xs={12} md={8} className={classes.main}>
							<img
								src={currentRecipe.recipe.image}
								className={classes.image}
								alt={currentRecipe.recipe.image}
							/>
							<ButtonGroup fullWidth className={classes.buttonGroup}>
								<Button className={classes.button} onClick={toggleEaten}>
									{isEaten
										? "Remove from today's meals"
										: "Add to today's meals"}
								</Button>
								<Button className={classes.button} onClick={toggleBookmarked}>
									{isBookmarked ? "Unbookmark" : "Bookmark"}
								</Button>
							</ButtonGroup>
							{currentRecipe.instructions.length ? (
								<RecipeSteps steps={currentRecipe.instructions[0].steps} />
							) : null}
						</Grid>
						<Grid item xs={12} md={4} className={classes.infoPanel}>
							<DietList diets={currentRecipe.recipe.diets} />
							<PieChart
								title="Caloric Breakdown"
								caloricBreakdown={
									currentRecipe.recipe.nutrition.caloricBreakdown
								}
							/>
							<NutrientList
								title="Macronutrients"
								data={generateMacros(currentRecipe.recipe.nutrition.nutrients)}
							></NutrientList>
						</Grid>
					</Grid>
				</>
			) : null}
		</div>
	);
};

export default Recipe;
