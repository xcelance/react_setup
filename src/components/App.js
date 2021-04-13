import agent from "../agent";
import React, { Suspense } from "react";
import { connect } from "react-redux";
import { withOrientationChange } from "react-device-detect";

import { Route, Switch } from "react-router-dom";
import {
  	APP_LOAD,
  	REDIRECT,
  	LOGOUT,
} from "../constants/actionTypes";

import "./styles/style.scss";

// calling components.
import Login from "./Login";
import Header from "./Header";
import Dashboard from "./Dashboard";

const mapStateToProps = (state) => {
	return {
		appLoaded: state.common.appLoaded,
		appName: state.common.appName,
		currentUser: state.common.currentUser,
	}
};

const mapDispatchToProps = (dispatch) => ({
	onLoad: (payload, token) => dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  	onRedirect: () => dispatch({ type: REDIRECT }),
  	onSignOut: () => { dispatch({ type: LOGOUT, payload: agent.Auth.logout() }); },
});

const AppComponent = (props) => {
	const { appLoaded, appName, currentUser, onLoad, onRedirect, onSignOut } = props;

	const headerProps = {
		appName,
		currentUser
	}

	return (
    	<React.Fragment>
    		{appLoaded && currentUser ? (
    			<Suspense fallback={null}>
    				<React.Fragment>
              			<div className="main-body">
	                        <div className="header"><Header {...headerProps} /></div>
	                        <div className="container-fluid">
		    					<Switch>
		    						<Route exact path="/dashboard" component={Dashboard} />
		    					</Switch>
		    				</div>
                    	</div>
    				</React.Fragment>
          		</Suspense>
          	) : (
          		<Suspense fallback={null}>
          			<React.Fragment>
            			<Switch>
            				<Route exact path="/" component={Login} />
            			</Switch>
            		</React.Fragment>
          		</Suspense>
          	)}
    	</React.Fragment>
  	);
};

const App = withOrientationChange(AppComponent);
export default connect(mapStateToProps, mapDispatchToProps)(App);