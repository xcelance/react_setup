import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, history } from './store';
import { Route, Switch, Router } from 'react-router-dom';
import App from './components/App';

console.warn = function (...args) {
  	console.log(...args);
};
console.info = function (...args) {
  	console.log(...args);
};

ReactDOM.render((
  	<Provider store={store}>
	    <Router history={history}>
	      	<Switch>
	        	<Route path="/" component={App} />
	      	</Switch>
	    </Router>
  	</Provider>

), document.getElementById('root'));