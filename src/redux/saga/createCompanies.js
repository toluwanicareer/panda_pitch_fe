import { put, takeEvery } from 'redux-saga/effects';
import Request from '../ApiCaller';
import CONSTANT from '../../utils/constant';

// create user signup request
const CREATE_PR_COMPANY = function* createCompany() {
	console.log('dummm duma dummmm');
	yield takeEvery('CREATE_PR_COMPANY', function* generateAction(action) {
		try {
			const DATA = yield Request(
				CONSTANT.CREATE_COMPANIES_URL,
				CONSTANT.POST, action.payload,
			);
			if (DATA) {
				const company = { data: [{ ...DATA }] };
				yield put({
					type: 'GET_PR_COMPANIES_SUCCESS',
					payload: company,
				});
			}
		} catch (error) {
			yield put({ type: 'GET_COMPANY_FAILED', payload: error });
		}
	});
};

export default CREATE_PR_COMPANY;