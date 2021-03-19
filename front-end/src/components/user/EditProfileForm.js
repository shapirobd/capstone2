import React, { useState } from "react";
import { useStyles } from "./styles/EditProfileFormStyles";
import { TextField, Button } from "@material-ui/core";
import { editProfile } from "../../actionCreators/userActionCreators";
import { useDispatch } from "react-redux";

const capitalize = (text) => {
	return text
		.replace("_", " ")
		.split(" ")
		.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(" ");
};

const EditProfileForm = ({ user, setEditting }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		first_name: user.first_name,
		last_name: user.last_name,
		email: user.email,
		weight: user.weight,
		weight_goal: user.weight_goal,
		calorie_goal: user.calorie_goal,
	});

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((formData) => ({
			...formData,
			[name]: value,
		}));
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		dispatch(editProfile(user.username, formData));
		setEditting(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			{Object.keys(user).map((key) =>
				key !== "username" && key !== "bookmarks" && key !== "api_hash" ? (
					<TextField
						variant="outlined"
						name={key}
						id={key}
						label={capitalize(key)}
						value={formData[key]}
						className={classes.textField}
						onChange={handleChange}
					/>
				) : null
			)}
			<Button type="submit" className={classes.button}>
				Submit
			</Button>
		</form>
	);
};

export default EditProfileForm;
