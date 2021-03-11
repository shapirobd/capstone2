import axios from "axios";
import { LOGIN, LOGOUT } from "../components/actionTypes";

const API_URL = "http://localhost:5000";

export const login = (data) => {
	return async (dispatch) => {
		try {
			console.log(data);
			const loginResp = await axios.post(`${API_URL}/auth/login`, data);
			console.log(loginResp);
			const { token } = loginResp.data;
			const userResp = await axios.get(`${API_URL}/users/${data.username}`);
			dispatch(loggedIn(token, userResp.data));
		} catch (e) {
			console.error(e);
		}
	};
};

const loggedIn = (token, user) => {
	const { username, email, first_name, last_name } = user;
	return {
		type: LOGIN,
		payload: {
			token,
			user: {
				username,
				email,
				first_name,
				last_name,
			},
		},
	};
};

export const logout = () => {
	return {
		type: LOGOUT,
	};
};
