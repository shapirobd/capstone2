import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		// backgroundImage: "linear-gradient(#c8e6c9, #fff)",
		backgroundColor: "#fff",
		flexWrap: "wrap",
		margin: "0 0 10px 0",
		padding: "20px",
		justifyContent: "left",
		boxShadow: "2px 2px 3px lightgray",
		maxHeight: "40vh",
	},
	button: {
		float: "right",
		backgroundColor: "#4caf50",
		color: "#fff",
		"&:hover": {
			backgroundColor: "#81c784",
		},
		marginLeft: "20px",
	},
	resetButton: {
		float: "right",
		backgroundColor: "#f50257",
		color: "#fff",
		"&:hover": {
			backgroundColor: "#ff4667",
		},
		marginLeft: "20px",
	},
}));
