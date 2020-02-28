import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from "redux-thunk"

import overlayReducer from './reducers/overlayReducer'
import inputReducer from './reducers/inputReducer'
import birthdayReducer from './reducers/birthdayReducer'

const reducers = combineReducers ({
	overlay: overlayReducer,
	input: inputReducer,
	birthday: birthdayReducer
})
const storeConfig = () => createStore(reducers, compose(applyMiddleware(thunk)))

export default storeConfig
