import React, { useEffect } from 'react'
import { StyleSheet, FlatList, View, Button, Text, TextInput, SafeAreaView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch } from 'react-redux'

import { setElement, validateBoard, solveBoard, fetchBoard } from './../store/actions'

import { useNavigation } from '@react-navigation/native'


const GameScreen = () => {
	const grids = useSelector(state => state.board.board)
	const giveUpBoard = useSelector(state => state.board.giveUpBoard)
	const status = useSelector(state => state.board.status)
	const name = useSelector(state => state.board.name)
	const difficulty = useSelector(state => state.board.difficulty)
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
	return (
		<SafeAreaView>
			<View style={styles.container}>
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
			</View>
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
      <TextInput style={ styles.gridText } onChangeText={text => changeHandler(text) } defaultValue={ grid.toString() } ></TextInput>
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
    // backgroundColor : 'olive',
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
