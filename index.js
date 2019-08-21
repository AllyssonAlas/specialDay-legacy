/*****************************************************************************************************************
* Esse arquivo é responsável por receber e encapsular o componente App (ponto de partida para o aplicativo) com  *
* a Store do Redux (que recebe todo o estado do aplicativo) fazendo com que o componente App tenha acesso ao es- *
* tado do aplicativo gerenciado pelo Redux e depois seja exportado para os aplicativos nativos (IOS e Android)	  *
*****************************************************************************************************************/

// Import da bibliotecas usadas no componente.
import React from 'react'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import { Provider } from 'react-redux'

// Import dos componentes feitos na aplicativo.
import storeConfig from './src/store/storeConfig'
import App from './src/App'

// Constante que recebe a Store do Redux.
const store = storeConfig()

// Função que encapsula o componente App com o Provider passando para o App o estado da Store.
const Redux = () => (
	<Provider store={store}>
		<App />
	</Provider>
)

// Método que "registra" o aplicativo dentro dos aplicativos nativos(Android e IOS).
AppRegistry.registerComponent(appName, () => Redux);
