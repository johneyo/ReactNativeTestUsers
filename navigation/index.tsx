import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState, Fragment} from 'react';
import {ColorSchemeName} from 'react-native';
import Home from '../Home';

import {AppStackParamList} from '../types';
export default function Navigation({}: {}) {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const App = createStackNavigator<AppStackParamList>();
function AppNavigator() {
  return (
    <App.Navigator screenOptions={{headerShown: false}}>
      <App.Screen name="Home" component={Home} />
    </App.Navigator>
  );
}
