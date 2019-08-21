/*****************************************************************************************************************
* Reducer que controla a visualização dos Overlays, caixas de diálogo que sobrepõe a tela do aplicativo para al- *
* gum fim.																																		  *
*****************************************************************************************************************/

// Estado inicial que contém as variáveis que controlam a visualização dos overlays.
const INITIAL_STATE = {
	overlayAddBirthday: false,
	overlayDayBirthdays: false,
	overlayEraseBirthday: false
}

// Reducer que recebe as alterações vindas da actions e controla a exibição dos Overlays.
export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'CRONTROL_OVERLAY':
			return { ...state, ...action.payload }
		default:
			return state
	}
}
