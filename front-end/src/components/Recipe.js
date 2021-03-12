import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadRecipe } from "../actionCreators/recipeActionCreators";
import { Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PieChart from "./PieChart";

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
	main: {
		padding: "0 36px 0 0 !important",
	},
	infoPanel: {
		// border: "3px solid #378E3C",
		// borderRadius: "5px",
		padding: "0 !important",
	},
}));

const Recipe = () => {
	const classes = useStyles();
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
		<div className={classes.root}>
			{currentRecipe ? (
				<>
					<Typography variant="h3">{currentRecipe.recipe.title}</Typography>
					<Grid container spacing={3} className={classes.grid}>
						<Grid item md={8} className={classes.main}>
							<img src={currentRecipe.recipe.image} className={classes.image} />
							<Button>I ate this</Button>
							<Button>Bookmark</Button>
							<h2>Steps: </h2>
							<ol>
								{currentRecipe.instructions.steps.map((step) => (
									<li key={step.number}>{step.step}</li>
								))}
							</ol>
						</Grid>
						<Grid item md={4} className={classes.infoPanel}>
							<PieChart
								title="Caloric Breakdown"
								caloricBreakdown={
									currentRecipe.recipe.nutrition.caloricBreakdown
								}
							/>
						</Grid>
					</Grid>
				</>
			) : null}
		</div>
	);
};

export default Recipe;
