import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { Text } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { controlOverlay } from '../../store/actions/overlayActions'
import { selectBirthday } from '../../store/actions/birthdayActions'

const AccordionContent = props => {
	let birthdays = props.content

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

	birthdays = birthdays.sort(compare)

	if (birthdays.length === 0) {
		return (
			<View style={[styles.container, { justifyContent: 'center' }]}>
				<Text style={styles.textItem}>  Não há aniversariantes este mês</Text>
			</View>
		)
	}

	return (
		birthdays.map((item) => {
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
