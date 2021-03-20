import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
	root: {
		width: "98%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		float: "right",
	},
	calendar: {
		border: "none",
	},
	rightGridItem: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
	},
	buttonGroup: {
		width: "100%",
	},
	button: {
		width: "33%",
	},
	barChart: {
		width: "100%",
	},
}));
