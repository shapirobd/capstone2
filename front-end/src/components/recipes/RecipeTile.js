import React from "react";
import { Link } from "react-router-dom";
import { GridListTile, GridListTileBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	gridTile: {
		// width: "100%",
	},
	img: {
		height: "100%",
	},
}));

const RecipeTile = ({ recipe }) => {
	const classes = useStyles();

	return (
		<GridListTile
			key={recipe.id}
			name={recipe.id}
			cols={1}
			className={classes.gridTile}
		>
			<Link to={`/recipes/${recipe.id}`} style={{ overflow: "hidden" }}>
				<img src={recipe.image} alt={recipe.title} className={classes.img} />
				<GridListTileBar title={recipe.title} />
			</Link>
		</GridListTile>
	);
};

export default RecipeTile;
