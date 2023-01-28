import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './Splash';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import Mask from './Mask';
import MaskScreen from './MaskScreen'

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen  options={{ headerShown: false }} name="Splash" component={Splash} />
        <Stack.Screen  options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen  options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen  options={{ headerShown: false }} name="Mask" component={Mask} />
        <Stack.Screen options={{ headerShown: false }} name="MaskScreen" component={MaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




