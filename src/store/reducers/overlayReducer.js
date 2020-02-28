const INITIAL_STATE = {
	overlayAddBirthday: false,
	overlayDayBirthdays: false,
	overlayEraseBirthday: false
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'CONTROL_OVERLAY':
			return { ...state, ...action.payload }
		default:
			return state
	}
}
