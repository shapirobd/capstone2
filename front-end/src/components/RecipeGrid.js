import React from "react";
import { useSelector } from "react-redux";
import { GridList } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useWindowDimensions from "../customHooks/getWindowDimensions";
import RecipeTile from "./RecipeTile";
import BookmarkTile from "./BookmarkTile";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	gridList: {
		width: "100%",
		height: "100%",
		padding: "20px",
	},
}));

const RecipeGrid = ({ feed, areBookmarks, removeBookmark }) => {
	const classes = useStyles();

	const { width } = useWindowDimensions();

	const user = useSelector((state) => state.user);

	return (
		<div className={classes.root}>
			<GridList
				cols={Math.round(width / 300)}
				spacing={20}
				cellHeight={180}
				className={classes.gridList}
				justify="flex-start"
			>
				{feed.map((recipe) =>
					areBookmarks ? (
						<BookmarkTile
							user={user}
							recipe={recipe}
							removeBookmark={removeBookmark}
							key={recipe.id}
						/>
					) : (
						<RecipeTile recipe={recipe} />
					)
				)}
			</GridList>
		</div>
	);
};

export default RecipeGrid;
