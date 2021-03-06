import { put, takeEvery } from 'redux-saga/effects';
import Request from '../ApiCaller';
import CONSTANT from '../../utils/constant';
import { START, DATA, ERROR } from '../handler';
import toStoreConfig from '../adapters/autocomplete';
import HELPER from '../../utils/helper';

// create user signup request
const GET_POSITIONS = function* getCompanies() {
	yield takeEvery('GET_POSITIONS', function* generateAction(action) {
		yield put(START('GET_POSITIONS_STARTED'));
		try {
			const RES = yield Request(`${CONSTANT.GET_POSITIONS_URL}${action.payload}/`, CONSTANT.GET);
			if (RES.status) {
				const positions = RES.data.map(position => toStoreConfig(position));
				yield put({
					type: 'GET_POSITIONS_SUCCESS',
					payload: DATA(positions),
				});
			} else if (RES.message === CONSTANT.AUTHENTICATION_ERROR) {
				HELPER.logout();
				yield put({ type: 'LOGOUT' });
			} else {
				yield put({ type: 'GET_POSITIONS_FAILED', payload: ERROR(RES.data) });
			}
		} catch (error) {
			yield put({ type: 'GET_POSITIONS_FAILED', payload: ERROR(error) });
		}
	});
};

export default GET_POSITIONS;
