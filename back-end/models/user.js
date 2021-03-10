const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");

class User {
	static async register({ username, password, email, first_name, last_name }) {
		const hashedPwd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
		const results = await db.query(
			`
            INSERT INTO users (username, password, email, first_name, last_name)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING username, email, first_name, last_name
        `,
			[username, hashedPwd, email, first_name, last_name]
		);
		return results.rows[0];
	}

	static async authenticate({ username, password }) {
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
				return true;
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
