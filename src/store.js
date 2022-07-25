import { applyMiddleware, createStore } from "redux";
// import { createLogger } from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from "react-router-redux";
import { createBrowserHistory } from "history";
import { mainMiddleware } from './middleware';
import reducer from "./reducers";
export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
	return applyMiddleware(
		mainMiddleware,
      	myRouterMiddleware
    );
};

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));