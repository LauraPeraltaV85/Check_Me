import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/home'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Login from './screens/login';
import Welcome from './screens/welcome';
import TryAgain from './screens/tryagain';
import CreateOrNot from './screens/CreateOrNot'

const Stack = createStackNavigator();

const myOptions = {
  title: '',
  headerTintColor: 'white',
  headerStyle:{
    backgroundColor: '#0B132B'
  }
}

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="CreateOrNot" component={CreateOrNot} 
          options={{...myOptions}} />
        <Stack.Screen name="Login" component={Login} 
          options={{...myOptions}} />
        <Stack.Screen name="Welcome" component={Welcome} 
          options={{...myOptions}} />
        <Stack.Screen name="TryAgain" component={TryAgain} 
          options={{...myOptions}} />
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

