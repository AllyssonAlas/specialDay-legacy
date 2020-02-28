import SQLite from 'react-native-sqlite-storage'
import _ from 'lodash'

import { controlOverlay } from './overlayActions'
import { clearInputs } from './inputActions'

const db = SQLite.openDatabase({ name: 'birthdays-db', createFromLocation: '~database/birthdays-db.sqlite' })

export const turnOffLoading = () => {
	return {
		type: 'TURN_OFF_LOADING',
		payload: false
	}
}

export const selectMonth = (month, table) => {
	return {
		type: 'SELECT_MONTH',
		payload: { month, table }
	}
}

export const selectBirthday = (id, name, table) => {
	return {
		type: 'SELECT_BIRTHDAY',
		payload: { id, name, table }
	}
}

export const fetchData = () => {
	return (dispatch, getState) => {
		let birthdays = getState().birthday.birthdays

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

export const clearError = () => {
	return {
		type: 'CLEAR_ERROR',
		payload: ''
	}
}

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
