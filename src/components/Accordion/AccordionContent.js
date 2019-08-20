/*****************************************************************************************************************
* Componente customizado para exibir a lista do componente Accordion usado pela biblioteca Native base, no qual  *
* esconde e mostra listas de dados.																																  *
*****************************************************************************************************************/

// Import das bibliotecas usadas no componente.
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { Text } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Import das Actions feitas pelo componente.
import { controlOverlay } from '../../store/actions/overlayActions'
import { selectBirthday } from '../../store/actions/birthdayActions'

const AccordionContent = props => {

	// Variavel que recebe o array contendo as listar de aniversário.
	var birthdays = props.content

	// Função usada para organizar o array em ordem crescente com as datas dos aniversários.
	function compare(a, b) {
		const dateA = a.birthday
		const dateB = b.birthday
		let comparison = 0
		if (dateA > dateB) {
			comparison = 1
		} else if (dateA < dateB) {
			comparison = -1
		}
		return comparison
	}

	// Chamada do método sort que organizar o array birthdays de acordo com a função.
	birthdays = birthdays.sort(compare)

	// Condição que exibe uma mensagem caso não haja aniversários no mês.
	if (birthdays.length === 0) {
		return (
			<View style={[styles.container, { justifyContent: 'center' }]}>
				<Text style={styles.textItem}>  Não há aniversariantes este mês</Text>
			</View>
		)
	}

	//  Retorno padrão do componente que usa o método map para listar os aniversariantes do mês
	return (
		birthdays.map((item) => {
			// Condição que põe um "0" antes do dia do aniversário caso ele seja menor que 10
			if (item.birthday + 1 <= 10) {
				item.birthday = `0${item.birthday}`
			}
			return (
				<View key={item.id} style={[styles.container, { justifyContent: 'space-between' }]}>
					<View style={styles.dateContainer}>
						<Text>{item.birthday}</Text>
					</View>
					<Text style={styles.textItem}>{item.name}</Text>
					<Button
						buttonStyle={styles.eraseButton}
						icon={<Icon name='delete' type='material-community' color='red' iconStyle={{ width: '100%' }} />}
						onPress={() => (
							props.selectBirthday(item.id, item.name, props.table),
							props.controlOverlay({ overlayEraseBirthday: true })
						)}
						TouchableComponent={TouchableOpacity}
					/>
				</View>
			)
		})
	)
}

const mapDispatchToProps = dispatch => bindActionCreators({ controlOverlay, selectBirthday }, dispatch)

export default connect(null, mapDispatchToProps)(AccordionContent)

const styles = StyleSheet.create({
	container: {
		height: 36,
		flexDirection: 'row',
		backgroundColor: '#FFF',
		paddingVertical: 3,
		paddingHorizontal: 3,
		marginHorizontal: 3,
		marginBottom: 5,
	},
	dateContainer: {
		width: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 3,
		borderColor: '#EEE'
	},
	textItem: {
		textAlignVertical: 'center',
		fontWeight: '700'
	},
	eraseButton: {
		width: 40,
		height: '100%',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		borderWidth: 3,
		borderColor: '#EEE',
		borderRadius: 0
	}
})
