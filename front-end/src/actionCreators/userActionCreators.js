import axios from "axios";
import { LOGIN, LOGOUT } from "../components/actionTypes";

const API_URL = "http://localhost:5000";

export const register = (data) => {
	return async (dispatch) => {
		try {
			const registerResp = await axios.post(`${API_URL}/auth/register`, data);
			const { token } = registerResp.data;
			const userResp = await axios.get(`${API_URL}/users/${data.username}`);
			dispatch(registered(token, userResp.data));
		} catch (e) {
			console.error(e);
		}
	};
};

const registered = (token, user) => {
	const {
		username,
		email,
		first_name,
		last_name,
		api_hash,
		api_username,
		bookmarks,
		weight,
		weight_goal,
		calorie_goal,
	} = user;
	return {
		type: LOGIN,
		payload: {
			token,
			user: {
				username,
				email,
				first_name,
				last_name,
				api_hash,
				api_username,
				bookmarks,
				weight,
				weight_goal,
				calorie_goal,
			},
		},
	};
};

export const login = (data) => {
	return async (dispatch) => {
		try {
			console.log("login");
			const user = await axios.post(`${API_URL}/auth/login`, data);
			console.log(user);
			const { api_hash } = user.data;
			dispatch(loggedIn(api_hash, user.data));
		} catch (e) {
			console.error(e);
		}
	};
};

const loggedIn = (token, user) => {
	const {
		username,
		email,
		first_name,
		last_name,
		api_hash,
		bookmarks,
		weight,
		weight_goal,
		calorie_goal,
	} = user;
	return {
		type: LOGIN,
		payload: {
			token,
			user: {
				username,
				email,
				first_name,
				last_name,
				api_hash,
				bookmarks,
				weight,
				weight_goal,
				calorie_goal,
			},
		},
	};
};

export const logout = () => {
	return {
		type: LOGOUT,
	};
};

export const editProfile = (username, data) => {
	return async (dispatch) => {
		try {
			const editResp = await axios.patch(`${API_URL}/users/${username}`, data);
			dispatch(edittedProfile(editResp.data));
		} catch (e) {
			console.error(e);
		}
	};
};

const edittedProfile = (user) => {
	return {
		type: "EDIT_PROFILE",
		payload: { user },
	};
};
