import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import RecipeGrid from "./RecipeGrid";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useWindowDimensions from "../customHooks/getWindowDimensions";

const useStyles = makeStyles(() => ({
	root: {
		display: "flex",
		justifyContent: "space-around",
	},
}));

const BookmarksPage = () => {
	const classes = useStyles();
	const bookmarks = useSelector((state) => state.user.bookmarks);
	const [fullBookmarks, setFullBookmarks] = useState([]);
	const { height, width } = useWindowDimensions();

	const removeBookmark = (id) => {
		setFullBookmarks(fullBookmarks.filter((bookmark) => bookmark.id !== id));
	};

	useEffect(() => {
		const loadBookmarks = async () => {
			const resp = await axios.get(
				`https://api.spoonacular.com/recipes/informationBulk`,
				{
					params: {
						ids: bookmarks.join(","),
						apiKey: "73baf9bb95a14f5fb4d71e2f12ab8479",
					},
				}
			);
			setFullBookmarks(resp.data);
		};
		loadBookmarks();
	}, [bookmarks]);

	return (
		<>
			<div className={classes.root}>
				<div style={{ width: `${width - 240}px`, height: `${height}px` }}>
					<Typography variant="h4">Bookmarks</Typography>
					<RecipeGrid
						feed={fullBookmarks}
						areBookmarks={true}
						removeBookmark={removeBookmark}
					/>
				</div>
			</div>
		</>
	);
};

export default BookmarksPage;
