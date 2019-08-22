/*****************************************************************************************************************
* Overlay que recebe e mostra a lista de aniversários do dia em formato de array. 										  *
*****************************************************************************************************************/

// Import das bibliotecas usadas no componente.
import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Overlay } from 'react-native-elements'
import { Text, H3 } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Import dos componentes feitos na aplicação.
import CommonButton from '../Common/CommonButton'

// Import das Actions feitas pelo componente.
import { controlOverlay } from '../../store/actions/overlayActions'

const OvervalyDaysBirthdays = props => {
	// Objeto date é criado e manipulado para que seja mostrado o dia corretamente na exibição do Overlay.
	let d = new Date()
	let day = d.getDate()
	let month = d.getMonth() + 1

	if (day + 1 <= 10) {
		day = `0${day}`
	}

	if (month + 1 <= 10) {
		month = `0${month}`
	}

	return (
		<Overlay
			isVisible={props.overlayDayBirthdays}
			onBackdropPress={() => props.controlOverlay({ overlayDayBirthdays: false })}
			overlayStyle={styles.overlayStyle}
			windowBackgroundColor="rgba(255, 255, 255, .5)"
			width='80%'
			height='80%'
		>
			<View style={styles.container}>
				<H3 style={styles.textHeader}>Aniversários do dia ({day}/{month})</H3>
				<FlatList
					data={props.todaysBirthdays}
					keyExtractor={item => item.id.toString()}
					ListHeaderComponent={() =>
						<View style={[styles.listSeparator, { width: '85%', backgroundColor: '#AAA', marginBottom: 5 }]} />
					}
					ItemSeparatorComponent={() =>
						<View style={[styles.listSeparator, { width: '60%', backgroundColor: '#EEE' }]} />
					}
					style={props.todaysBirthdays.length ? styles.listContainer : {}}
					renderItem={({ item }) => {
						console.log(item)
						return (<Text style={styles.listItem}> {item.name} </Text>)
					}}
				/>
				{props.todaysBirthdays.length === 0 &&
					<View style={styles.noBirthdayContainer}>
						<Text style={styles.noBirthdayMessage}>
							Não há aniversários hoje.
						</Text>
					</View>
				}
				<View style={styles.containerButton}>
					<CommonButton dark bordered text={'Fechar'} onPress={() =>
						props.controlOverlay({ overlayDayBirthdays: false })}
					/>
				</View>
			</View>
		</Overlay>
	)
}

const mapStateToProps = state => ({
	overlayDayBirthdays: state.overlay.overlayDayBirthdays,
	todaysBirthdays: state.birthday.todaysBirthdays
})

const mapDispatchToProps = dispatch => bindActionCreators({ controlOverlay }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OvervalyDaysBirthdays)

const styles = StyleSheet.create({
	overlayStyle: {
		borderWidth: 1,
		borderColor: '#DDD',
		paddingVertical: 20
	},
	container: {
		alignItems: 'center'
	},
	textHeader: {
		paddingBottom: 5,
	},
	listSeparator: {
		height: 2,
		alignSelf: 'center',
	},
	listContainer: {
		height: '80%',
		width: '100%',
		marginBottom: 10
	},
	listItem: {
		width: '100%',
		fontSize: 24,
		marginVertical: 3,
		textAlign: 'center'
	},
	noBirthdayContainer: {
		height: '80%',
		width: '100%',
		marginBottom: 10,
		justifyContent: 'center',
	},
	noBirthdayMessage: {
		fontSize: 18,
		textAlign: 'center',
	},
	containerButton: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
	}
})
