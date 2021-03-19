import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { useStyles } from "./styles/SignUpFormStyles";

const SignUpFormTwo = ({ handleSubmit, handleChange }) => {
	const classes = useStyles();
	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						className={classes.textField}
						required
						id="weight"
						name="weight"
						label="Weight"
						fullWidth
						variant="outlined"
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						className={classes.textField}
						required
						id="weight_goal"
						name="weight_goal"
						label="Weight Goal"
						fullWidth
						variant="outlined"
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						className={classes.textField}
						required
						id="calorie_goal"
						name="calorie_goal"
						label="Calorie Goal"
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

export default SignUpFormTwo;
