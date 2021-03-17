import React, { useState, useEffect } from "react";
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

const useStyles = makeStyles(() => ({
	root: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		backgroundImage:
			"url(https://images.unsplash.com/photo-1470549813517-2fa741d25c92?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80)",
		backgroundSize: "cover",
	},
	heading: {
		display: "block",
	},
	textField: {
		borderTopRightRadius: "0px",
		borderBottomLeftRadius: "0px",
		backgroundColor: "#fff",
	},
	addItemBtn: {
		backgroundColor: "#4caf50",
		color: "#fff",
		"&:hover": {
			backgroundColor: "#81c784",
		},
	},
	submitBtn: {
		backgroundColor: "#4caf50",
		color: "#fff",
		"&:hover": {
			backgroundColor: "#81c784",
		},
	},
	ingredients: {
		boxShadow: "-2px -2px 10px lightgray",
		display: "flex",
		flexDirection: "column",
		// justifyContent: "center",
		alignItems: "center",
		height: "100%",
	},
}));

const WelcomePage = () => {
	const classes = useStyles();

	const [formData, setFormData] = useState("");
	const [ingredients, setIngredients] = useState([]);

	const handleChange = (evt) => {
		setFormData(evt.target.value);
	};

	const addIngredient = (evt) => {
		evt.preventDefault();
		setIngredients((ingredients) => [...ingredients, formData]);
	};

	const deleteIngredient = (ingredient) => {
		// console.log(ingredient);
		setIngredients((ingredients) =>
			ingredients.filter((ing) => ing !== ingredient)
		);
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		console.log("SUBMITTED!");
	};

	useEffect(() => {
		setFormData("");
	}, [ingredients]);

	return (
		<Grid container cols={2}>
			<Grid item cols={1} md={9}>
				<div className={classes.root}>
					<Typography variant="h4" className={classes.heading}>
						What's in your kitchen?
					</Typography>
					<form onSubmit={handleSubmit}>
						<FormGroup row>
							<TextField
								variant="outlined"
								size="small"
								className={classes.textField}
								onChange={handleChange}
								value={formData}
								error={ingredients.includes(formData)}
								helperText={
									ingredients.includes(formData)
										? `${formData} has already been selected.`
										: null
								}
							/>
							<Button onClick={addIngredient} className={classes.addItemBtn}>
								Add Item
							</Button>
						</FormGroup>

						<Button type="submit" className={classes.submitBtn}>
							Submit
						</Button>
					</form>
				</div>
			</Grid>
			<Grid item cols={1} md={3} className={classes.ingredients}>
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
			</Grid>
		</Grid>
	);
};

export default WelcomePage;
