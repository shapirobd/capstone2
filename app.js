const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const express = require("express");
const ExpressError = require("./expressError");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

// 404 handler
app.use(function (req, res, next) {
	console.log(req);
	const err = new ExpressError(`Not found`, 404);
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

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "./front-end/build")));

// Handle GET requests to /api route
// app.get("/api", (req, res) => {
// 	res.json({ message: "Hello from server!" });
// });

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./front-end/build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
	console.log("Server listening on port 5000.");
});

module.exports = app;
