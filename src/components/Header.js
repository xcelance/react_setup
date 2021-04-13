import React, { useState } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({})

const Header = (props) => {
	const { appName, currentUser } = props;
	const [menus, setMenus] = useState(null);

	return (
      	<div className="header-main">
      		Header here.
      	</div>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);