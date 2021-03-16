import React from "react";
import { CanvasJSChart } from "canvasjs-react-charts";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	root: {
		backgroundColor: "#fff",
		padding: "20px",
		boxShadow: "2px 3px 3px lightgray",
	},
}));

const PieChart = ({ title, caloricBreakdown }) => {
	const { percentFat, percentCarbs, percentProtein } = caloricBreakdown;
	console.log(percentFat);
	console.log(percentCarbs);
	console.log(percentProtein);
	const classes = useStyles();

	const options = {
		animationEnabled: true,
		// exportEnabled: true,
		// theme: "light1", // "light1", "dark1", "dark2"
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
