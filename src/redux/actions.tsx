import { createAction } from 'redux-actions';
import { ACTION_TYPES, INNER_CONTENT_TYPES } from "./types";

export const fetchData = createAction(ACTION_TYPES.FETCH_DATA as typeof ACTION_TYPES.FETCH_DATA);
export const showLoader = createAction(ACTION_TYPES.SHOW_LOADER as typeof ACTION_TYPES.SHOW_LOADER);
export const hideLoader = createAction(ACTION_TYPES.HIDE_LOADER as typeof ACTION_TYPES.HIDE_LOADER);

export const rebuildPokemonDesign = createAction(INNER_CONTENT_TYPES.REBUILD_DESIGN as typeof INNER_CONTENT_TYPES.REBUILD_DESIGN);
export const showButtonLoader = createAction(INNER_CONTENT_TYPES.SHOW_BUTTON_LOADER as typeof INNER_CONTENT_TYPES.SHOW_BUTTON_LOADER);
export const showNotification = createAction(INNER_CONTENT_TYPES.NOTIFICATION as typeof INNER_CONTENT_TYPES.NOTIFICATION);
export const addPaginatedItems = createAction(INNER_CONTENT_TYPES.ADD_PAGINATED_ITEMS as typeof INNER_CONTENT_TYPES.ADD_PAGINATED_ITEMS);