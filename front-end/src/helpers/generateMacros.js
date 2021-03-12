export const generateMacros = (nutrients) => {
	return {
		fat: {
			name: "Fat",
			amount: nutrients[1].amount,
			subNutrients: {
				saturatedFat: {
					name: "Saturated Fat",
					amount: nutrients[2].amount,
				},
			},
		},
		carbohydrates: {
			name: "Carbohydrates",
			amount: nutrients[3].amount,
			subNutrients: {
				fiber: {
					name: "Fiber",
					amount: nutrients[13].amount,
				},
				netCarbohydrates: {
					name: "Net Carbohydrates",
					amount: nutrients[4].amount,
				},
				sugar: {
					name: "Sugar",
					amount: nutrients[5].amount,
				},
			},
		},
		protein: {
			name: "Protein",
			amount: nutrients[8].amount,
			subNutrients: {},
		},
	};
};
