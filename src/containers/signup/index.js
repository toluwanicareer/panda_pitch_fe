import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UnAuthorized from '../../routes/unAuthorized';
import SignUp from './signup';
import '../../../public/css/style.css';
import HELPER from '../../utils/helper';
import {
	signUp,
	createPrProfile,
	createJournalistProfile,
	getJournalistInterests,
	createInterest,
} from '../../redux/actions/signup';

class Index extends UnAuthorized {
	// state initialization
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			pitches: 25,
			relevant: 25,
			responses: 25,
			topics: [],
			isPr: this.getUserRole(props, 'isPr') || false,
			isJournalist: this.getUserRole(props, 'isJournalist') || false,
		};
	}

	// identify the type of loggedIn user (journalist/pr)
	getUserRole = (props, key) => {
		const { login: { data } } = props;
		return data[key];
	};

	// // identify the type of loggedIn user (journalist/pr)
	// getUserRole = (props) => {
	// 	const { login: { data: { user } } } = props;
	// 	if (user && user.isPr) return 3;
	// 	return 1;
	// };

	static getDerivedStateFromProps(props, state) {
		const { login } = props;
		const { step } = state;
		if (HELPER.isSuccessInApi(login.code) && step === 2) {
			return {
				step: 3,
			};
		}
		return null;
	}

	// handle next button and final submission
	handleSubmit = () => {
		const obj = this.state;
		const { step, isJournalist } = this.state;
		const { signUp, createPrProfile, createJournalistProfile } = this.props;
		if (step === 2) {
			// validate form2
			if (!HELPER.SignUpStep2Validation(this.state)) {
				signUp(this.state);
			}
		} else if (step === 3) {
			// validate form3 && Pr final submission
			const validateForm3 = HELPER.SignUpStep3Validation(obj);
			if (!validateForm3) {
				if (isJournalist) {
					this.goToNextForm();
				} else createPrProfile(this.state);
			} else this.setState({ error: validateForm3 });
		} else if (step === 4) {
			// validate form4 && Journalist final submission
			const validateForm4 = HELPER.SignUpStep4Validation(obj);
			if (!validateForm4) createJournalistProfile(this.state);
			else this.setState({ error: validateForm4 });
		}
	};

	// redirect to next form
	goToNextForm = () => {
		const { step } = this.state;
		this.setState({ step: step + 1 });
	};

	// handle back button
	handleCancel = () => {
		const { step } = this.state;
		this.setState({ step: step - 1 });
	};

	// handle input change in form
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	// handle range change in form
	handleRangeChange = (key, value) => {
		this.setState({ [key]: value });
	};

	// handle user selection
	handleUserSelection = (key) => {
		this.setState({ [key]: true });
		this.goToNextForm();
	};

	// create a new interest
	createInterest = (val) => {
		const { createInterest } = this.props;
		createInterest(val);
	};

	// handle interests selection
	handleTodoSelection = (topics) => {
		this.setState({ topics });
	};

	// render login sign up page
	render() {
		console.log('pppppppppp==========>', this.props, 'stta=========>', this.state);
		// if(this.state.loading) return <div>Loading.....</div>
		return (
			<SignUp
				{...this.state}
				{...this.props}
				onSubmit={this.handleSubmit}
				onBack={this.handleCancel}
				onChange={this.handleChange}
				onRangeChange={this.handleRangeChange}
				onUserSelection={this.handleUserSelection}
				onCreate={this.createInterest}
				onTodoSelection={this.handleTodoSelection}
			/>
		);
	}
}

const mapStateToProps = state => ({
	...state,
});

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		signUp: values => signUp(values),
		createPrProfile: values => createPrProfile(values),
		createJournalistProfile: values => createJournalistProfile(values),
		getJournalistInterests: data => getJournalistInterests(data),
		createInterest: data => createInterest(data),
	},
	dispatch,
);

// connect to store
export default connect(mapStateToProps, mapDispatchToProps)(Index);
