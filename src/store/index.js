/**
 * @flow
 */

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import loginReducer from './../components/Login/loginReducer'
const reducers = combineReducers({
    loginReducer
});

const middleware = [
    thunk
];

const composer = __DEV__ ? composeWithDevTools : compose;
const store = createStore(reducers, composer(applyMiddleware(...middleware)));

export default store;

