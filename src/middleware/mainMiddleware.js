import agent from "../agent";
import { ASYNC_START } from '../constants/actionTypes';

function isPromise(v) {
  	return v && typeof v.then === "function";
}

const mainMiddleware = (store) => (next) => (action) => {
	if (isPromise(action.payload)) {
		store.dispatch({ type: ASYNC_START, subtype: action.type });
		const skipTracking = action.skipTracking;

		action.payload.then((res) => {			
			action.payload = res;
			// store.dispatch({ type: ASYNC_END, promise: action.payload });
			store.dispatch(action);

		}, (error) => {			
			action.error = true;
			action.payload =
				error && error.response && error.response.body
				? error.response.body
				: error.response || error;
			if (!action.skipTracking) {
				// store.dispatch({ type: ASYNC_END, promise: action.payload });
			}
			
			store.dispatch(action);
		});

		return;
	}

	next(action);
}

export default mainMiddleware;