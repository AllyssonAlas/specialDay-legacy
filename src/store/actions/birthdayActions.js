/*****************************************************************************************************************
* A action creator responsável por receber as informações do banco de dados e envia-las ao reducer para atuali	  *
* zar o estado, e também fazer alterações no banco de dados e posteriormente enviar essas atualizações para o 	  *
* reducer para a atualização do estado.																								  *																														  *
*****************************************************************************************************************/

// Import das bibliotecas usadas no arquivo.
import SQLite from 'react-native-sqlite-storage'
import _ from 'lodash'

// Import das actions creators externas usadas em outras actions creators.
import { controlOverlay } from './overlayActions'
import { clearInputs } from './inputActions'

// Instancia do banco de dados usado no aplicativo.
const db = SQLite.openDatabase({ name: 'birthdays-db', createFromLocation: '~database/birthdays-db.sqlite' })

// Action creator que controla o estado de carregamento do aplicativo
export const turnOffLoading = () => {
	return {
		type: 'TURN_OFF_LOADING',
		payload: false
	}
}

// Action creator que seleciona o mês para renderizar seu nome no Overlay para salvar os dados e posteriormente
// poder fazer um insert na sua respectiva tabela no banco de dados
export const selectMonth = (month, table) => {
	return {
		type: 'SELECT_MONTH',
		payload: { month, table }
	}
}

// Action creator que seleciona o aniversário para posteriormente poder deleta-lo do banco de dados.
export const selectBirthday = (id, name, table) => {
	return {
		type: 'SELECT_BIRTHDAY',
		payload: { id, name, table }
	}
}

// Action creator que é usada para puxar as informações do banco de dados e atualizar o estado do Redux e popu-
// lar o aplicativo com elas, é feita uma fez assim que o aplicativo é iniciado.
export const fetchData = () => {
	return (dispatch, getState) => {
		var birthdays = getState().birthday.birthdays

		for (let i = 0; i < birthdays.length; i++) {
			db.transaction((tx) => {
				tx.executeSql(`SELECT * FROM ${birthdays[i].table}`, [], (tx, results) => {
					for (let j = 0; j < results.rows.length; j++) {
						let item = results.rows.item(j);
						birthdays[i].dates.push(item)
					}
					if (i === birthdays.length - 1) {
						dispatch({ type: 'FETCH_DATA', payload: birthdays })
						dispatch(turnOffLoading())
						dispatch(fetchTodaysBirthdays())
					}
				}, (error) => {
					console.log(error)
					txn.executeSql(`DROP TABLE IF EXISTS ${birthdays[i].table}`, []);
					txn.executeSql(
						`CREATE TABLE IF NOT EXISTS ${birthdays[i].table}(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, birthday INTEGER NOT NULL)`,
						[]
					);
				});
			})
		}
	}
}

// Action creator que atualiza os aniversários do dia, é chamada quando é feita a primeira consulta no banco de
// dados pelo método fetchData pelos métodos add e deleteBirthday que fazem alterações no banco de dados.
export const fetchTodaysBirthdays = () => {
	return (dispatch, getState) => {
		let d = new Date()
		let todaysBirthdays = []
		let months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
		let birthdays = getState().birthday.birthdays

		for (let i = 0; i < birthdays.length; i++) {
			if (months[d.getMonth()] == birthdays[i].table) {
				if (birthdays[i].dates.length === 0) {
					todaysBirthdays = []
				}
				else {
					for (let j = 0; j < birthdays[i].dates.length; j++) {
						if (d.getDate() === parseInt(birthdays[i].dates[j].birthday) && todaysBirthdays.indexOf(birthdays[i].dates[j].birthday) === -1) {
							todaysBirthdays.push(birthdays[i].dates[j])
							todaysBirthdays = _.uniq(todaysBirthdays)
						}
						else {
							todaysBirthdays = _.intersection(todaysBirthdays, birthdays[i].dates)
						}
					}
				}
			}
		}
		dispatch({ type: 'FETCH_TODAYS_BIRTHDAYS', payload: todaysBirthdays })
	}
}

// Action creator que limpa a mensagem de error da aplicação.
export const clearError = () => {
	return {
		type: 'CLEAR_ERROR',
		payload: ''
	}
}

// Action creator que valida as informações antes de serem enviadas para o método que as salvará no banco de dados,
// caso haja alguma inconsistência ele emite um erro e impede que o seja feito um novo registro no banco de dados.
// Caso seja válida, ele limpa o estado referente ao erro, chama o método que salvará o registro no banco de dados,
// esconde o Overlay e limpa as entradas de dados com actions creators externas.
export const validateBirthday = (table, name, birthday) => {
	return (dispatch, getState) => {
		let day = getState().input.day
		let name = getState().input.name

		if (day === '' || name === '') {
			dispatch({
				type: 'VALIDATE_BIRTHDAY',
				payload: 'Há campos para serem preenchidos'
			})
		}
		else if (birthday < 1 || birthday > 31 || isNaN(birthday) === true ||
			table === 'feb' && birthday > 29 ||
			table === 'apr' && birthday > 30 ||
			table === 'jun' && birthday > 30 ||
			table === 'sep' && birthday > 30 ||
			table === 'nov' && birthday > 30) {
			dispatch({
				type: 'VALIDATE_BIRTHDAY',
				payload: 'O dia informado não é um valor válido'
			})
		}
		else {
			dispatch(clearError())
			dispatch(add(table, name, birthday))
			dispatch(controlOverlay({ overlayAddBirthday: false }))
			dispatch(clearInputs())
		}
	}
}

// Action creator que salva um novo registro de aniversário no banco de dados e atuliza o estado do aplicativo
// com o novo registo e depois chama o método fetchTodaysBirthdays para atualizar a lista de aniversários do
// dia caso o novo registro também seja no mesmo dia.
export const add = (table, name, birthday) => {
	return (dispatch, getState) => {
		let birthdays = getState().birthday.birthdays
		let indexOfTable = birthdays.findIndex(i => i.table === table)
		let newBirthday = {}

		db.transaction((tx) => {
			tx.executeSql(`INSERT INTO ${table}(name, birthday) VALUES (?, ?)`, [name, birthday], (tx, results) => {
				if (results.rowsAffected > 0) {
					newBirthday = { id: results.insertId, name: name.trim(), birthday: parseInt(birthday) }
					birthdays[indexOfTable].dates = birthdays[indexOfTable].dates.concat(newBirthday)
					dispatch({ type: 'ADD', payload: birthdays })
					dispatch(fetchTodaysBirthdays())
				}
			}, (error) => {
				console.log(error)
			})
		})
	}
}

// Action creator que apaga um registro no banco de dados e também atualiza o estado do aplicativo e depois chama
// o método fetchTodaysBirthdays para atualizar a lista de aniversários do  dia caso o registro apagado esteja na
// nessa lista.
export const deleteBirthday = (table, id) => {
	return (dispatch, getState) => {
		let birthdays = getState().birthday.birthdays
		let indexOfTable = birthdays.findIndex(i => i.table === table)

		db.transaction((tx) => {
			tx.executeSql(`DELETE FROM ${table} WHERE id=?`, [id], (tx, results) => {
				if (results.rowsAffected > 0) {
					birthdays[indexOfTable].dates = _.remove(birthdays[indexOfTable].dates, i => i.id !== id)
					dispatch({ type: 'DELETE_BIRTHDAY', payload: birthdays })
					dispatch(fetchTodaysBirthdays())
				}
			}, (error) => {
				console.log(error)
			});
		})
	}
}
