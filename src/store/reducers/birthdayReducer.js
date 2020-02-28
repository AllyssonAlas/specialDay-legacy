const INITIAL_STATE = {
	loading: true,
	birthdays: [
		{ month: "Janeiro", table: 'jan', dates: [] },
		{ month: "Fevereiro", table: 'feb', dates: [] },
		{ month: "Março", table: 'mar', dates: [] },
		{ month: "Abril", table: 'apr', dates: [] },
		{ month: "Maio", table: 'may', dates: [] },
		{ month: "Junho", table: 'jun', dates: [] },
		{ month: "Julho", table: 'jul', dates: [] },
		{ month: "Agosto", table: 'aug', dates: [] },
		{ month: "Setembro", table: 'sep', dates: [] },
		{ month: "Outubro", table: 'oct', dates: [] },
		{ month: "Novembro", table: 'nov', dates: [] },
		{ month: "Dezembro", table: 'dez', dates: [] },
	],
	monthSelected: { month: '', table: '' },
	birthdaySelected: { id: '', name: '', table: '' },
	todaysBirthdays: [],
	error: ''
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'FETCH_DATA':
			return { ...state, birthdays: action.payload }
		case 'TURN_OFF_LOADING':
			return { ...state, loading: false }
		case 'CLEAR_ERROR':
			return { ...state, error: action.payload }
		case 'VALIDATE_BIRTHDAY':
			return { ...state, error: action.payload }
		case 'ADD':
			return { ...state, birthdays: action.payload }
		case 'FETCH_TODAYS_BIRTHDAYS':
			return { ...state, todaysBirthdays: action.payload }
		case 'SELECT_MONTH':
			return { ...state, monthSelected: action.payload }
		case 'SELECT_BIRTHDAY':
			return { ...state, birthdaySelected: action.payload }
		case 'DELETE_BIRTHDAY':
			return { ...state, birthdays: action.payload }
		default:
			return state
	}
}
