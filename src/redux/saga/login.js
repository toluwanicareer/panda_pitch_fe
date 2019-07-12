import { put, takeEvery } from 'redux-saga/effects';
import Request from '../ApiCaller';
import CONSTANT from '../../utils/constant';
import { START, DATA, ERROR } from '../handler';
import history from '../../routes/history';

// create user login request
const LOGIN = function* performLogin() {
	yield takeEvery('LOGIN', function* generateAction(action) {
		yield put(START('LOGIN_STARTED'));
		try {
			const RES = yield Request(CONSTANT.LOGIN_URL, CONSTANT.POST, action.payload, false);
			if (RES.token) {
				yield put({ type: 'LOGIN_SUCCESS', payload: DATA(RES) });
				localStorage.setItem('token', RES.token);
				localStorage.setItem('user', JSON.stringify(RES.user));
				history.push('/');
			} else {
				yield put({ type: 'LOGIN_FAILED', payload: ERROR(RES) });
			}
		} catch (error) {
			yield put({ type: 'LOGIN_FAILED', payload: ERROR(error) });
		}
	});
};

export default LOGIN;
