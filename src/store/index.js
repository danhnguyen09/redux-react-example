import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from '../reducers';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        promise
    )))

export default store;