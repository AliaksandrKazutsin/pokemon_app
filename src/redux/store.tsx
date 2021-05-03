import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './root-reducer';
import { sagaWorker } from './sagas';

const saga = createSagaMiddleware();

const configureStore = createStore(rootReducer, compose(
	applyMiddleware(saga),
	composeWithDevTools(applyMiddleware(logger))
));

saga.run(sagaWorker);

export const store = configureStore;