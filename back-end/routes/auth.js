const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const router = new express.Router();

// POST route to login a new user
router.post("/login", async function (req, res, next) {
	try {
		const { username, password } = req.body;
		const user = User.authenticate(username, password);
		if (user) {
			const user = jwt.sign({ username }, SECRET_KEY);
			return res.json({ token: user.api_hash });
		}
	} catch (e) {
		return next(e);
	}
});

// POST route to register a new user
router.post("/register", async function (req, res, next) {
	try {
		const user = await User.register(req.body);
		return res.json({ token: user.api_hash });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
