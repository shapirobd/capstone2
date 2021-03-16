import React from "react";
import EcoIcon from "@material-ui/icons/Eco";
import { makeStyles } from "@material-ui/core/styles";
import {
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
	root: {
		margin: "0 0 20px 0",
		backgroundColor: "#fff",
		padding: "20px",
		boxShadow: "2px 3px 3px lightgray",
	},
	avatar: {
		backgroundColor: "#388e3c",
	},
}));

const DietList = ({ diets }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<List>
				{diets.map((diet) => (
					<ListItem key={diet}>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<EcoIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={diet.toUpperCase()} />
					</ListItem>
				))}
			</List>
		</div>
	);
};

export default DietList;
