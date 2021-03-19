import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: "auto",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	toggler: {
		height: "92vh",
		minWidth: "2%",
		padding: "0",
		backgroundColor: "#fff",
		position: "absolute",
		left: "0",
		boxShadow: "2px 2px 3px black",
		zIndex: "1200",
		"&:hover": {
			backgroundColor: "#fff",
		},
		borderRadius: "0px",
	},
}));
