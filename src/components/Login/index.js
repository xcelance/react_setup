import { useHistory } from "react-router-dom";
import ListErrors from "../ListErrors";
import React, { useEffect, useState } from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import _data from "./flags.json";

import {
  	UPDATE_FIELD_AUTH,
  	LOGIN,
  	LOGIN_PAGE_UNLOADED,
} from "../../constants/actionTypes";

// import {ReactComponent as Logo} from "../../assets/logo.svg";

const mapStateToProps = (state) => ({
  	...state.auth,
  	loginSuccess: state.common.loginSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  	onChangeUsername: (value) =>
    	dispatch({ type: UPDATE_FIELD_AUTH, key: "username", value }),
  	onChangePassword: (value) =>
    	dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
  	onSubmit: (username, password) => {
    	dispatch({ type: LOGIN, payload: agent.Auth.login(username, password) });
  	},
  	onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED }),
});

const Login = (props) => {
	const { username, password, errors, loginSuccess, onSubmit, onChangePassword, onChangeUsername, inProgress, onUnload } = props;
	const [showPassowrd, setShowPassword] = useState(false);
	const [selectedFlag, setSelectedFlag] = useState(null);
	const history = useHistory();

	const changeUsername = (ev) => onChangeUsername(ev.target.value);
  	const changePassword = (ev) => onChangePassword(ev.target.value);
  	const submitForm = (username, password) => (e) => {
	    e.preventDefault();
	    onSubmit(username, password);
  	};

  	const selectCountry = (e, item, k) => {
  		setSelectedFlag(k);
  	}

  	useEffect(() => {
	    if (loginSuccess) {
	      	history.push("/dashboard");
	    }
	    return () => {
	      	onUnload();
	    };
  	}, [loginSuccess]);


	return (
		<section className="login-page">
			<div className="container">
				<div className="row">
					<div className="col-sm-8">
						<div className="login-heading">VACCINE COST CALCULATOR</div>
						<div className="region-section">


						<h6 className="mb-4">Choose the Desired Region</h6>
						<ul className="flags">
							{_data.map((item, k) => (
						    	<li className={`flags-icons ${selectedFlag === k ? 'active':''}`} onClick={(e) => selectCountry(e, item, k)} key={k}>
						    		<div className={item.icon} />
						    		<span className={`${selectedFlag === k ? 'show':'hide'}`}>{item.name}</span>
						    	</li>
						  	))}
						</ul>


						</div>
						<div className="login-form">
							<h6 className="mb-4">Login to your account</h6>
							<ListErrors errors={errors} />
							<form onSubmit={submitForm(username, password)}>
				              	<fieldset>
					                <fieldset className="form-group">
					                  	<input
						                    className="form-control form-control-md"
						                    type="text"
						                    placeholder="Username"
						                    value={username}
						                    onChange={changeUsername}
						                    required
					                  	/>
					                </fieldset>

					                <fieldset className="form-group position-relative">
					                  	<input
						                    className="form-control form-control-md"
						                    type={showPassowrd ? "text" : "password"}
						                    placeholder="Password"
						                    value={password}
						                    onChange={changePassword}
						                    required
					                  	/>
					                  	<span
					                    	className={`password-icon ${showPassowrd}`}
					                    	onClick={(e) => setShowPassword(!showPassowrd)}
					                  	></span>
					                </fieldset>

					                <button
					                  	className="login-button btn btn-md btn-primary"
					                  	type="submit"
					                  	disabled={inProgress}
					                >
					                  	Login
					                </button>
				              	</fieldset>
				            </form>
						</div>
					</div>
					<div className="col-sm-4 login-right-sec" />
				</div>
			</div>
		</section>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);