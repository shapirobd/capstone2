import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
	root: {
		width: "98%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	editIcon: {
		position: "absolute",
		top: 0,
		right: 0,
		margin: "20px",
		color: "gray",
		"&:hover": {
			color: "#000",
		},
	},
	gridContainer: {
		height: "100%",
		width: "40%",
		boxShadow: "2px 2px 8px rgba(0,0,0,0.5)",
		position: "relative",
	},
	gridItem: { padding: "20px", height: "100%" },
	profPic: {
		width: "25vw",
		height: "25vw",
		borderRadius: "50%",
		backgroundColor: "lightGray",
		margin: "0 auto",
	},
	userInfo: {
		padding: "20px 0",
	},
}));
