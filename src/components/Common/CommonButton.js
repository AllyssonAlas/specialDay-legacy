import React from 'react'
import { Text, Button } from 'native-base'

const CommonButton = props => (
	<Button {...props}>
		<Text>{props.text}</Text>
	</Button>
)

export default CommonButton
