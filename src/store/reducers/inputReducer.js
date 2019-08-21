/*****************************************************************************************************************
* Reducer que controla o valor dos componentes de entrada de dados do aplicativo.										  *
*****************************************************************************************************************/

// Estado inicial dos componentes de entrada de dados.
const INITIAL_STATE = {
	day: '',
	name: '',
}

// Reducer que recebe as alterações vindas da actions e atualiza dos componentes de entrada de dados.
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
