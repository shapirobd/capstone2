import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "./styles/NavBarStyles";
import logo from "../../images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actionCreators/userActionCreators";
import { loadFeed } from "../../actionCreators/recipeActionCreators";

const NavBar = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

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

	const [searchData, setSearchData] = useState("");

	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Link to="/" className={`${classes.navLink} ${classes.title}`}>
						<img className={classes.logo} src={logo} alt={logo} />
					</Link>
					<form className={classes.search} onSubmit={handleSearch}>
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
