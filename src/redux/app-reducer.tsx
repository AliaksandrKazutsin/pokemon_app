import { Pokemons } from '../interfaces/pokemon';
import { ACTION_TYPES } from './types';

export interface RootState {
	app: App;
}
interface App {
	getData: Pokemons;
	loading: boolean;
}
interface ActionTypes {
	type: string;
	payload: Pokemons;
}

const initialState: App = {
	getData: [],
	loading: true
};

const appReducer = (state: App = initialState, action: ActionTypes) => {
	switch (action.type) {
		case ACTION_TYPES.REQUEST_DATA:
			return {
				...state,
				getData: action.payload
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