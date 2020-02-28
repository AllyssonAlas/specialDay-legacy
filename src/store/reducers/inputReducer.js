const INITIAL_STATE = {
	day: '',
	name: '',
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'CHANGE_DAY':
			return { ...state, day: action.payload }
		case 'CHANGE_NAME':
			return { ...state, name: action.payload }
		case 'CLEAR_INPUTS':
			return { day: action.payload, name: action.payload }
		default:
			return state
	}
}
