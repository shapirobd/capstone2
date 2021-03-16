import React from "react";
import { Link, useHistory } from "react-router-dom";
import { AppBar, Toolbar, Button, InputBase } from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles } from "@material-ui/core/styles";
import logo from "../images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actionCreators/userActionCreators";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	appBar: {
		backgroundColor: "#388e3c",
		zIndex: theme.zIndex.drawer + 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	logo: {
		height: "50px",
		margin: "4px 0 0 0",
	},
	navLink: {
		color: "#fff",
		textDecoration: "none",
	},
	signupBtn: {
		backgroundColor: "#43a047",
	},
	search: {
		position: "absolute",
		left: "50%",
		top: "50%",
		transform: "translateX(-50%) translateY(-50%)",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "30vw !important",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	input: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

const NavBar = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const user = useSelector((state) => state.user);

	const handleLogout = (evt) => {
		evt.preventDefault();
		dispatch(logout());
		history.push("/");
	};

	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					{/* <IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton> */}
					<Link to="/" className={`${classes.navLink} ${classes.title}`}>
						{/* <Typography variant="h6" className={classes.title}>
							App Name
						</Typography> */}
						<img className={classes.logo} src={logo} alt={logo} />
					</Link>
					<div className={classes.search}>
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
						/>
					</div>
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
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBar;
