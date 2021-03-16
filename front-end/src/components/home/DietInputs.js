import React, { useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	list: {
		columnCount: 2,
	},
	listItem: {
		verticalAlign: "top",
	},
	checkbox: {
		padding: 0,
	},
}));

const DietInputs = ({ allDiets, setFormData }) => {
	const classes = useStyles();

	const [checked, setChecked] = React.useState([]);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	useEffect(() => {
		setFormData((formData) => ({
			...formData,
			diets: checked,
		}));
	}, [checked]);

	return (
		<div style={{ float: "left", width: "50%" }}>
			<Typography>Diets</Typography>
			<List className={classes.list}>
				{allDiets.map((diet, idx) => {
					const labelId = `checkbox-list-label-${idx}`;

					return (
						<ListItem
							key={diet}
							// role={undefined}
							dense
							// button
							onClick={handleToggle(diet)}
							className={classes.listItem}
						>
							<ListItemIcon>
								<Checkbox
									edge="start"
									checked={checked.indexOf(diet) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ "aria-labelledby": labelId }}
									className={classes.checkbox}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={diet.toUpperCase()} />
						</ListItem>
					);
				})}
			</List>
		</div>
	);
};

export default DietInputs;
