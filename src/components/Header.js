/*****************************************************************************************************************
* Cabeçalho da única tela do aplicativo, nele há uma botão para exbibir o Overlay que mostra os aniversariantes  *
* do dia.																																		  *
*****************************************************************************************************************/

// Import das bibliotecas usadas no componente.
import React from 'react'
import { StyleSheet } from 'react-native'
import { Header as Head } from 'react-native-elements'
import { Text } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Import dos componentes feitos na aplicação.
import IconButton from './Common/IconButton'

// Import das Actions feitas pelo componente.
import { controlOverlay } from '../store/actions/overlayActions'

// Feito feito em formato de função pois não precisa usar o ciclo de vida de um componente React.
const Header = props => (
	<Head
		containerStyle={styles.container}
		leftComponent={<IconButton iconName={'cake-variant'} disabled />}
		centerComponent={<Text style={styles.textHeader}> Aniversariantes hoje: </Text>}
		rightComponent={<IconButton
			iconName={'calendar-blank'}
			title={props.totalTodaysBirthdays}
			onPress={() => props.controlOverlay({ overlayDayBirthdays: true })}
		/>}
	/>
)

const mapStateToProps = state => ({ totalTodaysBirthdays: state.birthday.todaysBirthdays.length.toString()})

const mapDispatchToProps = dispatch => bindActionCreators({ controlOverlay }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgb(205,34,34)',
		height: '12%',
		paddingTop: 0,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(0, 0, 0, .2)',
		elevation: 5
	},
	textHeader: {
		fontSize: 20,
		color: 'black',
		fontWeight: 'bold'
	}
})

