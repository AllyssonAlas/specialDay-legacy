import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Container, Accordion, Text } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Head from './components/Header'
import AccordionHeader from './components/Accordion/AccordionHeader'
import AccordionContent from './components/Accordion/AccordionContent'
import OverlayAddBirthday from './components/Overlay/AddBirthday'
import OverlayEraseBirthday from './components/Overlay/EraseBirthday'
import OverlayDaysBirthdays from './components/Overlay/DaysBirthdays'

import { fetchData, turnOffLoading } from './store/actions/birthdayActions'

class App extends Component {
	componentDidMount(){
		this.props.fetchData()
	}

	render() {
		if (this.props.birthday.loading === true) {
			return (
				<View>
					<Text> Carregando</Text>
				</View>
			)
		}
		return (
			<Container style={styles.container}>
				<Head />
				{<OverlayAddBirthday />}
				{<OverlayEraseBirthday />}
				{<OverlayDaysBirthdays />}
				<ScrollView style={styles.containerContent}>
					<Accordion
						dataArray={this.props.birthday.birthdays}
						renderHeader={(item, expanded) =>
							<AccordionHeader
								title={item.month}
								table={item.table}
								expanded={expanded}
								birthdaysTotal={item.dates.length}
							/>
						}
						renderContent={item =>
							<AccordionContent
								content={item.dates}
								month={item.month}
								table={item.table}
							/>
						}
					/>
				</ScrollView>
			</Container>
		)
	}
}

const mapStateToProps = state => ({ birthday: state.birthday })

const mapDispatchToProps = dispatch => bindActionCreators({ fetchData, turnOffLoading }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerContent: {
		paddingTop: 4,
		paddingHorizontal: 2,
		backgroundColor: '#EEE',
	}
})
