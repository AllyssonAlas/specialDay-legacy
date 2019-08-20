/*****************************************************************************************************************
* A Store que guarda o estado controlado pelo Redux é criada aqui. Nela são recebidos os Reducers que não apenas *
* contém uma parte do estado, mas também são responsaveis por atualizar sua respectiva parte e juntos formam a   *
* Store. Além de ser criada, aqui a Store também recebe o método applyMiddleware que aplica o Redux-Thunk, capaz *
* de lidar com ações assíncronas no gerenciamento da Store.																		  *
*****************************************************************************************************************/

// Import das bibliotecas usadas no componente.
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from "redux-thunk"

// Import dos Reducers usados no aplicativo.
import overlayReducer from './reducers/overlayReducer'
import inputReducer from './reducers/inputReducer'
import birthdayReducer from './reducers/birthdayReducer'

// Método que combina os Reducers do aplicativo.
const reducers = combineReducers ({
	overlay: overlayReducer,
	input: inputReducer,
	birthday: birthdayReducer
})

// Exportação padrão que cria a Store do Redux através da constante reducers declarada acima e ainda aplica
// o Redux-Thunk
export default storeConfig = () => createStore(reducers, compose(applyMiddleware(thunk)))
