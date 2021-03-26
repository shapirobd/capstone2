import React from "react";
import { Typography } from "@material-ui/core";
import { useStyles } from "./styles/TrackerDoughnutStyles";
import { Doughnut } from "react-chartjs-2";
import CircularProgress from "@material-ui/core/CircularProgress";

const TrackerDoughnut = ({ dayState, pieChartData }) => {
	const classes = useStyles();
	console.log(pieChartData);

	return (
		<div className={classes.doughnutDiv}>
			{dayState.loaded ? (
				<>
					<Typography variant="h6">Daily Macros</Typography>
					{dayState.empty ? (
						<Typography>No Data</Typography>
					) : (
						<Doughnut data={pieChartData} className={classes.doughnut} />
					)}
				</>
			) : (
				<CircularProgress />
			)}
		</div>
	);
};

export default TrackerDoughnut;
