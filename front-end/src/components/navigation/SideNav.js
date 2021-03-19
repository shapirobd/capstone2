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
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import KitchenIcon from "@material-ui/icons/Kitchen";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
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

	const list = (anchor) => (
		<div
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
