import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	GridList,
	GridListTile,
	ListSubheader,
	GridListTileBar,
	IconButton,
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
}));

const RecipeGrid = ({ feed, areBookmarks, removeBookmark }) => {
	const classes = useStyles();

	const { width } = useWindowDimensions();
	console.log(width);

	const user = useSelector((state) => state.user);

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
