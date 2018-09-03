import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import ClientsPage from './app/components/ClientsPage/ClientsPage';
import NewClientForm from './app/components/NewClientForm/NewClientForm';
import ClientCalendar from './app/components/ClientCalendar/ClientCalendar';

type Props = {};

const RootStack = createStackNavigator(
  {
    Home: ClientsPage,
    Calendar: ClientCalendar,
    NewClient: NewClientForm
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#476DC6'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 22
      },
    }
  }
);
export default class App extends Component<Props> {
  render() {
    return (
      <RootStack />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('App', () => App);
