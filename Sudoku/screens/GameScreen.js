import React from 'react'
import { StyleSheet, FlatList, View, Button, Text, TextInput, SafeAreaView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch } from 'react-redux'

import { setElement, validateBoard, solveBoard } from './../store/actions'

import { useNavigation } from '@react-navigation/native'


const GameScreen = () => {
	const grids = useSelector(state => state.board.board)
	const status = useSelector(state => state.board.status)
	const name = useSelector(state => state.board.name)
	const dispatch = useDispatch()
	const navigation = useNavigation()

	if(status){
		navigation.navigate('Finish')
	}

	//function to encode before send
	const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
	const encodeParams = (params) => 
		Object.keys(params)
		.map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
		.join('&');
	function submit() {
		const payload = {
			board: grids
		}
		const send = encodeParams(payload)
		dispatch(validateBoard(send))
	}


	function solved () {
		const payload = {
			board: grids
		}
		const send = encodeParams(payload)
		console.log(send)
		dispatch(solveBoard(send))
	}
	
	console.log(grids)
	return (
		<SafeAreaView>
			<View style={styles.container}>
				<Text style={ styles.title }>{` ${name}'s Sudoku Game `}</Text>
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
	const grids = useSelector(state => state.board.board)
	const dispatch = useDispatch()


	function changeHandler(text) {
		// console.log(text)
		// console.log(rowIndex)
		// console.log(colIndex)
		const payload = {
			data: Number(text),
			rowIndex,
			colIndex
		}
		dispatch(setElement(payload))
		// console.log(grids)
	}

  return(
    <View style={ styles.grid }>
      <TextInput onChangeText={text => changeHandler(text) } defaultValue={ grid.toString() } ></TextInput>
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
    backgroundColor: 'olive'
  },
  submit: {
    width: '50%',
    height: '10%',
  }
});

export default GameScreen
