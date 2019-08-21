/*****************************************************************************************************************
* Reducer que controla estado dos componentes que fazem uso do banco de dados, ele é capaz de puxar as informa-  *
* ções do banco de dados e atualizar o estado dos componentes quando há qualquer alteração no banco de dados.	  *
*****************************************************************************************************************/

// O INITIAL_STATE possui o estado inicial do aplicativo: o loading possui o estado de carregamento que controla
// a renderização do componente App, o array de objetos birthdays possui informações refentes ao mês, a tabela e
// outro array com os aniversários referentes a cada mês e é responsável por popular o aplicativo com as informa-
// ções do banco de dados e os objetos monthSelected, birthdaySelected e todaysBirthdays são utilizados para fazer
// alterações no estado da Store e no banco de dados e o error é usado para mostrar erros ao usuário no momento
// em que ele for cadastrar um novo aniversário.
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

// Reducer que recebe as alterações vindas da actions e atualiza o estado a qualquer alteração no banco de dados.
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
