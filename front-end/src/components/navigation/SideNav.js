import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
// import AppBar from "@material-ui/core/AppBar";
// import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
// import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import EventNoteIcon from "@material-ui/icons/EventNote";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import KitchenIcon from "@material-ui/icons/Kitchen";
// import { Button } from "@material-ui/core";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
		minWidth: "10px",
		padding: "0",
		backgroundColor: "white",
		position: "absolute",
		left: "0",
		boxShadow: "2px 2px 3px lightgray",
		zIndex: "1200",
	},
}));

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

	const list = (anchor) => (
		<div
			// className={clsx(classes.list, {
			// 	[classes.fullList]: anchor === "top" || anchor === "bottom",
			// })}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <KitchenIcon /> : <SettingsIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["All mail", "Trash", "Spam"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <KitchenIcon /> : <SettingsIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	const user = useSelector((state) => state.user);

	return user ? (
		<React.Fragment>
			<Button
				onClick={toggleDrawer("left", true)}
				className={classes.toggler}
			></Button>
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
						<ListItem button>
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
						<ListItem button>
							<ListItemIcon>
								<SettingsIcon />
							</ListItemIcon>
							<ListItemText primary="Settings" />
						</ListItem>
					</List>
				</div>
			</SwipeableDrawer>
		</React.Fragment>
	) : null;
};

export default SideNav;
