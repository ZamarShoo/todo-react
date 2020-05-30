import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import todoReducer from "./todo-reducer";
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    todo: todoReducer,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;


export default store;