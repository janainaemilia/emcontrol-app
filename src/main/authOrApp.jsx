import React, { Component } from 'react'

import { connect } from 'react-redux'
import '../common/template/dependencies'

import App from './app'
import Login from '../components/login'

import AddClient from '../components/addClient'
import ForgotPassword from '../components/forgotPassword'
import PageNotFound from '../common/template/pageNotFound'

/**
 * AuthOrApps
 * @class
 * @memberof Main
 */
class AuthOrApp extends Component {

	switchByPath(pathname){
		switch (pathname) {
			case '/':
				return <Login />
			case '/new-client':
				return <AddClient />
			case '/forgot-password':
				return <ForgotPassword />
			default:
				return <PageNotFound />
		}
	}

	/**
	 * 
	 */
	render() {
		const { usuario, validToken } = this.props.auth

		if (usuario != null  && validToken) {
			return <App>{this.props.children}</App>
		} else if (usuario == null || !validToken) {
			return <Login />
		} else {
				return false
		}
	}
}

const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps, null)(AuthOrApp)