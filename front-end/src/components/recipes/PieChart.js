import React from "react";
// import { CanvasJSChart } from "canvasjs-react-charts";
import { useStyles } from "./styles/PieChartStyles";
import { Doughnut } from "react-chartjs-2";

const PieChart = ({ title, caloricBreakdown }) => {
	const { percentFat, percentCarbs, percentProtein } = caloricBreakdown;
	const classes = useStyles();

	// const options = {
	// 	animationEnabled: true,
	// 	title: {
	// 		text: title,
	// 	},
	// 	data: [
	// 		{
	// 			type: "pie",
	// 			indexLabel: "{label}: {y}%",
	// 			startAngle: -90,
	// 			dataPoints: [
	// 				{ y: `${Math.round(percentFat)}`, label: "Fat" },
	// 				{ y: `${Math.round(percentCarbs)}`, label: "Carboydrates" },
	// 				{ y: `${Math.round(percentProtein)}`, label: "Protein" },
	// 			],
	// 		},
	// 	],
	// };

	const pieChartData = {
		labels: ["Carbohydraetes", "Fat", "Protein"],
		datasets: [
			{
				data: [
					Math.round(percentCarbs),
					Math.round(percentFat),
					Math.round(percentProtein),
				],
				backgroundColor: ["#f44336", "#4caf50", "#2196f3"],
				hoverBackgroundColor: ["#f44336", "#4caf50", "#2196f3"],
				hoverBorderColor: ["#f44336", "#4caf50", "#2196f3"],
				borderAlign: "inner",
			},
		],
		text: "25%",
	};

	return (
		<div className={classes.root}>
			<Doughnut
				data={pieChartData}
				options={{
					maintainAspectRatio: true,
					responsive: true,
				}}
			/>
		</div>
	);
};

export default PieChart;
