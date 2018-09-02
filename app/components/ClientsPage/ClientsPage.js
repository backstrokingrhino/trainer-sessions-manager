import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, ListView, AsyncStorage, FlatList, TouchableHighlight} from 'react-native';
import {Header, Button, List, ListItem} from 'react-native-elements';
import {Navigator} from 'react-native-deprecated-custom-components';

const testList = [
  {
    name: 'Hello'
  },
  { name: 'World!'}
];

type Props = {};
export default class ClientsPage extends Component<Props> {

  constructor() {
    super();
    this.state = {
      clients: JSON.parse('{}'),
    };
  }

  componentDidMount() {
    this.fetchClients();
  }

  fetchClients() {
    try {
      AsyncStorage.getItem('client_database').then((value) => {
        if (value !== null) {
          this.setState({
            clients: JSON.parse(value),
          });
        }
    });
    } catch(error) {

    }
  }

  onPress() {
    this.props.navigator.push({
      id: 'newClientForm',
    });
  }  

  userPressed(client) {
    this.props.navigator.push({
      id: 'clientCalendar',
      client: client
    });
  }

  _renderRow({item}) {
    return(
      <ListItem
        title={item.name}
        onPress={() => {this.userPressed(item)}}
      />
    );
  }

  render() {
    let clientList = JSON.stringify(this.state.clients);
    

    return (
      <View style={styles.container}>
        <Header 
          centerComponent={{text: 'My Clients', style: { color: '#fff', fontSize: 22 } }}
        />
        <Text></Text>
        <Button
          raised
          rounded
          title="+ Add Client"
          onPress={() => {this.onPress()}}
        />

        <Text>{this.state.test}</Text>
        <View style={{flex: 1}}>
          <List>
            <FlatList
              data={this.state.clients}
              renderItem={this._renderRow.bind(this)}
              keyExtractor={item => item.name}
            />
          </List>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  add: {
    alignItems:'center',
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('ClientsPage', () => ClientsPage);
