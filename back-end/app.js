const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const express = require("express");
const ExpressError = require("./expressError");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

// 404 handler
app.use(function (req, res, next) {
	const err = new ExpressError("Not found", 404);
	return next(err);
});

// general error handler
app.use(function (err, req, res, next) {
	res.status(err.status || 500);

	return res.json({
		error: err,
		message: err.message,
	});
});

module.exports = app;
