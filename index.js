/*****************************************************************************************************************
* Esse arquivo é responsável por receber e encapsular o componente App (ponto de partida para a aplicação) com   *
* a Store do Redux (que recebe todo o estado da aplicação) fazendo com que o componente App tenha acesso a todo  *
* o estado da aplicação gerenciado pelo Redux e depois seja exportado para as aplicações nativas (IOS e Android) *
*****************************************************************************************************************/

import React from 'react'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'

import { Provider } from 'react-redux'

import storeConfig from './src/store/storeConfig'

import App from './src/App'

const store = storeConfig()

const Redux = () => (
	<Provider store={store}>
		<App />
	</Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
