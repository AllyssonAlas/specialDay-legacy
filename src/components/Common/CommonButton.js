/*****************************************************************************************************************
* Botão usado nos Overlays.																												  *																																		  *
*****************************************************************************************************************/

import React from 'react'
import { Text, Button } from 'native-base'

export default CommonButton = props => (
	<Button {...props}>
		<Text>{props.text}</Text>
	</Button>
)
