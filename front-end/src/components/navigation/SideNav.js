import React from "react";
import { useStyles } from "./styles/SideNavStyles";
import {
	Button,
	SwipeableDrawer,
	List,
	Divider,
	ListItem,
	ListItemText,
	ListItemIcon,
} from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import EventNoteIcon from "@material-ui/icons/EventNote";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import KitchenIcon from "@material-ui/icons/Kitchen";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useSelector } from "react-redux";
import SideNavDrawer from "./SideNavDrawer";

const SideNav = () => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		left: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const user = useSelector((state) => state.user);

	return user ? (
		<React.Fragment>
			<Button onClick={toggleDrawer("left", true)} className={classes.toggler}>
				<ArrowRightIcon />
			</Button>
			<SideNavDrawer state={state} toggleDrawer={toggleDrawer} user={user} />
		</React.Fragment>
	) : null;
};

export default SideNav;
