import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import appReducer from '../redux/app-reducer';
import { sagaWorker } from './sagas';

//const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();
const saga = createSagaMiddleware();

const configureStore = createStore(appReducer, compose(
	applyMiddleware(
		saga
	),
	composeWithDevTools(
		applyMiddleware(logger)
	)
));

// configureStore.subscribe(() => {
// 	saveState({
// 		getData: store.getState().getData
// 	});
// });

saga.run(sagaWorker);

export const store = configureStore;