import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Overlay, Input } from 'react-native-elements'
import { H3, Text } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CommonButton from '../Common/CommonButton'

import { controlOverlay } from '../../store/actions/overlayActions'
import { changeDay, changeName, clearInputs } from '../../store/actions/inputActions'
import { add, validateBirthday, clearError } from '../../store/actions/birthdayActions'

const OverlayAddBirthday = props => {
	return (
		<Overlay
			isVisible={props.overlayAddBirthday}
			onBackdropPress={() => (
				props.controlOverlay({ overlayAddBirthday: false }),
				props.clearInputs(),
				props.clearError()
			)}
			overlayStyle={styles.overlayStyle}
			windowBackgroundColor="rgba(255, 255, 255, .5)"
			width='95%'
			height='auto'
		>
			<View style={styles.container}>
				<H3 style={styles.textHeader}>Novo aniversário em {props.month}</H3>
				{props.error !== '' && <Text style={styles.errorMessage}> {props.error} </Text>}
				<View style={styles.containerInputs}>
					<Input
						containerStyle={[styles.containerInputStyles, { width: '25%' }]}
						inputContainerStyle={{ height: '100%' }}
						placeholder={'Dia'}
						keyboardType='phone-pad'
						value={props.day}
						onChangeText={day => props.changeDay(day)}
						maxLength={2}
					/>
					<Input
						containerStyle={[styles.containerInputStyles, { width: '70%' }]}
						inputContainerStyle={{ height: '100%' }}
						placeholder={'Aniversariante'}
						value={props.name}
						onChangeText={name => props.changeName(name)}
						maxLength={25}
					/>
				</View>
				<View style={styles.containerButtons}>
					<CommonButton dark bordered text={'Cancelar'} onPress={() => (
						props.controlOverlay({ overlayAddBirthday: false }),
						props.clearInputs(),
						props.clearError())}
					/>
					<CommonButton primary text={'Confirmar'} onPress={() =>
						props.validateBirthday(props.table, props.name, props.day)}
					/>
				</View>
			</View>
		</Overlay>
	)
}


const mapStateToProps = state => ({
	overlayAddBirthday: state.overlay.overlayAddBirthday,
	day: state.input.day,
	name: state.input.name,
	month: state.birthday.monthSelected.month,
	table: state.birthday.monthSelected.table,
	error: state.birthday.error
})

const mapDispatchToProps = dispatch =>
	bindActionCreators({
		controlOverlay,
		changeDay,
		changeName,
		clearInputs,
		add,
		validateBirthday,
		clearError
	}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OverlayAddBirthday)

const styles = StyleSheet.create({
	overlayStyle: {
		borderWidth: 1,
		borderColor: '#DDD',
		paddingVertical: 20,
	},
	container: {
		alignItems: 'center'
	},
	textHeader: {
		paddingBottom: 15
	},
	errorMessage: {
		color: 'red',
		marginBottom: 10
	},
	containerInputs: {
		flexDirection: 'row',
		width: '100%',
		marginBottom: 20
	},
	containerInputStyles: {
		height: 40,
		marginHorizontal: 5,
		paddingHorizontal: 0,
	},
	containerButtons: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-around',
	}
})
