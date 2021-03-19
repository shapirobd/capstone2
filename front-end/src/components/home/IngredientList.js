import React from "react";
import { Grid, Typography, Button, Chip, Divider } from "@material-ui/core";
import { useStyles } from "./styles/IngredientListStyles";

const IngredientList = ({ ingredients, handleSubmit, deleteIngredient }) => {
	const classes = useStyles();

	return (
		<Grid item cols={1} md={4} className={classes.rightGridItem}>
			<div className={classes.ingredients}>
				<Typography
					variant="h5"
					style={{
						padding: "10px 0",
						width: "100%",
						backgroundColor: "#fff",
						borderTopLeftRadius: "5px",
						borderTopRightRadius: "5px",
						textAlign: "center",
						height: "5%",
					}}
				>
					Selected Ingredients
				</Typography>
				<Divider style={{ width: "100%" }} />
				<div
					style={{
						height: "87%",
						width: "100%",
						backgroundColor: "rgba(255,255,255,0.5)",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							flexWrap: "wrap",
							margin: "10px",
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
				</div>
				<Button
					type="submit"
					onClick={handleSubmit}
					className={classes.submitBtn}
					style={{
						position: "absolute",
						bottom: "0",
						width: "100%",
						height: "5%",
						boxShadow: "-2px 0px 8px rgba(0,0,0,0.5)",
					}}
				>
					Submit
				</Button>
			</div>
		</Grid>
	);
};

export default IngredientList;
