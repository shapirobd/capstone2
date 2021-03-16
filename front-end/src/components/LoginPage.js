import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoginForm from "./LoginForm";

const useStyles = makeStyles(() => ({
	root: {
		margin: "0 auto",
		width: "100%",
		height: "100%",
		flexGrow: 1,
	},
	login: {
		backgroundColor: "white",
		padding: "35px 50px !important",
		borderRadius: "5px",
	},
}));

const LoginPage = () => {
	const classes = useStyles();

	return (
		<Grid
			container
			alignItems="center"
			justify="center"
			className={classes.root}
		>
			<Grid item xs={12} sm={8} lg={6} className={classes.login}>
				<Typography variant="h4">Login</Typography>
				<LoginForm />
			</Grid>
		</Grid>
	);
};

export default LoginPage;
