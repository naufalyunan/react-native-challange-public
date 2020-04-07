import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const FinishScreen = () => {
	return (
		<SafeAreaView>
			<View style={ styles.container }>
				<Text style={ styles.title }>Congratulation! You solve the board</Text>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: wp('8%'),
		textAlign: 'center',
		padding: wp('1%')
	},
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: wp('100%'),
		height: hp('100%')
	}
})

export default FinishScreen
