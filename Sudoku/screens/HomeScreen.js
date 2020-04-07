import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, Button, TextInput } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setName } from './../store/actions'


function HomeScreen() {
	const [localName, setLocalName] = useState('')
	const navigation = useNavigation()
	const dispatch = useDispatch()
	
	function goToGame() {
		console.log(localName)
		dispatch(setName(localName))
		navigation.navigate('Game')
	}

	function changeHandler({ nativeEvent }) {
		const text = nativeEvent.text
		setLocalName(text)
	}

	return (
		<SafeAreaView>
			<View style={ styles.container }>
				<Text style={ styles.title }>Sudoku</Text>
				<TextInput
					placeholder="Input Your Name"
					style={ styles.nameInput }
					textAlignVertical="center"
					placeholderTextColor="grey"
					onChange={ changeHandler }
					autoFocus
					autoCorrect= {false}
				>
				</TextInput>
				<Button title="Play Game" onPress={ goToGame.bind(this) } />
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: wp('15%'),
		textAlign: "center"
	},
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: wp('100%'),
		height: hp('100%')
	},
	nameInput: {
		width: wp('40%'),
		height: hp('15%'),
		fontSize: wp('5%')
	}
})

export default HomeScreen
