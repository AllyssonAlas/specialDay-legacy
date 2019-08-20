/*****************************************************************************************************************
* Overlay usado para apagar o aniversário escolhido pelo usuário						 										  *
*****************************************************************************************************************/

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'
import { H3 } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CommonButton from '../Common/CommonButton'

import { controlOverlay } from '../../store/actions/overlayActions'
import { deleteBirthday } from '../../store/actions/birthdayActions'

const OvervalyEraseBirthday = props => (
	<Overlay
		isVisible={props.overlayEraseBirthday}
		onBackdropPress={() => props.controlOverlay({overlayEraseBirthday: false })}
		overlayStyle={styles.container}
		windowBackgroundColor="rgba(255, 255, 255, .5)"
		width='95%'
		height='auto'
	>
		<View style={styles.overlayStyle}>
			<H3 style={styles.textHeader}>Apagar aniversário de {props.birthdaySelected.name}?</H3>
			<View style={styles.containerButtons}>
				<CommonButton dark bordered text={'Cancelar'} onPress={() =>
					props.controlOverlay({overlayEraseBirthday: false })}
				/>
				<CommonButton  danger text={'Cancelar'} onPress={() => (
					props.deleteBirthday(props.birthdaySelected.table, props.birthdaySelected.id),
					props.controlOverlay({overlayEraseBirthday: false }))}
				/>
			</View>
		</View>
	</Overlay>
)

const mapStateToProps = state => ({
	overlayEraseBirthday: state.overlay.overlayEraseBirthday,
	birthdaySelected: state.birthday.birthdaySelected
})

const mapDispatchToProps = dispatch => bindActionCreators({ controlOverlay, deleteBirthday }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OvervalyEraseBirthday)

const styles = StyleSheet.create({
	overlayStyle: {
		alignItems: 'center'
	},
	container: {
		borderWidth: 1,
		borderColor: '#DDD',
		paddingVertical: 20
	},
	textHeader: {
		paddingBottom: 15
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
		justifyContent: 'space-around'
	}

})
