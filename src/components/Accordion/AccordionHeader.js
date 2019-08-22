/*****************************************************************************************************************
* Cabeçalho customizado do componente Accordion usado pela biblioteca Native base, no qual esconde e mostra lis- *
* tas de dados.																																  *
*****************************************************************************************************************/

// Import das bibliotecas usadas no componente.
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Badge, Icon } from 'react-native-elements'
import { H3 } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Import das Actions feitas pelo componente.
import { controlOverlay } from '../../store/actions/overlayActions'
import { selectMonth } from '../../store/actions/birthdayActions'

const AccordionHeader = props => {
	return (
		<View style={[styles.container, { marginBottom: props.expanded ? 2 : 5 }]}>
			<H3 style={styles.headerText}>{props.title}</H3>
			<View style={styles.containerIcons}>
				<Badge
					value={props.birthdaysTotal}
					status="warning"
					badgeStyle={styles.badgeStyle}
					textStyle={styles.badgeTextStyle}
				/>
				<Icon
					name='plus-box'
					type='material-community'
					onPress={() => (
						props.controlOverlay({ overlayAddBirthday: true }),
						props.selectMonth(props.title, props.table)
					)}
					Component={TouchableOpacity}
					size={32}
				/>
				{props.expanded ? <Icon size={32} name="keyboard-arrow-up" /> : <Icon size={32} name="keyboard-arrow-down" />}
			</View>
		</View>
	)
}

const mapDispatchToProps = dispatch => bindActionCreators({ controlOverlay, selectMonth }, dispatch)

export default connect(null, mapDispatchToProps)(AccordionHeader)

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 3,
		paddingVertical: 2,
		borderWidth: 2,
		borderColor: '#999'
	},
	containerIcons: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '40%'
	},
	headerText: {
		paddingLeft: 4,
		paddingTop: 3
	},
	badgeStyle: {
		height: 26,
		width: 34,
	},
	badgeTextStyle: {
		fontSize: 16
	}
})
