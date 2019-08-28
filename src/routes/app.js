import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../redux/actions/app';
import Home from '../containers/home';
import Authorized from './authorized';
import JRHeader from '../components/header/jrHeader';
import PRHeader from '../components/header/prHeader';
import CreatePitch from '../containers/createPitch';
import { getUserById } from '../redux/actions/user';

class App extends Authorized {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleLogout = () => {
		const { logout } = this.props;
		logout();
	};

	static getDerivedStateFromProps(props) {
		const { login: { data }, logout } = props;
		if (!data || (data && Object.keys(data).length === 0 && data.constructor === Object)) {
			logout();
		}
		return null;
	}

	componentDidMount() {
		const {
			login: { data = {} }, profile, getUserById,
		} = this.props;
		if (profile.code !== 'SUCCESS' && data) { getUserById(data.id); }
	}

	renderHeader = () => {
		const { login: { data } } = this.props;
		if (data && !data.isJournalist) {
			return <PRHeader onLogout={this.handleLogout} {...this.props} />;
		}
		return <JRHeader onLogout={this.handleLogout} {...this.props} />;
	};

	render() {
		return (
			<div className="wrapper">
				{this.renderHeader()}
				<Route exact path="/" component={props => <Home {...props} />} />
				<Route exact path="/create_pitch" component={props => <CreatePitch {...props} />} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	login: state.login,
	profile: state.profile,
});

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		logout: values => logout(values),
		getUserById: data => getUserById(data),
	},
	dispatch,
);

// connect to store
export default connect(mapStateToProps, mapDispatchToProps)(App);
