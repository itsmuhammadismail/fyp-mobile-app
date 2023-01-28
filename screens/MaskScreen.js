import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

// import HomeScreen from './HomeScreen';
// import DetailsScreen from './DetailsScreen';
// import ExploreScreen from './ExploreScreen';
//import ProfileScreen from './ProfileScreen';

import Splash from './Splash';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import Mask from './Mask';
import MaskScreen from './MaskScreen'
// import {createAppContainer} from '@react-navigation/native'
// import {createDrawerNavigator} from '@react-navigation/drawer'

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      
      <Tab.Screen
        name="Notifications"
        component={FaceStackScreen}
        options={{
          tabBarLabel: 'Face Alert',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Explore"
        component={MaskStackScreen}
        options={{
          tabBarLabel: 'Mask Alert',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;



const FaceStackScreen = ({navigation}) => (
<DetailsStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#0782F9', 
        },
        headerTintColor: '#fff',
        headerTitleAlign:'center',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="Face Alert" component={HomeScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#0782F9" onPress={() => 
              navigation.openDrawer()
            }></Icon.Button>
        )
        }} />
</DetailsStack.Navigator>
);
const MaskStackScreen = ({navigation}) => (
  <DetailsStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#0782F9',
          },
          headerTintColor: '#fff',
          headerTitleAlign:'center',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <DetailsStack.Screen name="Mask Alert" component={Mask}  />
          
          
  </DetailsStack.Navigator>

);

// const appnav= createDrawerNavigator({
//   Home:{
//     screen:HomeScreen
//   },
//   Mask:{
//     screen:Mask
//   }
// })
// export default createAppContainer(appnav)