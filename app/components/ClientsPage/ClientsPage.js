import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, ListView, AsyncStorage, FlatList, TouchableHighlight} from 'react-native';
import {Header, Button, List, ListItem} from 'react-native-elements';

const testList = [
  {
    name: 'Hello'
  },
  { name: 'World!'}
];

type Props = {};
export default class ClientsPage extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      clients: this.fetchClients(),
    };
  }

  static navigationOptions = {
    title: 'My Clients',
  }

  componentDidMount() {
    this.fetchClients();
  }

  fetchClients = () => {
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

  onPress = () => {
    this.props.navigation.navigate('NewClient', {onNavigateBack: this.fetchClients});
  }  

  userPressed(client) {
    this.props.navigation.navigate('Calendar', {
      clientName: client.name,
      markedDates: client.markedDates,
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
        <Text></Text>
        <Button
          raised
          title="+ Add Client"
          onPress={this.onPress}
        />
        
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
  },
});

AppRegistry.registerComponent('ClientsPage', () => ClientsPage);
