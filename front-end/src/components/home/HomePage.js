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
		dispatch(loadFeed(page, user.api_hash));
	}, [page, dispatch, user.api_hash]);

	const handleChange = (event, value) => {
		dispatch({
			type: "CHANGE_PAGE",
			payload: value,
		});
	};

	return (
		<>
			<div className={classes.root}>
				<div style={{ width: `${width - 240}px`, height: `${height}px` }}>
					<FilterPanel />
					<RecipeGrid feed={feed} />
					<Pagination
						count={Math.ceil(totalResults / countPerPage) + 1}
						defaultPage={1}
						siblingCount={0}
						page={page}
						onChange={handleChange}
					/>
				</div>
			</div>
		</>
	);
};

export default HomePage;
