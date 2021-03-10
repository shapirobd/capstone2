const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const router = new express.Router();

// route for GET all users
router.get("/", async function (req, res, next) {
	try {
		const users = await User.findAll();
		return res.json(users);
	} catch (e) {
		return next(e);
	}
});

router.get("/:username", async function (req, res, next) {
	try {
		const user = await User.findOne(req.params.username);
		return res.json(user);
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
