import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Contants from 'expo-constants'
import Home from './screens/home'
import CreateEmployee from './screens/CreateEmployee'
import Profile from './screens/profile'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator();

const myOptions = {
  title: 'Employees',
  headerTintColor: 'white',
  headerStyle:{
    backgroundColor: '#0B132B'
  }
}

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={myOptions} />
        <Stack.Screen name="Create" component={CreateEmployee} 
          options={{...myOptions, title: 'Create Employee'}} />
        <Stack.Screen name="Profile" component={Profile} 
          options={{...myOptions, title: 'Profile'}} />
      </Stack.Navigator>
    </View>
  );
}

export default ()=>{
  return (
    <NavigationContainer>
       <App />
    </NavigationContainer>
  )
 } 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});

