import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Typography, TextField, FormControl, Grid } from "@material-ui/core";
import Select from "@material-ui/core/Select";

const ALL_DIETS = [
	"gluten free",
	"ketogenic",
	"vegetarian",
	"lacto vegetarian",
	"ovo vegetarian",
	"lacto ovo vegetarian",
	"vegan",
	"pescetarian",
	"paleo",
	"primal",
	"whole30",
];

const ALL_MACROS = ["Fat", "Protein", "Carbohydrates"];

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		margin: "0 0 10px 0",
		padding: "20px",
		justifyContent: "left",
		backgroundColor: "#fff",
		boxShadow: "2px 2px 3px lightgray",
		maxHeight: "40vh",
	},
	list: {
		columnCount: 2,
	},
	listTitle: {
		width: "100%",
	},
	listItem: {
		verticalAlign: "top",
	},
	checkbox: {
		padding: 0,
	},
	textField: {
		padding: "5px 0",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
	},
	selectOption: {
		margin: "5px",
	},
}));

const FilterPanel = () => {
	const classes = useStyles();

	const [checked, setChecked] = React.useState([0]);

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

	return (
		<div className={classes.root}>
			<div style={{ float: "left", width: "50%" }}>
				<Typography>Diets</Typography>
				<List className={classes.list}>
					{ALL_DIETS.map((diet, idx) => {
						const labelId = `checkbox-list-label-${idx}`;

						return (
							<ListItem
								key={diet}
								role={undefined}
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
			<div style={{ float: "left", width: "50%" }}>
				<Typography>Macros</Typography>

				{ALL_MACROS.map((macro, idx) => {
					const labelId = `checkbox-list-label-${idx}`;
					return (
						<Grid container cols={2} spacing={2} alignItems="flex-end">
							<Grid
								item
								key={macro}
								onClick={handleToggle(macro)}
								// className={classes.textField}
								cols={1}
								md={3}
							>
								<Select size="small" label="Comparison" fullWidth>
									<option value={"<"} className={classes.selectOption}>
										Less than
									</option>
									<option value={">"} className={classes.selectOption}>
										Greater than
									</option>
									<option value={"==="} className={classes.selectOption}>
										Equal to
									</option>
								</Select>
							</Grid>
							<Grid
								item
								key={macro}
								onClick={handleToggle(macro)}
								// className={classes.textField}
								cols={1}
								md={3}
							>
								<TextField size="small" label={macro} />
							</Grid>
							<Grid
								item
								key={macro}
								onClick={handleToggle(macro)}
								// className={classes.textField}
								cols={1}
								md={3}
							>
								<Typography style={{ display: "inline" }}>grams</Typography>
							</Grid>
						</Grid>
					);
				})}
			</div>
		</div>
	);
};

export default FilterPanel;
