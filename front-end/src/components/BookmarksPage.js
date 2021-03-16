import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import RecipeGrid from "./RecipeGrid";
import SideNav from "./SideNav";

const BookmarksPage = ({ bookmarkIds }) => {
	const user = useSelector((state) => state.user);
	console.log(user);

	const [bookmarks, setBookmarks] = useState([]);
	useEffect(() => {
		const loadBookmarks = async () => {
			const resp = await axios.get(
				`https://api.spoonacular.com/recipes/informationBulk`,
				{
					params: {
						ids: bookmarkIds.join(","),
						apiKey: "73baf9bb95a14f5fb4d71e2f12ab8479",
					},
				}
			);
			setBookmarks(resp.data);
		};
		loadBookmarks();
	}, []);

	return (
		<div>
			<SideNav />
			<RecipeGrid feed={bookmarks} />
		</div>
	);
};

export default BookmarksPage;
