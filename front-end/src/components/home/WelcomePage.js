import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Grid,
	Typography,
	TextField,
	FormGroup,
	Button,
	Chip,
	Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getRecipesByIngredients } from "../../actionCreators/recipeActionCreators";
import RecipeGrid from "../recipes/RecipeGrid";

const useStyles = makeStyles(() => ({
	root: {
		backgroundImage:
			"url(https://images.unsplash.com/photo-1470549813517-2fa741d25c92?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)",
		backgroundSize: "cover",
	},
	leftGridItem: {
		height: "100%",
	},
	main: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "50%",
		width: "75%",
		borderRadius: "5px",
		backgroundColor: "rgba(255,255,255,0.5)",
		boxShadow: "2px 2px 10px black",
	},
	heading: {
		display: "block",
		margin: "20px 0",
	},
	textField: {
		borderTopRightRadius: "0px",
		borderBottomRightRadius: "0px",
		backgroundColor: "#fff",
		width: "100%",
	},
	addItemBtn: {
		backgroundColor: "#4caf50",
		color: "#fff",
		"&:hover": {
			backgroundColor: "#81c784",
		},
		borderTopLeftRadius: "0px",
		borderBottomLeftRadius: "0px",
	},
	submitBtn: {
		backgroundColor: "#4caf50",
		color: "#fff",
		"&:hover": {
			backgroundColor: "#81c784",
		},
	},
	rightGridItem: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	ingredients: {
		boxShadow: "-2px -2px 10px black",
		backgroundColor: "#fff",
		borderRadius: "5px",
		display: "flex",
		flexDirection: "column",
		// justifyContent: "center",
		alignItems: "center",
		height: "90%",
		width: "80%",
	},
}));

const WelcomePage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const [formData, setFormData] = useState("");
	const [ingredients, setIngredients] = useState([]);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [results, setResults] = useState([]);

	const feed = useSelector((state) => state.feed);

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
		// dispatch(getRecipesByIngredients(ingredients));
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
								number: 6900,
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
			<Grid item cols={1} md={8} className={classes.leftGridItem}>
				<form
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div className={classes.main}>
						<Typography variant="h4" className={classes.heading}>
							What's in your kitchen?
						</Typography>
						<FormGroup row>
							<TextField
								variant="outlined"
								size="small"
								// className={classes.textField}
								onChange={handleChange}
								value={formData}
								error={ingredients.includes(formData)}
								helperText={
									ingredients.includes(formData)
										? `${formData} has already been selected.`
										: null
								}
								InputProps={{ className: classes.textField }}
							/>
							<Button onClick={addIngredient} className={classes.addItemBtn}>
								Add Item
							</Button>
						</FormGroup>
					</div>
				</form>
			</Grid>
			<Grid item cols={1} md={4} className={classes.rightGridItem}>
				<div className={classes.ingredients}>
					<Typography variant="h5" style={{ padding: "10px 0" }}>
						Selected Ingredients
					</Typography>
					<Divider />
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							flexWrap: "wrap",
						}}
					>
						{ingredients.map((ingredient) => (
							<Chip
								key={ingredient}
								label={ingredient}
								onDelete={() => deleteIngredient(ingredient)}
								style={{ margin: "5px" }}
							/>
						))}
					</div>
					<Button
						type="submit"
						onClick={handleSubmit}
						className={classes.submitBtn}
						style={{ position: "absolute", bottom: "8%" }}
					>
						Submit
					</Button>
				</div>
			</Grid>
			{formSubmitted ? (
				<Grid
					item
					cols={2}
					xs={12}
					style={{ margin: "10px 0", padding: "0 10px 0 40px" }}
				>
					<RecipeGrid feed={results} ingredientBased={true} />
				</Grid>
			) : null}
		</Grid>
	);
};

export default WelcomePage;
