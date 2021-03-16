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
			},
		},
	};
};

export const login = (data) => {
	return async (dispatch) => {
		try {
			const user = await axios.post(`${API_URL}/auth/login`, data);
			const { api_hash } = user.data;
			dispatch(loggedIn(api_hash, user.data));
		} catch (e) {
			console.error(e);
		}
	};
};

const loggedIn = (token, user) => {
	const { username, email, first_name, last_name, api_hash, bookmarks } = user;
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
			},
		},
	};
};

export const logout = () => {
	return {
		type: LOGOUT,
	};
};
