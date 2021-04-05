import { INNER_CONTENT_TYPES } from "./types";

export interface RootStateInnerContent {
	innerContent: InnerContent;
}

interface InnerContent {
	rebuildDesign: boolean;
	buttonLoader: boolean;
	notification: boolean;
	paginatedItems: number;
}

const initialState: InnerContent = {
	rebuildDesign: false,
	buttonLoader: false,
	notification: false,
	paginatedItems: 5
};

const innerContentReducer = (state = initialState, action) => {
	switch (action.type) {
		case INNER_CONTENT_TYPES.REBUILD_DESIGN:
			return {
				...state,
				rebuildDesign: !state.rebuildDesign,
				buttonLoader: false,
				notification: true
			};
		case INNER_CONTENT_TYPES.SHOW_BUTTON_LOADER:
			return {
				...state,
				buttonLoader: true,
			};
		case INNER_CONTENT_TYPES.NOTIFICATION:
			return {
				...state,
				notification: false
			};
		case INNER_CONTENT_TYPES.ADD_PAGINATED_ITEMS:
			return {
				...state,
				paginatedItems: state.paginatedItems + 5
			};
		default:
			return state;
	}
};

export default innerContentReducer;