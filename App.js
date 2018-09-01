import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

import ClientsPage from './app/components/ClientsPage/ClientsPage';
import NewClientForm from './app/components/NewClientForm/NewClientForm';

type Props = {};
export default class App extends Component<Props> {
  renderScene(route, navigator) {
    switch(route.id) {
      case 'clientsPage':
        return(<ClientsPage navigator={navigator} title="clientsPage" />);
      case 'newClientForm':
        return(<NewClientForm navigator={navigator} title="newClientForm" />);
    }
  }

  render() {
    return (
      <Navigator 
        initialRoute={{id: 'clientsPage'}}
        renderScene={this.renderScene}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
      />
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
