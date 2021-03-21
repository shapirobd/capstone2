const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const { default: axios } = require("axios");
const convertDate = require("../helpers/converDate");

class User {
	static async register({
		username,
		password,
		email,
		first_name,
		last_name,
		weight,
		weight_goal,
		calorie_goal,
	}) {
		const hashedPwd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
		const apiResp = await axios.post(
			`https://api.spoonacular.com/users/connect?apiKey=73baf9bb95a14f5fb4d71e2f12ab8479`,
			{}
		);
		const api_hash = apiResp.data.hash;
		const api_username = apiResp.data.username;
		const results = await db.query(
			`
            INSERT INTO users (username, password, email, first_name, last_name, api_hash, api_username, weight, weight_goal, calorie_goal)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING username, email, first_name, last_name, api_hash, api_username, weight, weight_goal, calorie_goal
        `,
			[
				username,
				hashedPwd,
				email,
				first_name,
				last_name,
				api_hash,
				api_username,
				weight,
				weight_goal,
				calorie_goal,
			]
		);
		return results.rows[0];
	}

	static async authenticate(username, password) {
		const userRes = await db.query(
			`
            SELECT * 
            FROM users
            WHERE username=$1
        `,
			[username]
		);
		const user = userRes.rows[0];
		if (user) {
			console.log(user);
			if (await bcrypt.compare(password, user.password)) {
				const bookmarksRes = await db.query(
					`
					SELECT meal_id
					FROM bookmarks
					WHERE username=$1
					`,
					[username]
				);
				const bookmarks = bookmarksRes.rows.map((bookmark) => bookmark.meal_id);
				user.bookmarks = bookmarks;

				const eatenMealsRes = await db.query(
					`
					SELECT meal_id, date
					FROM users_meals
					WHERE username=$1
					`,
					[username]
				);
				const eatenMeals = {};
				eatenMealsRes.rows.map((meal) => {
					let date = convertDate(meal.date);
					eatenMeals[date]
						? eatenMeals[date].push(meal.meal_id)
						: (eatenMeals[date] = [meal.meal_id]);
				});
				user.eatenMeals = eatenMeals;

				return user;
			}
		}
		return false;
	}

	static async findAll() {
		const userRes = await db.query(
			`
            SELECT username,
                email,
                first_name,
                last_name
            FROM users
            ORDER BY username
        `
		);

		return userRes.rows;
	}

	static async findOne(username) {
		const userRes = await db.query(
			`
            SELECT username,
                email,
                first_name,
                last_name
            FROM users 
            WHERE username=$1
            `,
			[username]
		);
		const user = userRes.rows[0];

		const bookmarksRes = await db.query(
			`
			SELECT meal_id
			FROM bookmarks
			WHERE username=$1
			`,
			[username]
		);
		user.bookmarks = bookmarksRes.rows;

		const eatenMealsRes = await db.query(
			`
					SELECT meal_id, date
					FROM users_meals
					WHERE username=$1
					`,
			[username]
		);
		const eatenMeals = {};
		eatenMealsRes.rows.map(
			(meal) =>
				(eatenMeals[meal.date] = [...eatenMeals[meal.date], meal.meal_id])
		);
		user.eatenMeals = eatenMeals;

		return user;
	}

	static async editProfile(data, username) {
		let query = "";
		let count = 1;

		Object.keys(data).map((key, idx) => {
			query += `${key}=$${count}`;
			idx === Object.keys(data).length - 1 ? (query += " ") : (query += ", ");
			count++;
		});

		const userRes = await db.query(
			`
			UPDATE users
			SET ${query}
			WHERE username=$${count}
			RETURNING username, email, first_name, last_name, api_hash, weight, weight_goal, calorie_goal
			`,
			[...Object.values(data), username]
		);

		const user = userRes.rows[0];

		const bookmarksRes = await db.query(
			`
					SELECT meal_id
					FROM bookmarks
					WHERE username=$1
					`,
			[username]
		);
		const bookmarks = bookmarksRes.rows.map((bookmark) => bookmark.meal_id);
		user.bookmarks = bookmarks;

		return user;
	}

	static async bookmarkRecipe(username, recipeId) {
		console.log(username, recipeId);
		await db.query(
			`
			INSERT INTO bookmarks (username, meal_id)
			VALUES ($1, $2)
			`,
			[username, recipeId]
		);
		return { message: "Bookmark added" };
	}

	static async unbookmarkRecipe(username, recipeId) {
		await db.query(
			`
			DELETE FROM bookmarks 
			WHERE username=$1 AND meal_id=$2
			`,
			[username, recipeId]
		);
		return { message: "Bookmark deleted" };
	}

	static async getAllBookmarks(username) {
		const results = await db.query(
			`
			SELECT * FROM bookmarks
			WHERE username=$1
			RETURNING meal_id
			`,
			[username]
		);
		return results.rows;
	}

	static async getEatenMeals(username, date) {
		console.log(189, username);
		console.log(190, date);
		const results = await db.query(
			`
			SELECT um.meal_id FROM users
			JOIN users_meals AS um 
			ON users.username = um.username
			WHERE users.username=$1 AND um.date=$2
			`,
			[username, date]
		);
		return results.rows.map((meal) => meal.meal_id);
	}

	static async addEatenMeal(username, recipeId, date) {
		await db.query(
			`
			INSERT INTO users_meals 
			(username, meal_id, date)
			VALUES ($1, $2, $3)
			`,
			[username, recipeId, date]
		);
		return { message: "Meal eaten" };
	}

	static async removeEatenMeal(username, recipeId, date) {
		await db.query(
			`
			DELETE FROM users_meals 
			WHERE username=$1 AND meal_id=$2 AND date=$3
			`,
			[username, recipeId, date]
		);
		return { message: "Bookmark deleted" };
	}
}

module.exports = User;
