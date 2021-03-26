import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	Button,
	InputBase,
	IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from "./styles/NavBarStyles";
import logo from "../../images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actionCreators/userActionCreators";
import { loadFeed } from "../../actionCreators/recipeActionCreators";
import useWindowDimensions from "../../customHooks/getWindowDimensions";
import SideNavDrawer from "./SideNavDrawer";

const NavBar = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const { width } = useWindowDimensions();

	const user = useSelector((state) => state.user);

	const handleLogout = (evt) => {
		evt.preventDefault();
		dispatch(logout());
		history.push("/");
	};

	const handleChange = (evt) => {
		setSearchData(evt.target.value);
	};

	const handleSearch = (evt) => {
		evt.preventDefault();
		dispatch(loadFeed(1, searchData));
		if (location.pathname !== "/") {
			history.push("/");
		}
	};

	const [state, setState] = React.useState({
		left: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		console.log("TOGGLE");
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		console.log("STILL GOING");
		setState({ ...state, [anchor]: open });
	};

	const [searchData, setSearchData] = useState("");

	return (
		<div className={classes.root}>
			{console.log(width)}
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar classes={{ root: classes.root }}>
					{width <= 599 ? (
						<>
							<IconButton
								edge="start"
								className={classes.menuButton}
								color="inherit"
								aria-label="open drawer"
								onClick={toggleDrawer("left", true)}
							>
								<MenuIcon />
							</IconButton>
							<SideNavDrawer
								state={state}
								toggleDrawer={toggleDrawer}
								user={user}
								mobile={true}
							/>
						</>
					) : null}
					{width > 599 ? (
						<Link to="/" className={`${classes.navLink} ${classes.title}`}>
							<img className={classes.logo} src={logo} alt={logo} />
						</Link>
					) : null}

					<form
						className={width <= 599 ? classes.searchMobile : classes.search}
						onSubmit={handleSearch}
					>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.input,
							}}
							inputProps={{ "aria-label": "search" }}
							onChange={handleChange}
						/>
					</form>
					<div style={{ float: "right" }}>
						{user ? (
							<>
								<Button
									onClick={handleLogout}
									color="inherit"
									className={classes.navLink}
								>
									Logout
								</Button>
							</>
						) : (
							<>
								<Link to="/login" className={classes.navLink}>
									<Button color="inherit">Login</Button>
								</Link>
								<Link to="/signup" className={classes.navLink}>
									<Button color="inherit" className={classes.signupBtn}>
										Sign up
									</Button>
								</Link>
							</>
						)}
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBar;
