import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
	root: {
		margin: "0 auto",
		width: "100%",
		height: "100%",
		flexGrow: 1,
	},
	gridItem: {
		height: "75%",
	},
	signUp: {
		backgroundColor: "white",
		padding: "35px 50px !important",
		borderRadius: "5px",
	},
	signUpFacts: {
		width: "100%",
	},
}));
