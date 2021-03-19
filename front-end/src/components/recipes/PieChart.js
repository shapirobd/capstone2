import React from "react";
import { CanvasJSChart } from "canvasjs-react-charts";
import { useStyles } from "./styles/PieChartStyles";

const PieChart = ({ title, caloricBreakdown }) => {
	const { percentFat, percentCarbs, percentProtein } = caloricBreakdown;
	const classes = useStyles();

	const options = {
		animationEnabled: true,
		title: {
			text: title,
		},
		data: [
			{
				type: "pie",
				indexLabel: "{label}: {y}%",
				startAngle: -90,
				dataPoints: [
					{ y: `${Math.round(percentFat)}`, label: "Fat" },
					{ y: `${Math.round(percentCarbs)}`, label: "Carboydrates" },
					{ y: `${Math.round(percentProtein)}`, label: "Protein" },
				],
			},
		],
	};

	return (
		<div className={classes.root}>
			<CanvasJSChart options={options}></CanvasJSChart>
		</div>
	);
};

export default PieChart;
