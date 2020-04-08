import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, Button, TextInput } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setName, setDifficulty } from './../store/actions'
import RNPickerSelect from 'react-native-picker-select';

function HomeScreen() {
	const [localName, setLocalName] = useState('Player')
	const navigation = useNavigation()
	const dispatch = useDispatch()

	function goToGame() {
		dispatch(setName(localName))
		navigation.navigate('Game')
		setLocalName('')
		this.textInput.clear()
		this.pickerInput.clear()
	}

	function changeHandler({ nativeEvent }) {
		const text = nativeEvent.text
		setLocalName(text)
	}

	function selectDifficulty(difficulty){
		dispatch(setDifficulty(difficulty))
	}

	return (
		<SafeAreaView>
			<View style={ styles.container }>
				<Text style={ styles.title }>Sudoku</Text>
				<TextInput
					ref={input => { this.textInput = input }}
					placeholder="Input Your Name"
					style={ styles.nameInput }
					placeholderTextColor="#f8e1f4"
					onChange={ changeHandler }
					autoFocus
					autoCorrect= {false}
				>
				</TextInput>
				<View style={styles.containerPicker}>
					<RNPickerSelect
							textInputProps={{ref: input => this.pickerInput = input }}
							style={ pickerSelectStyles }
							placeholder={{label: "Select Difficulty", value: ''}}
							placeholderTextColor= "#f8e1f4"
							onValueChange={selectDifficulty}
							useNativeAndroidPickerStyle={false}
							items={[
									{ label: 'Easy', value: 'easy' },
									{ label: 'Medium', value: 'medium' },
									{ label: 'Hard', value: 'hard' },
									{ label: 'Random', value: 'random' }
							]}
					/>
				</View>
				<Button title="Play Game" onPress={ goToGame.bind(this) } color="#ff6363" />
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: wp('15%'),
		textAlign: "center",
		color: '#ffbd69',
		margin: wp('10%')
	},
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: wp('100%'),
		height: hp('100%'),
		backgroundColor: '#202040'
	},
	nameInput: {
		width: wp('40%'),
		height: hp('5%'),
		fontSize: wp('5%'),
		textAlign: "center",
		marginBottom: wp('3%'),
		color: '#f8e1f4'
	},
	containerPicker: {
		alignItems: "center",
		width: wp('40%'),
		height: hp('5%'),
		fontSize: wp('10%'),
		margin: wp('3%')
	}
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: wp('5%'),
    paddingVertical: wp('2%'),
    paddingHorizontal: wp('2%'),
    borderWidth: 1,
    borderColor: '#f8e1f4',
    borderRadius: 4,
		color: '#f8e1f4',
    paddingRight: wp('5%') // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: wp('5%'),
    paddingHorizontal: wp('2%'),
    paddingVertical: wp('2%'),
    borderWidth: 0.5,
    borderColor: 'gold',
    borderRadius: 8,
    color: '#f8e1f4',
    paddingRight: wp('5%') // to ensure the text is never behind the icon
  },
});

export default HomeScreen
