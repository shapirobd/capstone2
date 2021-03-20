import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Typography, ButtonGroup, Button } from "@material-ui/core";
import { useStyles } from "./styles/TrackerPageStyles";
import { Doughnut, Bar } from "react-chartjs-2";
import Calendar from "react-calendar";
// import moment from "moment";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const convertDate = (date = new Date()) => {
	let dd = String(date.getDate()).padStart(2, "0");
	let mm = String(date.getMonth() + 1).padStart(2, "0");
	let yyyy = date.getFullYear();
	return yyyy + "-" + mm + "-" + dd;
};

const getDailyMacros = (carbs = 0, fat = 0, protein = 0) => ({
	labels: ["Carbohydraetes", "Fat", "Protein"],
	datasets: [
		{
			// label: "Fat",
			data: [carbs, fat, protein],
			backgroundColor: ["red", "green", "blue"],
		},
	],
});

const barData = {
	labels: [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	],
	datasets: [
		{
			label: "Fat",
			data: [120, 140, 130, 90, 200, 150, 110],
			backgroundColor: ["red", "red", "red", "red", "red", "red", "red"],
		},
	],
};

const TrackerPage = () => {
	const classes = useStyles();
	const user = useSelector((state) => state.user);
	// const [selectedDate, setSelectedDate] = useState(findDate());
	const [calendarDate, setCalendarDate] = useState(new Date());
	const [pieChartData, setPieChartData] = useState(getDailyMacros());
	const [barChartData, setBarChartData] = useState(barData);
	const [dayState, setDayState] = useState({
		date: convertDate(calendarDate),
		macros: {
			carbs: 100,
			fat: 90,
			protein: 150,
		},
	});

	useEffect(() => {
		const getCurrDateMacros = async () => {
			const mealIds = await axios.get(
				`http://localhost:5000/users/${user.username}/getEatenMeals`,
				{
					params: {
						date: convertDate(calendarDate),
					},
				}
			);
			const meals = await axios.get(
				`https://api.spoonacular.com/recipes/informationBulk`,
				{
					params: {
						apiKey: "73baf9bb95a14f5fb4d71e2f12ab8479",
						ids: mealIds.data.join(","),
						includeNutrition: true,
					},
				}
			);
			const macros = {
				carbs: meals.data.reduce((totalCarbs, meal) => {
					return Math.round(totalCarbs + meal.nutrition.nutrients[3].amount);
				}, 0),
				fat: meals.data.reduce((totalFat, meal) => {
					return Math.round(totalFat + meal.nutrition.nutrients[1].amount);
				}, 0),
				protein: meals.data.reduce((totalProtein, meal) => {
					return Math.round(totalProtein + meal.nutrition.nutrients[8].amount);
				}, 0),
			};
			setDayState({
				date: convertDate(calendarDate),
				macros,
			});
		};
		getCurrDateMacros();
	}, [calendarDate]);

	useEffect(() => {
		setPieChartData(
			getDailyMacros(
				dayState.macros.carbs,
				dayState.macros.fat,
				dayState.macros.protein
			)
		);
	}, [dayState]);

	return (
		<div style={{ width: "100%" }}>
			{console.log(calendarDate)}
			{console.log(convertDate(calendarDate))}
			<Grid container cols={2} className={classes.root}>
				<Grid item cols={1} md={3}>
					<Calendar
						onChange={setCalendarDate}
						value={calendarDate}
						minDetail="year"
						className={classes.calendar}
					/>
					<div>
						<Doughnut data={pieChartData} width={200} height={200} />
					</div>
				</Grid>
				<Grid item cols={1} md={8} className={classes.rightGridItem}>
					<Typography variant="h3">Weekly Data</Typography>
					<ButtonGroup
						color="primary"
						aria-label="outlined primary button group"
						className={classes.buttonGroup}
					>
						<Button className={classes.button}>Carbohydrates</Button>
						<Button className={classes.button}>Fat</Button>
						<Button className={classes.button}>Protein</Button>
					</ButtonGroup>
					<Bar data={barChartData} className={classes.barChart} />
				</Grid>
			</Grid>
		</div>
	);
};

export default TrackerPage;
