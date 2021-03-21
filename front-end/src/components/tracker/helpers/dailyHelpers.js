import axios from "axios";

export const getPieChartData = (carbs = 0, fat = 0, protein = 0) => ({
	labels: ["Carbohydraetes", "Fat", "Protein"],
	datasets: [
		{
			data: [carbs, fat, protein],
			backgroundColor: ["#f44336", "#4caf50", "#2196f3"],
		},
	],
});

export const getDateMacros = async (user, context, date, setDayState) => {
	const mealIds = user.eatenMeals[date] || [];
	let empty = true;
	let meals;
	if (mealIds.length) {
		empty = false;
		meals = await getMealsByIds(mealIds);
	}

	let macros;
	if (meals) {
		macros = await getMacrosFromMeals(meals);
	} else {
		macros = {
			carbs: 0,
			fat: 0,
			protein: 0,
		};
	}

	if (context === "day") {
		setDayState({
			loaded: true,
			empty,
			date,
			macros,
		});
	} else {
		return macros;
	}
};

const getMealsByIds = async (ids) => {
	const meals = await axios.get(
		`https://api.spoonacular.com/recipes/informationBulk`,
		{
			params: {
				apiKey: "73baf9bb95a14f5fb4d71e2f12ab8479",
				ids: ids.join(","),
				includeNutrition: true,
			},
		}
	);
	return meals;
};

const getMacrosFromMeals = async (meals) => {
	const macros = {
		carbs: meals.data.reduce((totalCarbs, meal) => {
			return Math.round(totalCarbs + meal.nutrition.nutrients[3].amount) || 0;
		}, 0),
		fat: meals.data.reduce((totalFat, meal) => {
			return Math.round(totalFat + meal.nutrition.nutrients[1].amount) || 0;
		}, 0),
		protein: meals.data.reduce((totalProtein, meal) => {
			return Math.round(totalProtein + meal.nutrition.nutrients[8].amount) || 0;
		}, 0),
	};
	return macros;
};