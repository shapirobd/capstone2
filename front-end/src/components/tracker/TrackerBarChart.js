import React from "react";
import { Typography } from "@material-ui/core";
import { useStyles } from "./styles/TrackerBarChartStyles";
import { Bar, HorizontalBar } from "react-chartjs-2";
import CircularProgress from "@material-ui/core/CircularProgress";
import useWindowDimensions from "../../customHooks/getWindowDimensions";

const TrackerBarChart = ({ weekState, barChartData }) => {
	const classes = useStyles();

	const { width } = useWindowDimensions();

	console.log(barChartData);

	return (
		<div
			className={width <= 599 ? classes.mobileBarChartDiv : classes.barChartDiv}
		>
			{weekState.loaded ? (
				<>
					<Typography variant={width <= 599 ? "h6" : "h3"}>
						Weekly Data
					</Typography>
					{weekState.empty ? (
						<Typography variant="h3">No Data</Typography>
					) : width <= 599 ? (
						<HorizontalBar
							data={barChartData}
							// className={classes.horizontalBarChart}
							options={{
								scales: {
									xAxes: [
										{
											ticks: {
												beginAtZero: true,
											},
										},
									],
								},
								maintainAspectRatio: false,
							}}
						/>
					) : (
						<Bar
							data={barChartData}
							className={classes.barChart}
							options={{
								scales: {
									yAxes: [
										{
											ticks: {
												beginAtZero: true,
											},
										},
									],
								},
							}}
						/>
					)}
				</>
			) : (
				<CircularProgress />
			)}
		</div>
	);
};

export default TrackerBarChart;
