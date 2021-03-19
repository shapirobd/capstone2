const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const { default: axios } = require("axios");

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
                last_name,
            FROM users 
            WHERE username=$1
            `,
			[username]
		);
		const bookmarksRes = await db.query(
			`
			SELECT meal_id
			FROM bookmarks
			WHERE username=$1
			`,
			[username]
		);
		userRes.rows[0].bookmarks = bookmarksRes.rows;

		return userRes.rows[0];
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
}

module.exports = User;
