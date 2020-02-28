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

AppRegistry.registerComponent(appName, () => Redux)
