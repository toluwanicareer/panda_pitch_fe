import { put, takeEvery } from 'redux-saga/effects';
import Request from '../ApiCaller';
import CONSTANT from '../../utils/constant';
import { START, DATA, ERROR } from '../handler';
import HELPER from '../../utils/helper';

const CREATE_PITCH_FORM2 = function* fetchSurvey() {
	yield takeEvery('CREATE_PITCH_FORM2', function* generateAction(action) {
		yield put(START('CREATE_PITCH_STARTED'));
		try {
			const RES = yield Request(CONSTANT.CREATE_PITCH_FORM2_URL, CONSTANT.POST, action.payload);
			if (RES.status) {
				yield put({
					type: 'CREATE_PITCH_FORM2_SUCCESS',
					payload: DATA(RES.data),
				});
			} else if (RES.message === CONSTANT.AUTHENTICATION_ERROR) {
				HELPER.logout();
				yield put({ type: 'LOGOUT' });
			} else {
				yield put({ type: 'CREATE_PITCH_FAILED', payload: ERROR(RES.data) });
			}
		} catch (error) {
			yield put({ type: 'CREATE_PITCH_FAILED', payload: ERROR(error) });
		}
	});
};

// export default CREATE_CLIENT;
export default CREATE_PITCH_FORM2;
