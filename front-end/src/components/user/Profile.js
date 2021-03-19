import React from "react";
import { useStyles } from "./styles/ProfileStyles";
import { Grid, Divider, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const Profile = () => {
	const classes = useStyles();
	const user = useSelector((state) => state.user);
	console.log(user);

	return (
		<div className={classes.root}>
			<Grid
				container
				cols={2}
				spacing={10}
				justify="space-around"
				className={classes.gridContainer}
				alignItems="center"
			>
				<Grid item cols={1} md={4} className={classes.gridItem}>
					<div className={classes.profPic}></div>
					<div className={classes.userInfo}>
						<Typography
							variant="h6"
							style={{ textAlign: "center", margin: "20px 0" }}
						>
							{user.username}
						</Typography>
						<Typography>
							Name: {user.first_name} {user.last_name}
						</Typography>
						<Typography>Email: {user.email}</Typography>
					</div>
				</Grid>
				<Divider style={{ height: "90%", width: "1px" }} />
				<Grid item cols={1} md={7} className={classes.gridItem}>
					<Typography>Weight: {user.weight}</Typography>
					<Typography>Weight Goal: {user.weight_goal}</Typography>
					<Typography>Calorie Goal: {user.calorie_goal}</Typography>
				</Grid>
			</Grid>
		</div>
	);
};

export default Profile;
