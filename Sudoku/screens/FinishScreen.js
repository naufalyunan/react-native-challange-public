import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { useNavigation } from '@react-navigation/native'
import { TapGestureHandler, State } from 'react-native-gesture-handler'

import { useDispatch, useSelector } from 'react-redux'
import { reset, fetchBoard, setDifficulty } from './../store/actions'
import RNPickerSelect from 'react-native-picker-select';


const FinishScreen = () => {
	const dispatch = useDispatch()
	const navigation = useNavigation()
	const difficulty = useSelector(state => state.board.difficulty)
	const name = useSelector(state => state.board.name)
	const diffPlaceholder = {
		label:  `Difficulty: ${difficulty}` ,
		value:  difficulty 
	}
	
	const url = `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`



	function playAgain({nativeEvent}) {
		if(nativeEvent.state === State.ACTIVE){
			dispatch(reset())
			dispatch(fetchBoard(url))
			navigation.pop()	
		}
	}

	function selectDifficulty(difficulty){
		dispatch(setDifficulty(difficulty))
	}

	return (
		<SafeAreaView>
			<View style={ styles.container }>
				<Text style={ styles.title }>{`Congratulation ${name}! You solve the board`}</Text>
				<TapGestureHandler onHandlerStateChange={ playAgain.bind(this) } numberOfTaps={2}>
					<Text style={ styles.playAgain }> Double Tap to play again </Text>
				</TapGestureHandler>
				<View style={styles.containerPicker}>
						<RNPickerSelect
								textInputProps={{ref: input => this.pickerInput = input }}
								style={ pickerSelectStyles }
								placeholder={diffPlaceholder}
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
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: wp('8%'),
		textAlign: 'center',
		padding: wp('1%'),
		color: '#ffbd69'
	},
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: wp('100%'),
		height: hp('100%'),
		backgroundColor: '#202040'
	},
	playAgain: {
		margin: 20,
		fontSize: wp('5%'),
		textAlign: 'center',
		color: '#ff6363'
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

export default FinishScreen
