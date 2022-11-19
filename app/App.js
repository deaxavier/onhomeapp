import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screen/LoginScreen';
import SpashScreen from './screen/SpashScreen';
import LoadScreen from './screen/LoadScreen';
import HomeScreen from './screen/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
          name="SpashScreen"
          component={SpashScreen}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          name="LoadScreen"
          component={LoadScreen} />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;