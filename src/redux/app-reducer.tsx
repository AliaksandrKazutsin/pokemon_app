import { Pokemons } from '../interfaces/pokemon';
import { HIDE_LOADER, REQUEST_DATA, SHOW_LOADER } from '../redux/types';

export interface RootState {
	getData: Pokemons;
	loading: boolean;
}

const initialState: RootState = {
	getData: [],
	loading: true
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_DATA:
			return {
				...state,
				getData: action.payload
			};
		case SHOW_LOADER:
			return {
				...state,
				loading: false
			};

		case HIDE_LOADER:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
};

export default appReducer;