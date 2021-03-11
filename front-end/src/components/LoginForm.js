import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { login } from "../actionCreators/userActionCreators";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
	form: {
		margin: "30px 0",
	},
	textField: {
		display: "block",
		width: "100%",
		// backgroundColor: "lightgray",
		borderRadius: "5px 5px 0 0",
		margin: "10px 0",
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

const LoginForm = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const INITIAL_FORM_DATA = {
		username: "",
		password: "",
	};
	const [formData, setFormData] = useState(INITIAL_FORM_DATA);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(login(formData));
		setFormData(INITIAL_FORM_DATA);
		history.push("/");
	};

	return (
		<form onSubmit={handleSubmit} className={classes.form}>
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
			<Button type="submit" className={classes.button}>
				Login
			</Button>
		</form>
	);
};

export default LoginForm;
