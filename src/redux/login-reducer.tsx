import { LOGIN_PAGE_TYPES } from "./types";

export interface RootStateLoginPage {
	loginPage: LoginPage;
}

interface LoginPage {
	login: boolean;
	userEmail: string;
	userPassword: string;
}

interface ActionTypes {
	payload: LoginPage;
	type: string;
}

const initialState: LoginPage = {
	login: false,
	userEmail: '',
	userPassword: '',
};

const loginPage = (state: LoginPage = initialState, action: ActionTypes) => {
	switch (action.type) {
		case LOGIN_PAGE_TYPES.LOGIN_PAGE:
			return {
				...state,
				login: true
			};
		case LOGIN_PAGE_TYPES.USER_DATA:
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
};

export default loginPage;