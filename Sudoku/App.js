/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Button,
  Text,
  StatusBar,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import axios from 'axios'

function App ()  {
  const [grids, setGrids] = useState([])

  useEffect(() => {
    axios.get('https://sugoku.herokuapp.com/board?difficulty=easy')
    .then(result => {
      setGrids(result.data.board)
    })
    .catch(console.log)
  },[])

  function submit() {
    console.log('masok')
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
          <View style={styles.container}>
            <Text style={ styles.title }>Sudoku Ya</Text>
            <View style={ styles.board }>
              <FlatList
                data={ grids }
                renderItem= {({ item: data, index }) => (
                  <Row row={ data } />
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
          </View>
      </SafeAreaView>
    </>
  );
};

function Row (props) {
  const { row } = props
  console.log(row)
  return(
    <View style={ styles.row }>
      {
        row.map((element, i) => (
        <Grid key={ i } grid={ element } />
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
  const { grid } = props
  return(
    <View style={ styles.grid }>
      <Text>{ grid }</Text>
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

export default App;
