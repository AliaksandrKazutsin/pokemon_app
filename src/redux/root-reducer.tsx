import { combineReducers } from 'redux';
import appReducer from '../redux/app-reducer';
import innerContentReducer from '../redux/inner-content-reducer';

export const rootReducer = combineReducers({
	app: appReducer,
	innerContent: innerContentReducer
});  