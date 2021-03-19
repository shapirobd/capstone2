import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
