/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './screens/HomeScreen'
import GameScreen from './screens/GameScreen'
import FinishScreen from './screens/FinishScreen'

const Stack = createStackNavigator()

function App ()  {

  return (
    <>
      <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={ HomeScreen } options={{ headerShown: false }}/>
            <Stack.Screen name="Game" component={ GameScreen } options={{ headerShown: false }}/>
            <Stack.Screen name="Finish" component={ FinishScreen } options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
    </>
  );
};

export default App;
