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
		console.log(user);
		return res.json(user);
	} catch (e) {
		return next(e);
	}
});

router.post("/bookmarkRecipe", async function (req, res, next) {
	try {
		const { username, recipeId } = req.body;
		console.log(username, recipeId);
		await User.bookmarkRecipe(username, recipeId);
	} catch (e) {
		return next(e);
	}
});

router.post("/unbookmarkRecipe", async function (req, res, next) {
	try {
		const { username, recipeId } = req.body;
		await User.unbookmarkRecipe(username, recipeId);
	} catch (e) {
		return next(e);
	}
});

router.get("/:username/getAllBookmarks", async function (req, res, next) {
	try {
		const recipes = await User.getAllBookmarks(req.params.username);
		return res.json(recipes);
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
