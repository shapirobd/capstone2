import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
	root: {
		margin: "0 75px",
	},
	grid: {
		margin: "20px 0",
	},
	image: {
		width: "100%",
	},
	buttonGroup: {
		margin: "15px 0",
	},
	button: {
		color: "#fff",
		backgroundColor: "#4caf50",
		border: "1px solid #fff",
		"&:hover": {
			backgroundColor: "#81c784",
		},
	},
	main: {
		padding: "0 36px 0 0 !important",
	},
	infoPanel: {
		padding: "0 !important",
	},
}));
