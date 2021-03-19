import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles/WelcomePageStyles";
import RecipeGrid from "../recipes/RecipeGrid";
import IngredientInput from "./IngredientInput";
import IngredientList from "./IngredientList";

const WelcomePage = () => {
	const classes = useStyles();

	const [formData, setFormData] = useState("");
	const [ingredients, setIngredients] = useState([]);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [results, setResults] = useState([]);

	const handleChange = (evt) => {
		setFormData(evt.target.value);
	};

	const addIngredient = (evt) => {
		evt.preventDefault();
		setIngredients((ingredients) => [...ingredients, formData]);
	};

	const deleteIngredient = (ingredient) => {
		setIngredients((ingredients) =>
			ingredients.filter((ing) => ing !== ingredient)
		);
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		setFormSubmitted(true);
	};

	useEffect(() => {
		if (formSubmitted) {
			const getResults = async () => {
				try {
					const ingredientsParams = ingredients.join(",");
					const recipes = await axios.get(
						"https://api.spoonacular.com/recipes/findByIngredients",
						{
							params: {
								apiKey: "73baf9bb95a14f5fb4d71e2f12ab8479",
								offset: 0,
								number: 900,
								ingredients: ingredientsParams,
							},
						}
					);
					setResults(recipes.data);
				} catch (e) {
					console.error(e);
				}
			};
			getResults();
		}
	}, [formSubmitted]);

	useEffect(() => {
		setFormData("");
	}, [ingredients]);

	return (
		<Grid container cols={2} className={classes.root}>
			<IngredientInput
				ingredients={ingredients}
				handleChange={handleChange}
				formData={formData}
				addIngredient={addIngredient}
			/>
			<IngredientList
				ingredients={ingredients}
				handleSubmit={handleSubmit}
				deleteIngredient={deleteIngredient}
			/>
			{formSubmitted ? (
				results.length ? (
					<Grid
						item
						cols={2}
						xs={12}
						style={{ margin: "10px 0", padding: "0 10px 0 40px" }}
					>
						<RecipeGrid feed={results} ingredients={ingredients} />
					</Grid>
				) : (
					<div
						style={{
							width: "100%",
							height: "80px",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}
					>
						<Typography
							style={{
								color: "red",
								textAlign: "center",
							}}
						>
							No results found
						</Typography>
					</div>
				)
			) : null}
		</Grid>
	);
};

export default WelcomePage;
