import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
	submitBtn: {
		backgroundColor: "#4caf50",
		color: "#fff",
		"&:hover": {
			backgroundColor: "#81c784",
		},
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
	},
	rightGridItem: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	ingredients: {
		boxShadow: "-2px -2px 10px black",
		backgroundColor: "#fff",
		borderRadius: "5px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		height: "90%",
		width: "80%",
		position: "relative",
		backgroundColor: "none",
	},
}));
