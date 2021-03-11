import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import WelcomePage from "./WelcomePage";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import Profile from "./Profile";
import Recipe from "./Recipe";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
	root: {
		// height: "93vh",
		padding: "100px 0 0 0 ",
	},
}));

// Defines the routes that allow the user to navigate through the application
const Routes = () => {
	const classes = useStyles();
	const user = useSelector((state) => state.user);

	return (
		<Container maxWidth="xl" className={classes.root}>
			<Switch>
				<Route exact path="/">
					{user ? <HomePage /> : <WelcomePage />}
				</Route>
				<Route exact path="/signup">
					<SignUpPage />
				</Route>
				<Route exact path="/login">
					<LoginPage />
				</Route>
				<Route exact path="/logout" />
				<Route path="/user/:username">
					<Profile />
				</Route>
				<Route path="/recipes/:recipeId">
					<Recipe />
				</Route>
			</Switch>
		</Container>
	);
};

export default Routes;
