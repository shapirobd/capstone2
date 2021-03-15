import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadRecipe } from "../actionCreators/recipeActionCreators";
import { makeStyles } from "@material-ui/core/styles";
import PieChart from "./PieChart";
import NutrientList from "./NutrientList";
import DietList from "./DietList";
import RecipeSteps from "./RecipeSteps";
import { generateMacros } from "../helpers/generateMacros";
import { Typography, Grid, Button, ButtonGroup } from "@material-ui/core";

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
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const currentRecipe = useSelector((state) => state.currentRecipe);
	console.log(currentRecipe);

	const { recipe, instructions } = currentRecipe;
	const { diets } = recipe;
	const { nutrients, caloricBreakdown } = recipe.nutrition;
	const calories = nutrients[0].amount;

	const macronutrients = generateMacros(nutrients);

	useEffect(() => {
		const getRecipe = async () => {
			dispatch(loadRecipe(recipeId, user.api_hash));
		};
		getRecipe();
	}, []);

	return (
		<div className={classes.root}>
			{currentRecipe ? (
				<>
					<Typography variant="h3">{recipe.title}</Typography>
					<Grid container spacing={3} className={classes.grid}>
						<Grid item xs={12} md={8} className={classes.main}>
							<img src={recipe.image} className={classes.image} />
							<ButtonGroup fullWidth className={classes.buttonGroup}>
								<Button className={classes.button}>I ate this</Button>
								<Button className={classes.button}>Bookmark</Button>
							</ButtonGroup>
							<RecipeSteps steps={instructions.steps} />
						</Grid>
						<Grid item xs={12} md={4} className={classes.infoPanel}>
							<DietList diets={diets} />
							<PieChart
								title="Caloric Breakdown"
								caloricBreakdown={caloricBreakdown}
							/>
							<NutrientList
								title="Macronutrients"
								data={macronutrients}
							></NutrientList>
						</Grid>
					</Grid>
				</>
			) : null}
		</div>
	);
};

export default Recipe;
