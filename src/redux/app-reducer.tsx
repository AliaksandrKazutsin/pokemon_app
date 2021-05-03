import Cookies from 'js-cookie';
import { Pokemons } from '../interfaces/pokemon';
import { ACTION_TYPES, LOGIN_PAGE_TYPES } from './types';

export interface RootState {
	app: App;
}
interface App {
	getData: Pokemons;
	loading: boolean;
	login: boolean;
	userEmail: string;
	userPassword: string;
	alert: any;
}
interface ActionTypes {
	type: string;
	payload: Pokemons;
}

const LOGIN_REQUEST_LS: boolean = Cookies.get('userData') ? true : false;

const initialState: App = {
	getData: [],
	loading: true,
	login: LOGIN_REQUEST_LS,
	userEmail: '',
	userPassword: '',
	alert: null,
};

const appReducer = (state: App = initialState, action: ActionTypes) => {
	switch (action.type) {
		case ACTION_TYPES.REQUEST_DATA:
			return {
				...state,
				getData: action.payload
			};
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
		case LOGIN_PAGE_TYPES.SHOW_ALERT:
			return {
				...state,
				alert: action.payload
			};
		case LOGIN_PAGE_TYPES.HIDE_ALERT:
			return {
				...state,
				alert: null
			};
		case ACTION_TYPES.SHOW_LOADER:
			return {
				...state,
				loading: true
			};
		case ACTION_TYPES.HIDE_LOADER:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
};

export default appReducer;