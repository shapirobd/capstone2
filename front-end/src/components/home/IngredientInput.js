import React from "react";
import {
	Grid,
	Typography,
	TextField,
	FormGroup,
	Button,
} from "@material-ui/core";
import { useStyles } from "./styles/IngredientInputStyles";

const IngredientInput = ({
	ingredients,
	handleChange,
	formData,
	addIngredient,
}) => {
	const classes = useStyles();

	return (
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
	);
};

export default IngredientInput;
