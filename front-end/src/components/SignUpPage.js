import React from "react";
import { Typography, TextField, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import signup_facts from "../images/signup_facts.png";

const useStyles = makeStyles(() => ({
	root: {
		margin: "0 auto",
		width: "100%",
		height: "100%",
		flexGrow: 1,
	},
	gridItem: {
		height: "75%",
	},
	signUp: {
		backgroundColor: "white",
		padding: "35px 50px !important",
		borderRadius: "5px",
	},
	signUpFacts: {
		height: "100%",
	},
	form: {
		margin: "30px 0",
	},
	textField: {
		display: "block",
		width: "100%",
		// backgroundColor: "lightgray",
		borderRadius: "5px 5px 0 0",
		// margin: "10px 0",
	},
	button: {
		float: "right",
		margin: "15px 0 0 0",
		color: "#fff",
		backgroundColor: "#4caf50",
		"&:hover": {
			backgroundColor: "#81c784",
		},
	},
}));

const SignUpPage = () => {
	const classes = useStyles();

	return (
		// <div>
		<Grid container alignItems="center" spacing={3} className={classes.root}>
			<Grid
				item
				xs={12}
				md={6}
				className={`${classes.signUp} ${classes.gridItem}`}
			>
				<Typography variant="h4">
					<b>Sign Up</b>
				</Typography>
				<form className={classes.form}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField
								className={classes.textField}
								required
								id="firstName"
								label="First Name"
								fullWidth
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								className={classes.textField}
								required
								id="lastName"
								label="Last Name"
								fullWidth
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								className={classes.textField}
								required
								id="username"
								label="Username"
								fullWidth
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								className={classes.textField}
								required
								id="email"
								label="Email"
								type="email"
								fullWidth
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								className={classes.textField}
								required
								id="password"
								label="Password"
								type="password"
								fullWidth
								variant="outlined"
							/>
						</Grid>
					</Grid>
					<Button className={classes.button}>Submit</Button>
				</form>
			</Grid>
			<Grid item xs={12} md={6} className={classes.gridItem}>
				<img src={signup_facts} className={classes.signUpFacts} />
			</Grid>
		</Grid>
		// </div>
	);
};

export default SignUpPage;
