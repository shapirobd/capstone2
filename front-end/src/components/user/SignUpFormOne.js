import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { useStyles } from "./styles/SignUpFormStyles";

const SignUpFormOne = ({ handleSubmit, handleChange }) => {
	const classes = useStyles();
	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						className={classes.textField}
						required
						id="first_name"
						name="first_name"
						label="First Name"
						fullWidth
						variant="outlined"
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						className={classes.textField}
						required
						id="last_name"
						name="last_name"
						label="Last Name"
						fullWidth
						variant="outlined"
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						className={classes.textField}
						required
						id="username"
						name="username"
						label="Username"
						fullWidth
						variant="outlined"
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						className={classes.textField}
						required
						id="email"
						name="email"
						label="Email"
						type="email"
						fullWidth
						variant="outlined"
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						className={classes.textField}
						required
						id="password"
						name="password"
						label="Password"
						type="password"
						fullWidth
						variant="outlined"
						onChange={handleChange}
					/>
				</Grid>
			</Grid>
			{/* <Button type="submit" className={classes.button}>
				Submit
			</Button> */}
		</form>
	);
};

export default SignUpFormOne;
