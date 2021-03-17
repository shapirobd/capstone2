import React, { useState } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import MacroInputs from "./MacroInputs";
import DietInputs from "./DietInputs";
import { useDispatch } from "react-redux";
import { filterFeed } from "../../actionCreators/recipeActionCreators";

const ALL_DIETS = [
	"glutenFree",
	"ketogenic",
	"vegetarian",
	"lactoVegetarian",
	"ovoVegetarian",
	"lactoOvoVegetarian",
	"vegan",
	"pescetarian",
	"paleo",
	"primal",
	"whole30",
];

const ALL_MACROS = ["Fat", "Protein", "Carbohydrates"];

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		// backgroundImage: "linear-gradient(#c8e6c9, #fff)",
		backgroundColor: "#fff",
		flexWrap: "wrap",
		margin: "0 0 10px 0",
		padding: "20px",
		justifyContent: "left",
		boxShadow: "2px 2px 3px lightgray",
		maxHeight: "40vh",
	},
	button: {
		float: "right",
		backgroundColor: "#4caf50",
		color: "#fff",
		"&:hover": {
			backgroundColor: "#81c784",
		},
	},
}));

const FilterPanel = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const INITIAL_FORM_DATA = {
		diets: [],
		macros: {
			Fat: {
				operator: null,
				amount: null,
			},
			Protein: {
				operator: null,
				amount: null,
			},
			Carbohydrates: {
				operator: null,
				amount: null,
			},
		},
	};

	const [formData, setFormData] = useState(INITIAL_FORM_DATA);
	console.log(formData);

	const handleChange = (evt) => {
		let { name, value } = evt.target;
		let category;

		if (name.startsWith("operator")) {
			name = name.slice(9);
			category = "operator";
		} else if (name.startsWith("amount")) {
			name = name.slice(7);
			category = "amount";
		}

		setFormData((formData) => {
			if (ALL_MACROS.includes(name)) {
				return {
					...formData,
					macros: {
						...formData.macros,
						[name]: {
							...formData.macros[name],
							[category]: value,
						},
					},
				};
			}
		});
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		console.log("FORM SUBMITTED");
		dispatch(filterFeed(formData));
	};

	return (
		<form className={classes.root} onSubmit={handleSubmit}>
			<DietInputs
				allDiets={ALL_DIETS}
				handleChange={handleChange}
				setFormData={setFormData}
			/>
			<MacroInputs
				allMacros={ALL_MACROS}
				handleChange={handleChange}
				setFormData={setFormData}
			/>
			<div style={{ width: "100%" }}>
				<Button type="submit" className={classes.button}>
					Apply
				</Button>
			</div>
		</form>
	);
};

export default FilterPanel;
