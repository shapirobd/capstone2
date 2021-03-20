import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Typography, ButtonGroup, Button } from "@material-ui/core";
import { useStyles } from "./styles/TrackerPageStyles";
import { Doughnut, Bar } from "react-chartjs-2";
import Calendar from "react-calendar";
import moment from "moment";
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

const getWeeklyMacros = (weekData) => {
	Object.keys(weekData).map((date) => console.log(date));
	return {
		labels: [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		],
		datasets: [
			{
				label: "Carbohydrates",
				// data: [120, 140, 130, 90, 200, 150, 110],
				data: weekData
					? Object.keys(weekData).map((date) => weekData[date].carbs)
					: [0, 0, 0, 0, 0, 0, 0],
				backgroundColor: ["red", "red", "red", "red", "red", "red", "red"],
			},
			{
				label: "Fat",
				data: weekData
					? Object.keys(weekData).map((date) => weekData[date].fat)
					: [0, 0, 0, 0, 0, 0, 0],
				backgroundColor: [
					"green",
					"green",
					"green",
					"green",
					"green",
					"green",
					"green",
				],
			},
			{
				label: "Protein",
				data: weekData
					? Object.keys(weekData).map((date) => weekData[date].protein)
					: [0, 0, 0, 0, 0, 0, 0],
				backgroundColor: [
					"blue",
					"blue",
					"blue",
					"blue",
					"blue",
					"blue",
					"blue",
				],
			},
		],
	};
};

const getWeekNumber = (calendarDate) => {
	return moment(convertDate(calendarDate), "YYYY-MM-DD").week();
};

const getWeekDates = (calendarDate) => {
	return [0, 1, 2, 3, 4, 5, 6].map((d) =>
		convertDate(
			moment(
				`${convertDate(calendarDate).substring(0, 4)}-${getWeekNumber(
					calendarDate
				)}-` + d,
				"YYYY-w-e"
			)["_d"]
		)
	);
};

const TrackerPage = () => {
	const classes = useStyles();
	const user = useSelector((state) => state.user);
	// const [selectedDate, setSelectedDate] = useState(findDate());
	const [calendarDate, setCalendarDate] = useState(new Date());
	const [dayState, setDayState] = useState({
		date: convertDate(calendarDate),
		macros: {
			carbs: 100,
			fat: 90,
			protein: 150,
		},
	});
	const [weekState, setWeekState] = useState({
		weekNumber: null,
		dates: getWeekDates(calendarDate),
		weekData: {},
	});

	const [pieChartData, setPieChartData] = useState(getDailyMacros());
	const [barChartData, setBarChartData] = useState(
		getWeeklyMacros(weekState.weekData)
	);

	const getDateMacros = async (context = "day", date = calendarDate) => {
		const mealIds = await axios.get(
			`http://localhost:5000/users/${user.username}/getEatenMeals`,
			{
				params: {
					date: context === "day" ? convertDate(date) : date,
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
		if (context === "day") {
			setDayState({
				date: convertDate(date),
				macros,
			});
		} else {
			return macros;
		}
	};

	const updateWeekData = async (weekData, date) => {
		const dateMacros = await getDateMacros("week", date);
		weekData[date] = dateMacros;
	};

	const getWeekMacros = async (weekDates) => {
		let weekData = {};
		for (let date of weekDates) {
			await updateWeekData(weekData, date);
		}
		setWeekState((weekState) => ({
			...weekState,
			weekData,
		}));
	};

	useEffect(() => {
		getDateMacros();
		if (getWeekNumber(calendarDate) !== weekState.weekNumber) {
			setWeekState({
				weekNumber: getWeekNumber(calendarDate),
				dates: getWeekDates(calendarDate),
				weekData: getWeekMacros(getWeekDates(calendarDate)),
			});
		}
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

	useEffect(() => {
		setBarChartData(getWeeklyMacros(weekState.weekData));
	}, [weekState]);

	return (
		<div style={{ width: "100%" }}>
			{console.log(weekState)}
			<Grid container cols={2} className={classes.root}>
				<Grid item cols={1} md={3}>
					<Calendar
						onChange={setCalendarDate}
						value={calendarDate}
						minDetail="year"
						className={classes.calendar}
						calendarType="US"
					/>
					<div>
						<Doughnut data={pieChartData} width={200} height={200} />
					</div>
				</Grid>
				<Grid item cols={1} md={8} className={classes.rightGridItem}>
					<Typography variant="h3">Weekly Data</Typography>
					<Bar data={barChartData} className={classes.barChart} />
				</Grid>
			</Grid>
		</div>
	);
};

export default TrackerPage;
