import React, { useEffect } from "react";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { loadFeed } from "../../actionCreators/recipeActionCreators";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import RecipeGrid from "../recipes/RecipeGrid";
import FilterPanel from "./FilterPanel";
import useWindowDimensions from "../../customHooks/getWindowDimensions";

const useStyles = makeStyles(() => ({
	root: {
		display: "flex",
		justifyContent: "space-around",
	},
	pagination: {
		margin: "10px auto",
		width: "fit-content",
	},
}));

const HomePage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user, shallowEqual);
	const feed = useSelector((state) => state.feed, shallowEqual);
	const page = useSelector((state) => state.page, shallowEqual);
	const totalResults = useSelector((state) => state.totalResults, shallowEqual);
	const countPerPage = useSelector((state) => state.countPerPage, shallowEqual);

	const { height, width } = useWindowDimensions();

	useEffect(() => {
		if (!feed.length) {
			dispatch(loadFeed(page, user.api_hash));
		}
	}, [page, dispatch, user.api_hash]);

	const handleChange = (event, value) => {
		console.log(value);
		dispatch(loadFeed(value, user.api_hash));
	};

	return (
		<>
			{console.log(page)}
			<div className={classes.root}>
				<div style={{ width: `${width - 240}px`, height: `${height}px` }}>
					<FilterPanel />
					<Pagination
						count={Math.ceil(totalResults / countPerPage) + 1}
						defaultPage={1}
						siblingCount={0}
						page={page}
						onChange={handleChange}
						className={classes.pagination}
					/>
					<RecipeGrid feed={feed} />
					<Pagination
						count={Math.ceil(totalResults / countPerPage) + 1}
						defaultPage={1}
						siblingCount={0}
						page={page}
						onChange={handleChange}
						className={classes.pagination}
					/>
				</div>
			</div>
		</>
	);
};

export default HomePage;
