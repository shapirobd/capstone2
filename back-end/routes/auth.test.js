process.env.NODE_ENV === "test";

const app = require("../app");
const request = require("supertest");
const User = require("../models/user");
const axios = require("axios");
const { Client } = require("pg");
const { DB_URI } = require("../config");

let db = new Client({
	connectionString: DB_URI,
});

db.connect();

const user = {
	username: "username1",
	password: "password1",
	email: "email1@gmail.com",
	first_name: "Bob",
	last_name: "Smith",
	weight: 170,
	weight_goal: 160,
	calorie_goal: 2000,
};

beforeEach(async () => {
	await db.query("DELETE FROM users_meals");
	await db.query("DELETE FROM bookmarks");
	await db.query("DELETE FROM users");
});

describe("POST /register route", () => {
	it("should return an object containing a token if the user registers successfully", async () => {
		const resp = await request(app).post("/auth/register").send(user);
		expect(resp.body).toEqual({
			username: user.username,
			email: user.email,
			first_name: user.first_name,
			last_name: user.last_name,
			weight: user.weight,
			weight_goal: user.weight_goal,
			calorie_goal: user.calorie_goal,
		});
	});
});

describe("POST /login route", () => {
	it("should return object containing info on user if password is correct", async () => {
		await User.register(user);
		const resp = await request(app)
			.post("/auth/login")
			.send({ username: user.username, password: user.password });
		expect(resp.body).toEqual({
			username: user.username,
			email: user.email,
			first_name: user.first_name,
			last_name: user.last_name,
			weight: user.weight,
			weight_goal: user.weight_goal,
			calorie_goal: user.calorie_goal,
			bookmarks: [],
			eatenMeals: {},
		});
	});

	it("should throw 404 error if username is not found", async () => {
		await User.register(user);
		const resp = await request(app)
			.post("/auth/login")
			.send({ username: user.username + "INCORRECT", password: user.password });

		expect(resp.status).toEqual(404);
		expect(resp.body.message).toEqual("User not found");
	});

	it("should throw 404 error if password is incorrect", async () => {
		await User.register(user);
		const resp = await request(app)
			.post("/auth/login")
			.send({ username: user.username, password: user.password + "INCORRECT" });

		expect(resp.status).toEqual(404);
		expect(resp.body.message).toEqual("User not found");
	});
});

afterAll(async () => {
	await db.end();
});
