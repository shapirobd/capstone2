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

router.patch("/:username", async function (req, res, next) {
	try {
		console.log(req.body);
		const resp = await User.editProfile(req.body, req.params.username);
		return res.json(resp);
	} catch (e) {
		return next(e);
	}
});

router.post("/bookmarkRecipe", async function (req, res, next) {
	try {
		const { username, recipeId } = req.body;
		console.log(username, recipeId);
		const resp = await User.bookmarkRecipe(username, recipeId);
		return res.json(resp);
	} catch (e) {
		return next(e);
	}
});

router.post("/unbookmarkRecipe", async function (req, res, next) {
	try {
		const { username, recipeId } = req.body;
		const resp = await User.unbookmarkRecipe(username, recipeId);
		return res.json(resp);
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

router.get("/:username/getEatenMeals", async function (req, res, next) {
	try {
		const meals = await User.getEatenMeals(req.params.username, req.query.date);
		console.log(meals);
		return res.json(meals);
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
