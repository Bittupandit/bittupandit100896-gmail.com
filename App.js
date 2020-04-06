import React, { Component } from 'react';
import { StyleSheet, Text, View ,ScrollView} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import MyHeader from './components/MyHeader';
import SearchScreen from './components/SearchScreen';
import HomeScreen from './components/HomeScreen';

import { TextInput ,Card, List} from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons';

export default class App extends Component {
  render(){
    return <AppContainer />
  }
}
  const TabNavigator = createBottomTabNavigator({
    'current city' : HomeScreen,
    'select city' : SearchScreen,
  },
  
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'current city') {
          iconName = `md-cloud`

        } else if (routeName === 'select city') {
          iconName = `md-options`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      activeBackgroundColor:'#6200ee',
      inactiveBackgroundColor:'#6200ee'
    },
  }
  )

const AppContainer = createAppContainer(TabNavigator)

 

