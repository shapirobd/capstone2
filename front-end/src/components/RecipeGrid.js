import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import useWindowDimensions from "../customHooks/getWindowDimensions";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
		// overflow: "hidden",
		// backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		width: "100%",
		height: "100%",
	},
	gridTile: {
		// width: "20%",
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
	},
}));

const RecipeGrid = ({ feed }) => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();

	const { height, width } = useWindowDimensions();

	return (
		<div className={classes.root}>
			<GridList
				cols={Math.floor(width / 300)}
				spacing={20}
				cellHeight={180}
				className={classes.gridList}
			>
				{feed.map((recipe) => (
					<GridListTile
						key={recipe.id}
						name={recipe.id}
						cols={1}
						className={classes.gridTile}
					>
						<Link to={`/recipes/${recipe.id}`}>
							<img src={recipe.image} alt={recipe.title} />
							<GridListTileBar title={recipe.title} />
						</Link>
					</GridListTile>
				))}
			</GridList>
		</div>
	);
};

export default RecipeGrid;
