/*****************************************************************************************************************
* Ponto de partida da aplicação, responsável por reunir e renderizar todos os componentes da aplicação e chamar  *
* o método Fetch Data que faz a primeira requisição no banco de dados para salvar seus dados no estado controla- *
* do pelo Redux. Também recebe parte desses dados e os distribui para seus componentes filhos.						  *
*****************************************************************************************************************/

// Import das bibliotecas usadas no componente.
import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Container, Accordion, Text } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

// Import dos componentes feitos na aplicação.
import Head from './components/Header'
import AccordionHeader from './components/Accordion/AccordionHeader'
import AccordionContent from './components/Accordion/AccordionContent'
import OverlayAddBirthday from './components/Overlay/AddBirthday'
import OverlayEraseBirthday from './components/Overlay/EraseBirthday'
import OverlayDaysBirthdays from './components/Overlay/DaysBirthdays'

// Import das Actions feitas pelo componente.
import { fetchData, turnOffLoading } from './store/actions/birthdayActions'

// Componente feito em formato de classe para poder ter acesso ao ciclo de vida de um componente React.
class App extends Component {

	// Método que é chamado após a montagem do componente para fazer no qual chama o método fetchData para
	// fazer requisição no baco de dados e popular a Store do Redux com suas informações.
	componentDidMount(){
		this.props.fetchData()
	}

	// Método que renderiza o componente em questão
	render() {
		//Condição que retorna uma tela de carregamento enquanto o método Fetch Data é finalizado.
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

// Recebe o estado controlado pelo Redux e envia para o componente App e é chamado toda vez que a Store do
// Redux é atualizada.
const mapStateToProps = state => ({ birthday: state.birthday })

// Recebe as Actions (métodos) do Redux e envia para o componente App possibilitando o componente executa-las
// através o dispatch.
const mapDispatchToProps = dispatch => bindActionCreators({ fetchData, turnOffLoading }, dispatch)

// Exportação padrão do arquivo no qual o método Connect conecta um componente React com a Store do Redux.
// Ele retorna um novo componente que embrulha o componente App fornecendo para ele a Store e  as Actions
// do Redux através dos argumentos mapStateToProps e mapDispatchToProps, respectivamente.
export default connect(mapStateToProps, mapDispatchToProps)(App)

// API usada pelo React Native para estilização dos seus componentes baseada em CSS.
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
