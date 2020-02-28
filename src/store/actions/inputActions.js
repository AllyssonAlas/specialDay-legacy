export const changeDay = day => {
	return {
		type: 'CHANGE_DAY',
		payload: day
	}
}

export const changeName = name => {
	return {
		type: 'CHANGE_NAME',
		payload: name
	}
}

export const clearInputs = () => {
	return {
		type: 'CLEAR_INPUTS',
		payload: ''
	}
}
