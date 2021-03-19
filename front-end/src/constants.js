export const ALL_DIETS = [
	"glutenFree",
	"ketogenic",
	"vegetarian",
	"lactoVegetarian",
	"ovoVegetarian",
	"lactoOvoVegetarian",
	"vegan",
	"pescetarian",
	"paleo",
	"primal",
	"whole30",
];

export const ALL_MACROS = ["Fat", "Protein", "Carbohydrates"];

export const INITIAL_FILTER_DATA = {
	diets: [],
	macros: {
		Fat: {
			operator: null,
			amount: null,
		},
		Protein: {
			operator: null,
			amount: null,
		},
		Carbohydrates: {
			operator: null,
			amount: null,
		},
	},
};
