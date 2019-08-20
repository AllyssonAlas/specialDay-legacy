/*****************************************************************************************************************
* Botão usado no cabeçalho.																												  *																																		  *
*****************************************************************************************************************/

import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Button, Icon } from 'react-native-elements'

export default props => (
	<Button
		{...props}
		titleStyle={styles.titleStyle}
		buttonStyle={styles.buttonStyle}
		icon={<Icon name={props.iconName} type='material-community' size={46} />}
		TouchableComponent={TouchableOpacity}
		disabledStyle={styles.disabledStyle}
	/>
)

const styles = StyleSheet.create({
	buttonStyle: {
		backgroundColor: 'transparent'
	},
	titleStyle: {
		paddingTop: 6,
		position: 'absolute'
	},
	disabledStyle: {
		backgroundColor: 'transparent'
	}
})
