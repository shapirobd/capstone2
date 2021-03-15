const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const { default: axios } = require("axios");

class User {
	static async register({ username, password, email, first_name, last_name }) {
		const hashedPwd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
		const apiResp = await axios.post(
			`https://api.spoonacular.com/users/connect?apiKey=73baf9bb95a14f5fb4d71e2f12ab8479`,
			{}
		);
		const api_hash = apiResp.data.hash;
		const api_username = apiResp.data.username;
		const results = await db.query(
			`
            INSERT INTO users (username, password, email, first_name, last_name, api_hash, api_username)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING username, email, first_name, last_name, api_hash, api_username
        `,
			[
				username,
				hashedPwd,
				email,
				first_name,
				last_name,
				api_hash,
				api_username,
			]
		);
		return results.rows[0];
	}

	static async authenticate(username, password) {
		const results = await db.query(
			`
            SELECT * 
            FROM users
            WHERE username=$1
        `,
			[username]
		);
		const user = results.rows[0];
		if (user) {
			if (await bcrypt.compare(password, user.password)) {
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

		return userRes.rows[0];
	}
}

module.exports = User;
