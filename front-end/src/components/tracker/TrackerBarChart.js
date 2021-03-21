import React from "react";
import { Typography } from "@material-ui/core";
import { useStyles } from "./styles/TrackerBarChartStyles";
import { Bar } from "react-chartjs-2";
import CircularProgress from "@material-ui/core/CircularProgress";

const TrackerBarChart = ({ weekState, barChartData }) => {
	const classes = useStyles();
	console.log(barChartData);

	return (
		<div className={classes.barChartDiv}>
			{weekState.loaded ? (
				<>
					<Typography variant="h3">Weekly Data</Typography>
					{weekState.empty ? (
						<Typography variant="h3">No Data</Typography>
					) : (
						<Bar data={barChartData} className={classes.barChart} />
					)}
				</>
			) : (
				<CircularProgress />
			)}
		</div>
	);
};

export default TrackerBarChart;
