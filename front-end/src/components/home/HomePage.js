import React, { useEffect, useState } from "react";
import { Pagination } from "@material-ui/lab";
import { useStyles } from "./styles/HomePageStyles";
import { loadFeed } from "../../actionCreators/recipeActionCreators";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import RecipeGrid from "../recipes/RecipeGrid";
import FilterPanel from "./FilterPanel";
import useWindowDimensions from "../../customHooks/getWindowDimensions";
import { INITIAL_FILTER_DATA } from "../../constants";

const HomePage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user, shallowEqual);
	const feed = useSelector((state) => state.feed, shallowEqual);
	const page = useSelector((state) => state.page, shallowEqual);
	const totalResults = useSelector((state) => state.totalResults, shallowEqual);
	const countPerPage = useSelector((state) => state.countPerPage, shallowEqual);

	const { height, width } = useWindowDimensions();
	const [filtered, setFiltered] = useState(false);

	const [filterData, setFilterData] = useState(INITIAL_FILTER_DATA);

	useEffect(() => {
		filtered ? dispatch(loadFeed(page, filterData)) : dispatch(loadFeed(page));
	}, [page, dispatch]);

	const handleChange = (event, value) => {
		filtered
			? dispatch(loadFeed(value, filterData))
			: dispatch(loadFeed(value));
	};

	return (
		<>
			{console.log(totalResults)}
			{console.log(countPerPage)}
			<div className={classes.root}>
				<div style={{ width: `${width - 240}px`, height: `${height}px` }}>
					<FilterPanel
						setFiltered={setFiltered}
						filterData={filterData}
						setFilterData={setFilterData}
					/>
					<Pagination
						count={Math.ceil(totalResults / 40)}
						defaultPage={1}
						siblingCount={0}
						page={page}
						onChange={handleChange}
						className={classes.pagination}
					/>
					<RecipeGrid feed={feed} />
					<Pagination
						count={Math.ceil(totalResults / 40)}
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
