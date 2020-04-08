import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, FlatList, View, Button, Text, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch } from 'react-redux'

import { setElement, validateBoard, solveBoard, fetchBoard, setMessage } from './../store/actions'

import { useNavigation } from '@react-navigation/native'
import { TapGestureHandler } from 'react-native-gesture-handler';


const GameScreen = () => {
	const grids = useSelector(state => state.board.board)
	const giveUpBoard = useSelector(state => state.board.giveUpBoard)
	const status = useSelector(state => state.board.status)
	const name = useSelector(state => state.board.name)
	const difficulty = useSelector(state => state.board.difficulty)
	const loadingFetching = useSelector(state => state.loading.loadingFetching)
	const loadingSubmit = useSelector(state => state.loading.loadingSubmit)
	const loadingGiveUp = useSelector(state => state.loading.loadingGiveUp)
	const message = useSelector(state => state.board.message)
	const dispatch = useDispatch()
	const navigation = useNavigation()

	// const [old, setOld] = useState([])
	const url = `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`
	
	useEffect(() => {
		console.log('fetching....')
		console.log(url)
		dispatch(fetchBoard(url))
		console.log(grids)
		console.log(giveUpBoard)
  },[dispatch, url])

	if(status){
		navigation.navigate('Finish')
	}
	//function to encode before send
	const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
	const encodeParams = (params) => 
		Object.keys(params)
		.map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
		.join('&');
	//validate 
	function submit() {
		const payload = {
			board: grids
		}
		const send = encodeParams(payload)
		dispatch(validateBoard(send))
	}
	//give up
	function solved () {
		const payload = {
			board: giveUpBoard
		}
		console.log('======')
		console.log(grids)
		console.log(giveUpBoard)
		console.log('======')
		const send = encodeParams(payload)
		dispatch(solveBoard(send))
	}	

	if(loadingFetching) return (
		<SafeAreaView>
			<View style={{ display: "flex", justifyContent: "center", alignItems: "center" ,width: wp('100%'), height: hp('100%'), backgroundColor: '#202040'}}>
				<Text style={{ fontSize: wp(10), color: '#ffbd69' }}>Fetching Board...</Text>
			</View>
		</SafeAreaView>
	)
	if(loadingSubmit) return (
		<SafeAreaView>
			<View style={{ display: "flex", justifyContent: "center", alignItems: "center" ,width: wp('100%'), height: hp('100%'), backgroundColor: '#202040'}}>
				<Text style={{ fontSize: wp(10), color: '#ffbd69' }}>Validating...</Text>
			</View>
		</SafeAreaView>
	)
	if(message) return (
		<SafeAreaView>
			<View style={{ display: "flex", justifyContent: "center", alignItems: "center" ,width: wp('100%'), height: hp('100%'), backgroundColor: '#202040'}}>
				<Text style={{ fontSize: wp(10), color: '#ffbd69', margin: wp('5%') }}>{ message }</Text>
				<TapGestureHandler onHandlerStateChange={() => { dispatch(setMessage(''))  }}>
					<Text style={{ ...styles.submit, width: wp('50%') }}>Tap here to try again</Text>
				</TapGestureHandler>
			</View>
		</SafeAreaView>
	)
	if(loadingGiveUp) return (
		<SafeAreaView>
			<View style={{ display: "flex", justifyContent: "center", alignItems: "center" ,width: wp('100%'), height: hp('100%'), backgroundColor: '#202040'}}>
				<Text style={{ fontSize: wp(10), color: '#ffbd69' }}>Fetching Solution...</Text>
			</View>
		</SafeAreaView>
	)


	return (
			<KeyboardAvoidingView
				behavior={Platform.Os == "ios" ? "padding" : "height"}
				style={{flex: 1}}
			>
				<SafeAreaView style={ styles.container }>
					<Text style={ {...styles.title, marginTop: 30} }>{`${name}'s Sudoku Game`}</Text>
					<Text style={ {...styles.title, marginBottom: 30} }>{`Difficulty: ${difficulty}`}</Text>
					<View style={ styles.board }>
						<FlatList
							data={ grids }
							renderItem= {({ item: data, index }) => (
								<Row row={ data } rowIndex={ index } />
							)}
							keyExtractor={(item, index) => index.toString()}
						/>
					</View>
					<View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-around', width: wp(70), height: hp(20), marginTop: 20 }}>
						<TapGestureHandler onHandlerStateChange={ submit }>
							<Text style={ styles.submit }> Submit </Text>
						</TapGestureHandler>
						<TapGestureHandler onHandlerStateChange={ solved }>
							<Text style={ styles.submit }> Give Up </Text>
						</TapGestureHandler>
					</View>
				<View style={{ flex : 1 }} />
			</SafeAreaView>
		</KeyboardAvoidingView>
	)
}

function Row (props) {
  const { row, rowIndex } = props
  return(
    <View style={ styles.row }>
      {
        row.map((element, i) => (
        <Grid key={ i } grid={ element } rowIndex={ rowIndex } colIndex={ i }/>
        ))
      }
    </View>
  )
}

function Grid (props) {
	const board = useSelector(state => state.board.board)
	const { grid, rowIndex, colIndex } = props
	const dispatch = useDispatch()

	function changeHandler(text) {
		const payload = {
			data: Number(text),
			rowIndex,
			colIndex
		}
		dispatch(setElement(payload))
		console.log('function change element')
		// console.log(board)
	}

	const renderStyle = () => {
		if((rowIndex + 1) % 3 === 0){
			if((colIndex + 1) % 3 === 0) {
				return {...styles.grid, borderRightColor: 'black', borderRightWidth: 1, borderBottomColor: 'black', borderBottomWidth: 1 }
			} else {
				return {...styles.grid, borderBottomColor: 'black', borderBottomWidth: 1 }
			}
		}
		if(rowIndex === 0){
			if((colIndex + 1) % 3 === 0) {
				return {...styles.grid, borderRightColor: 'black', borderRightWidth: 1, borderTopColor: 'black', borderTopWidth: 1 }
			} else {
				return {...styles.grid, borderTopColor: 'black', borderTopWidth: 1 }
			}
		} else {
			if((colIndex + 1) % 3 === 0) {
				return {...styles.grid, borderRightColor: 'black', borderRightWidth: 1 }
			} else {
				return { ...styles.grid }  
			}
		}
	}

  return(
		<>
			{ 
				grid === 0 ? 
					<View style={ renderStyle() }>
						<TextInput style={ styles.gridText } maxLength={ 1 } onChangeText={text => changeHandler(text) } defaultValue={ grid.toString() } /> 
					</View>
					: 
					<View style={ {...renderStyle(), backgroundColor: '#efa8e4' }}>
						<TextInput editable={ false } style={ styles.gridText } onChangeText={text => changeHandler(text) } defaultValue={ grid.toString() } /> 
					</View>
			}
		</>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  title: {
    fontSize: 20,
		margin: 10,
		color: '#ffbd69'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
		flex: 1,
		backgroundColor: '#202040',
		justifyContent: "flex-end"
  },
  board: {
    width: wp('90%'),
    height: hp('54%'),
    backgroundColor: 'gold',
    marginBottom: 10
  },
  row: {
    display: "flex",
    flexDirection: 'row',
    width: wp('90%'),
    height: hp('6%')
  },
  grid: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('10%') ,
    height: hp('6%'),
    borderColor: 'grey',
		borderWidth: 0.5,
		backgroundColor: '#fff0f5',
		color: '#543864'
	},
	gridText: {
		fontSize: 20
	},
  submit: {
    fontSize: 20,
		color: "#ff6363",
		backgroundColor: '#543864',
		height: hp('4%'),
		width: wp('30%'),
		margin: wp('3%'),
		textAlign: "center",
		textAlignVertical: 'center',
		padding: wp('1%'),
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 5
  }
});

export default GameScreen
