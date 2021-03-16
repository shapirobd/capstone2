import React from "react";
import { makeStyles } from "@material-ui/core";
import {
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	Divider,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
	root: {
		margin: "0 0 20px 0",
		backgroundColor: "#fff",
		padding: "20px",
		boxShadow: "2px 3px 3px lightgray",
	},
	step: {
		margin: "20px 0",
	},
}));

const RecipeSteps = ({ steps }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant="h5">Steps</Typography>
			<List>
				{steps.map((step) => (
					<div key={step.number}>
						<Divider />
						<ListItem alignItems="flex-start" className={classes.step}>
							<ListItemAvatar>
								<Avatar>{step.number}</Avatar>
							</ListItemAvatar>
							<ListItemText>{step.step}</ListItemText>
						</ListItem>
					</div>
				))}
			</List>
		</div>
	);
};

export default RecipeSteps;
