import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
	},
	gridList: {
		width: "max-content",
		justifyContent: "center",
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
	},
	img: {
		width: "100%",
	},
	ingredientStatsMissing: {
		width: "20%",
		top: 0,
		right: 0,
		backgroundColor: "#f50257",
		borderBottomRightRadius: "15px",
		width: "30%",
		boxShadow: "2px 2px 8px rgba(0,0,0,0.5)",
	},
	ingredientStatsSuccess: {
		width: "20%",
		top: 0,
		right: 0,
		backgroundColor: "#378e3c",
		borderBottomRightRadius: "15px",
		width: "30%",
		boxShadow: "2px 2px 8px rgba(0,0,0,0.5)",
	},
}));
