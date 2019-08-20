/*****************************************************************************************************************
*  A action creator que recebe e trata as alterações dos componentes de entrada de dados da aplicação.	  		  *
*****************************************************************************************************************/

// Action creator que controla a entrada de dados do componente que recebe a informação do dia do aniversário.
export const changeDay = day => {
	return {
		type: 'CHANGE_DAY',
		payload: day
	}
}

// Action creator que controla a entrada de dados do componente que recebe a informação do nome do aniversariante.
export const changeName = name => {
	return {
		type: 'CHANGE_NAME',
		payload: name
	}
}

// Action creator que limpa as entradas de dados do aplicativo.
export const clearInputs = () => {
	return {
		type: 'CLEAR_INPUTS',
		payload: ''
	}
}
