import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Main from './screens/Main';
import SignUp from './screens/SignUp';
import Employee from './screens/Employee';
import Events from './screens/Events';

const Stack = createStackNavigator();

function NavigationStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main}
        options={
          {
            headerShown: false
          }
        }/>
      <Stack.Screen name="SignUp" component={SignUp}
        options={
          {
            headerShown: false
          }
        }/>
      <Stack.Screen name="Employee" component={Employee}
        options={
          {
            headerShown: false
          }
        }/>
      <Stack.Screen name="Events" component={Events}
          options={
            {
              headerShown: false
            }
          }/>
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#4541b0'
  }
});
