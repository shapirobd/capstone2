import React, { useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { useStyles } from "./styles/SignUpPageStyles";
import signup_facts from "../../images/signup_facts.png";
import SignUpForm from "./SignUpForm";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../actionCreators/userActionCreators";

const SignUpPage = () => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();

	const INITIAL_FORM_DATA = {
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: "",
	};
	const [formData, setFormData] = useState(INITIAL_FORM_DATA);

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((formData) => ({
			...formData,
			[name]: value,
		}));
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		console.log("1:", formData);
		dispatch(register(formData));
		history.push("/");
	};

	return (
		<Grid
			container
			alignItems="center"
			cols={2}
			spacing={3}
			className={classes.root}
		>
			<Grid
				item
				cols={1}
				xs={12}
				md={6}
				className={`${classes.signUp} ${classes.gridItem}`}
			>
				<Typography variant="h4">
					<b>Sign Up</b>
				</Typography>
				<SignUpForm handleChange={handleChange} handleSubmit={handleSubmit} />
			</Grid>
			<Grid cols={1} item xs={12} md={6} className={classes.gridItem}>
				<img
					src={signup_facts}
					className={classes.signUpFacts}
					alt={signup_facts}
				/>
			</Grid>
		</Grid>
	);
};

export default SignUpPage;
