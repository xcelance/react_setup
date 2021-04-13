import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = process.env.REACT_APP_BACKEND;

// const encode = encodeURIComponent;
const responseBody = (res) => res.body;

let token = null;
const tokenPlugin = (req) => {
  	if (token) {
    	req.set("authorization", `Bearer ${token}`);
  	}
};

const requests = {
  	del: (url) =>
    	superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  	get: (url) =>
    	superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  	put: (url, body) =>
	    superagent
  	      	.put(`${API_ROOT}${url}`, body)
  	      	.use(tokenPlugin)
  	      	.then(responseBody),
  	post: (url, body) =>
	    superagent
  	      	.post(`${API_ROOT}${url}`, body)
  	      	.use(tokenPlugin)
  	      	.then(responseBody),
};

const Auth = {
  	current: () => requests.get("/account/info"),
  	login: (username, password) =>
    	requests.post("/account/login", { username, password }),
  	save: (user) => requests.put("/user", { user }),
  	logout: () => requests.get("/account/logout"),
};

const Dashboard = {
  	getDashboardData: () => requests.get("/connect/getDashboardDetails"),
};

export default {
  	Auth,
  	Dashboard,
  	setToken: (_token) => {
    	token = _token;
  	}
};