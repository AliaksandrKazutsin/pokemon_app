import { createSelector } from 'reselect';
import { RootState } from './app-reducer';
import { RootStateInnerContent } from './inner-content-reducer';

const loader = (state: RootState) => state.app.loading;
const pokemonData = (state: RootState) => state.app.getData;

const rebuildItems = (state: RootStateInnerContent) => state.innerContent.rebuildDesign;
const loaderButton = (state: RootStateInnerContent) => state.innerContent.buttonLoader;
const notification = (state: RootStateInnerContent) => state.innerContent.notification;
const addCountItems = (state: RootStateInnerContent) => state.innerContent.paginatedItems;

export const getLoader = createSelector(
	loader,
	loading => loading
);

export const getPokemonData = createSelector(
	pokemonData,
	getData => getData
);

export const getRebuildDesign = createSelector(
	rebuildItems,
	rebuildDesign => rebuildDesign
);

export const getButtonLoader = createSelector(
	loaderButton,
	buttonLoader => buttonLoader
);

export const getNotification = createSelector(
	notification,
	notification => notification
);

export const getPaginatedItems = createSelector(
	addCountItems,
	(paginateItems) => {
		if (paginateItems <= 20) {
			return paginateItems;
		}
		if (paginateItems > 20) {
			console.log("We have not pokemons more...");
			return paginateItems;
		}
	}
);  