import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import logger from "redux-logger";
import { EasterLists } from './easterLists';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            easterList: EasterLists
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};