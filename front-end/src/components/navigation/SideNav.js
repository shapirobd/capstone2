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
			<SwipeableDrawer
				anchor={"left"}
				open={state["left"]}
				onClose={toggleDrawer("left", false)}
				onOpen={toggleDrawer("left", true)}
				className={classes.drawer}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerContainer}>
					<List>
						<ListItem button component="a" href={`/ingredients`}>
							<ListItemIcon>
								<KitchenIcon />
							</ListItemIcon>
							<ListItemText primary="My Kitchen" />
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListItem button component="a" href={`/bookmarks/${user.username}`}>
							<ListItemIcon>
								<BookmarkIcon />
							</ListItemIcon>
							<ListItemText primary="Bookmarks" />
						</ListItem>
						<ListItem button component="a" href={`/tracker`}>
							<ListItemIcon>
								<EventNoteIcon />
							</ListItemIcon>
							<ListItemText primary="Food Tracker" />
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListItem button component="a" href={`/user/${user.username}`}>
							<ListItemIcon>
								<AccountCircleIcon />
							</ListItemIcon>
							<ListItemText primary="Profile" />
						</ListItem>
						<ListItem button component="a" href={`/logout`}>
							<ListItemIcon>
								<ExitToAppIcon color="error" />
							</ListItemIcon>
							<ListItemText
								primaryTypographyProps={{ color: "error" }}
								primary="Logout"
							/>
						</ListItem>
					</List>
				</div>
			</SwipeableDrawer>
		</React.Fragment>
	) : null;
};

export default SideNav;
