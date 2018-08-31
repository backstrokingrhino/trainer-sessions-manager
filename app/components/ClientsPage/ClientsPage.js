import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Button, ListView} from 'react-native';
import {Header} from 'react-native-elements';
import {Navigator} from 'react-native-deprecated-custom-components';

type Props = {};
export default class ClientsPage extends Component<Props> {
  render() {
    return (
      <View>
        <Header 
          centerComponent={{text: 'My Clients', style: { color: '#fff', fontSize: 22 } }}
        />

      </View>
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

AppRegistry.registerComponent('ClientsPage', () => ClientsPage);
