import React, { useEffect } from 'react'
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

	console.log('-------')
	console.log(difficulty)
	// console.log(prevDifficulty)
	console.log('-------')
	// dispatch(setDifficulty(prevDifficulty))
	const url = `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`
	
	useEffect(() => {
		console.log('fetching....')
		console.log(url)
    dispatch(fetchBoard(url))
  },[dispatch, url])

	if(status){
		navigation.navigate('Finish')
	}
	console.log(grids)
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
		const send = encodeParams(payload)
		dispatch(solveBoard(send))
	}	

	if(loadingFetching) return (
		<SafeAreaView>
			<View style={{ display: "flex", justifyContent: "center", alignItems: "center" ,width: wp(100), height: hp(100)}}>
				<Text style={styles.title}>Fetching Board...</Text>
			</View>
		</SafeAreaView>
	)
	if(loadingSubmit) return (
		<SafeAreaView>
			<View style={{ display: "flex", justifyContent: "center", alignItems: "center" ,width: wp(100), height: hp(100)}}>
				<Text style={styles.title}>Validating...</Text>
			</View>
		</SafeAreaView>
	)
	console.log('====', message, '====')
	if(message) return (
		<SafeAreaView>
			<View style={{ display: "flex", justifyContent: "center", alignItems: "center" ,width: wp(100), height: hp(100)}}>
				<Text style={styles.title}>{ message }</Text>
				<TapGestureHandler onHandlerStateChange={() => { dispatch(setMessage(''))  }}>
					<Text>Tap here to try again</Text>
				</TapGestureHandler>
			</View>
		</SafeAreaView>
	)
	if(loadingGiveUp) return (
		<SafeAreaView>
			<View style={{ display: "flex", justifyContent: "center", alignItems: "center" ,width: wp(100), height: hp(100)}}>
				<Text style={styles.title}>Fetching Solution...</Text>
			</View>
		</SafeAreaView>
	)


	return (
		<SafeAreaView>
			<KeyboardAvoidingView
				behavior={Platform.Os == "ios" ? "padding" : "height"}
				style={styles.container}
			>
				{/* <View style={styles.container}> */}
					<Text style={ styles.title }>{`${name}'s Sudoku Game`}</Text>
					<Text style={ styles.title }>{`Difficulty: ${difficulty}`}</Text>
					<View style={ styles.board }>
						<FlatList
							data={ grids }
							renderItem= {({ item: data, index }) => (
								<Row row={ data } rowIndex={ index } />
							)}
							keyExtractor={(item, index) => index.toString()}
						/>
					</View>
					<Button
						onPress={submit}
						title="Submit"
						color="navy"
						accessibilityLabel="Learn more about this purple button"
						style= { styles.submit }
					/>
					<Button
						onPress={solved}
						title="Give Up!"
						color="maroon"
						style= { styles.submit }
					/>
				{/* </View> */}
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

function Row (props) {
  const { row, rowIndex } = props
  console.log(rowIndex)
  return(
    <View style={ styles.row }>
      {
        row.map((element, i) => (
        <Grid key={ i } grid={ element } rowIndex={ rowIndex } colIndex={ i }/>
        ))
      }
      {/* <FlatList
        data={ row }
        renderItem={({item: data, index}) => (
          <Grid grid={ data }/>
        )}
        keyExtractor={(data, index) => index.toString()}
      /> */}
    </View>
  )
}

function Grid (props) {
	const { grid, rowIndex, colIndex } = props
	const dispatch = useDispatch()

	function changeHandler(text) {
		const payload = {
			data: Number(text),
			rowIndex,
			colIndex
		}
		dispatch(setElement(payload))
	}

  return(
    <View style={ styles.grid }>
      { grid === 0 ? <TextInput style={ styles.gridText } maxLength={ 1 } onChangeText={text => changeHandler(text) } defaultValue={ grid.toString() } /> : <TextInput editable={ false } style={ styles.gridText } onChangeText={text => changeHandler(text) } defaultValue={ grid.toString() } /> }
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  title: {
    fontSize: 20,
    margin: 20
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'orange'
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
    borderColor: 'black',
    borderWidth: 1,
		backgroundColor: 'olive',
	},
	gridText: {
		fontSize: 20
	},
  submit: {
    width: '50%',
    height: '10%',
  }
});

export default GameScreen
