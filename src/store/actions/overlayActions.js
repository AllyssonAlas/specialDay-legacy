/*****************************************************************************************************************
* A action creator que recebe e trata as alterações dos Overlays da aplicação. 									  		  *
*****************************************************************************************************************/

// Action creator que controla a exibição dos overlays da aplicação, recebe um estado de um Overlay e o envia para
// o Reducer para modificar sua exibição.
export const controlOverlay = overlay => {
	return {
		type: 'CRONTROL_OVERLAY',
		payload: overlay
	}
}
