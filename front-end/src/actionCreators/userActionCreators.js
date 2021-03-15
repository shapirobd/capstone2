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
			},
		},
	};
};

export const login = (data) => {
	return async (dispatch) => {
		try {
			const loginResp = await axios.post(`${API_URL}/auth/login`, data);
			const { token } = loginResp.data;
			const userResp = await axios.get(`${API_URL}/users/${data.username}`);
			dispatch(loggedIn(token, userResp.data));
		} catch (e) {
			console.error(e);
		}
	};
};

const loggedIn = (token, user) => {
	const { username, email, first_name, last_name, api_hash } = user;
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
			},
		},
	};
};

export const logout = () => {
	return {
		type: LOGOUT,
	};
};
