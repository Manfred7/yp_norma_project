import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers";
import {socketMiddleware} from "./middleware/socketMiddleware";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers =
    (typeof window === 'object') &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const wsMiddleware = socketMiddleware();
const enhancer = composeEnhancers(applyMiddleware(thunk,wsMiddleware));

export const store = createStore(rootReducer, enhancer);
