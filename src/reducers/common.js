import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  REGISTER,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  CURRENT_VIEW
} from "../constants/actionTypes";

const defaultState = {
  appName: "vcalc",
  token: null,
  viewChangeCounter: 0,
  dashboardData: [],
  loginSuccess: false,
  appLoaded: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        appLoaded: true,
        currentUser:
          action.payload && action.payload.data && action.payload.data.user
            ? action.payload.data.user
            : null,
      };
    case REDIRECT:
      return { ...state, redirectTo: "/" };
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : "/",
        loginSuccess: action.error ? false : true,
        token: action.error ? null : action.payload.data.token,
        currentUser: action.error ? null : action.payload.data.user,
      };
    case LOGOUT:
      return { ...state, redirectTo: "/", token: null, currentUser: null, loginSuccess: false };
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
    case CURRENT_VIEW:
      return {
        ...state,
        viewName: action.payload.name,
        viewId: action.payload.id,
      };
    default:
      return state;
  }
};
