import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	GridList,
	GridListTile,
	ListSubheader,
	GridListTileBar,
	IconButton,
	Badge,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/core/styles";
import useWindowDimensions from "../../customHooks/getWindowDimensions";
import RecipeTile from "./RecipeTile";
import BookmarkTile from "./BookmarkTile";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
	},
	gridList: {
		width: "max-content",
		justifyContent: "center",
		// height: "100%",
		// padding: "20px",
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
	},
	img: {
		// height: "100%",
		width: "100%",
	},
	ingredientStats: {
		width: "20%",
		top: 0,
		right: 0,
		// bottom: "100%",
		// left: "100%",
	},
}));

const RecipeGrid = ({
	feed,
	areBookmarks,
	removeBookmark,
	ingredientBased,
}) => {
	const classes = useStyles();

	const { width } = useWindowDimensions();
	console.log(width);

	const user = useSelector((state) => state.user);

	if (ingredientBased) {
		feed.sort((a, b) =>
			a.missedIngredientCount > b.missedIngredientCount ? 1 : -1
		);
		console.log(feed);
	}

	return (
		<div className={classes.root}>
			<GridList
				cellHeight={200}
				// spacing={3}
				cols={Math.round(width / 400)}
				className={classes.gridList}
			>
				{feed.map((recipe) => (
					<GridListTile key={recipe.image}>
						<Link to={`/recipes/${recipe.id}`}>
							{ingredientBased ? (
								<GridListTileBar
									className={classes.ingredientStats}
									title={`+ ${recipe.missedIngredientCount}`}
								/>
							) : null}
							<img
								src={recipe.image}
								alt={recipe.title}
								className={classes.img}
							/>
							<GridListTileBar title={recipe.title} />
						</Link>
					</GridListTile>
				))}
			</GridList>
		</div>
	);
};

export default RecipeGrid;
