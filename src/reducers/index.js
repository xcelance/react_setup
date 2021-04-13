import auth from "./auth";
import { combineReducers } from "redux";
import common from "./common";
import { routerReducer } from "react-router-redux";

export default combineReducers({
    auth,
    common,
    router: routerReducer,
});
