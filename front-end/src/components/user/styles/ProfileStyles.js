import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
	root: {
		width: "98%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	gridContainer: {
		height: "90%",
		width: "90%",
		boxShadow: "2px 2px 8px rgba(0,0,0,0.5)",
	},
	gridItem: { padding: "20px", height: "100%" },
	profPic: {
		width: "100%",
		height: "62%",
		borderRadius: "50%",
		backgroundColor: "lightGray",
	},
	userInfo: {
		padding: "20px 0",
	},
}));
