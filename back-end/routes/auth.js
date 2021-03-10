const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const router = new express.Router();

// POST route to login a new user
router.post("/login", async function (req, res, next) {
	try {
		const { username, password } = req.body;
		if (User.authenticate(username, password)) {
			const token = jwt.sign({ username }, SECRET_KEY);
			return res.json({ token });
		}
	} catch (e) {
		return next(e);
	}
});

// POST route to register a new user
router.post("/register", async function (req, res, next) {
	try {
		const user = await User.register(req.body);
		if (await User.authenticate(user.username, req.body.password)) {
			const token = jwt.sign({ username }, SECRET_KEY);
			return res.json({ token });
		}
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
