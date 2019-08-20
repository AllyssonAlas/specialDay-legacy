/*****************************************************************************************************************
*  A action creator que recebe e trata as alterações dos Overlays da aplicação. 									  		  *
*****************************************************************************************************************/

// Action creator que controla a exibição dos overlays da aplicação
export const controlOverlay = overlay => {
	return {
		type: 'CRONTROL_OVERLAY',
		payload: overlay
	}
}
