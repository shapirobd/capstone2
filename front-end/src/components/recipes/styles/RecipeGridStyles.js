import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		width: "95%",
	},
	gridList: {
		display: "flex",
		flexDirection: "row",
		width: "max-content",
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
	},
	img: {
		width: "100%",
	},
	missingIngredients0: {
		width: "20%",
		top: 0,
		right: 0,
		backgroundColor: "#378e3c",
		borderBottomRightRadius: "15px",
		width: "30%",
		boxShadow: "2px 2px 8px rgba(0,0,0,0.5)",
	},
	missingIngredients1: {
		width: "20%",
		top: 0,
		right: 0,
		backgroundColor: "#cddc39",
		borderBottomRightRadius: "15px",
		width: "30%",
		boxShadow: "2px 2px 8px rgba(0,0,0,0.5)",
		"& > div": {
			color: "#333",
		},
	},
	missingIngredients2: {
		width: "20%",
		top: 0,
		right: 0,
		backgroundColor: "#ffc107",
		// color: "#000 !important",
		borderBottomRightRadius: "15px",
		width: "30%",
		boxShadow: "2px 2px 8px rgba(0,0,0,0.5)",
		"& > div": {
			color: "#333",
		},
	},
	missingIngredients3: {
		width: "20%",
		top: 0,
		right: 0,
		backgroundColor: "#ff7722",
		borderBottomRightRadius: "15px",
		width: "30%",
		boxShadow: "2px 2px 8px rgba(0,0,0,0.5)",
	},
	missingIngredients4: {
		width: "20%",
		top: 0,
		right: 0,
		backgroundColor: "#e83935",
		borderBottomRightRadius: "15px",
		width: "30%",
		boxShadow: "2px 2px 8px rgba(0,0,0,0.5)",
	},
}));
