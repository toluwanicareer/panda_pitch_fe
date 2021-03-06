export const defaultState = {
	data: {},
	isLoading: false,
};

export function createPitch(state = defaultState, action) {
	switch (action.type) {
		case 'CREATE_PITCH_INITIATED': {
			return { ...state, code: 'uninitiated', isLoading: true };
		}
		case 'CREATE_PITCH_STARTED': {
			return { ...state, code: 'initiated', isLoading: true };
		}
		case 'CREATE_PITCH_FORM1_SUCCESS': {
			return { ...state, ...action.payload, form1: action.payload.data };
		}
		case 'CREATE_PITCH_FORM2_SUCCESS': {
			return { ...state, ...action.payload, form2: action.payload.data };
		}
		case 'CREATE_PITCH_FORM3_SUCCESS': {
			return { ...state, ...action.payload, form3: action.payload.data };
		}
		case 'CLEAR_CREATE_PITCH_FORM': {
			return {
				isLoading: false,
				data: {},
			};
		}
		case 'CREATE_PITCH_FAILED': {
			return {
				...state,
				...action.payload,
			};
		}
		default: {
			return state;
		}
	}
}
