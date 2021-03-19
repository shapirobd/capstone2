import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
	root: {
		display: "flex",
		justifyContent: "space-around",
	},
	pagination: {
		margin: "10px auto",
		width: "fit-content",
	},
}));
