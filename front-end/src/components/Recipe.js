import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { loadRecipe } from "../actionCreators/recipeActionCreators";
import {
	bookmarkRecipe,
	unbookmarkRecipe,
} from "../actionCreators/bookmarkActionCreators";
import { makeStyles } from "@material-ui/core/styles";
import PieChart from "./PieChart";
import NutrientList from "./NutrientList";
import DietList from "./DietList";
import RecipeSteps from "./RecipeSteps";
import { generateMacros } from "../helpers/generateMacros";
import { Typography, Grid, Button, ButtonGroup } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(() => ({
	root: {
		margin: "0 75px",
	},
	grid: {
		margin: "20px 0",
	},
	image: {
		width: "100%",
	},
	buttonGroup: {
		margin: "15px 0",
	},
	button: {
		color: "#fff",
		backgroundColor: "#4caf50",
		border: "1px solid #fff",
		"&:hover": {
			backgroundColor: "#81c784",
		},
	},
	main: {
		padding: "0 36px 0 0 !important",
	},
	infoPanel: {
		padding: "0 !important",
	},
}));

const Recipe = () => {
	const classes = useStyles();
	const { recipeId } = useParams();
	const user = useSelector((state) => state.user);
	console.log(user);

	const [isBookmarked, setIsBookmarked] = useState(false);
	const [currentRecipe, setCurrentRecipe] = useState(null);

	const toggleBookmarked = () => {
		if (!isBookmarked) {
			bookmarkRecipe(user.username, currentRecipe.recipe.id);
		} else {
			unbookmarkRecipe(user.username, currentRecipe.recipe.id);
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
	}, []);

	console.log(currentRecipe);

	return (
		<div className={classes.root}>
			{currentRecipe ? (
				<>
					<Typography variant="h3">{currentRecipe.recipe.title}</Typography>
					<Grid container spacing={3} className={classes.grid}>
						<Grid item xs={12} md={8} className={classes.main}>
							<img src={currentRecipe.recipe.image} className={classes.image} />
							<ButtonGroup fullWidth className={classes.buttonGroup}>
								<Button className={classes.button}>I ate this</Button>
								<Button className={classes.button} onClick={toggleBookmarked}>
									{isBookmarked ? "Unbookmark" : "Bookmark"}
								</Button>
							</ButtonGroup>
							<RecipeSteps steps={currentRecipe.instructions[0].steps} />
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
