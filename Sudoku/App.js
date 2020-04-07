/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { fetchBoard, fetchGiveUpBoard } from './store/actions'

import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './screens/HomeScreen'
import GameScreen from './screens/GameScreen'
import FinishScreen from './screens/FinishScreen'

const Stack = createStackNavigator()

function App ()  {
	const difficulty = useSelector(state => state.board.difficulty)
  const dispatch = useDispatch()
	const url = `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`
  console.log(difficulty)
  console.log(url)
  useEffect(() => {
    dispatch(fetchBoard(url))
    console.log('masok')
  },[dispatch, url])

  useEffect(() => {
    dispatch(fetchGiveUpBoard(url))
  },[dispatch, url])

  return (
    <>
      <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={ HomeScreen } options={{ headerShown: false }}/>
            <Stack.Screen name="Game" component={ GameScreen } />
            <Stack.Screen name="Finish" component={ FinishScreen } options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
    </>
  );
};

export default App;
