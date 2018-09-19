import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, ListView, AsyncStorage, FlatList, TouchableHighlight, Alert} from 'react-native';
import {Header, Button, List, ListItem, Icon} from 'react-native-elements';

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

  _showAlert(item) {
    Alert.alert(
      'Delete Client',
      'Are you sure you want to delete this client?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => this.deleteItem(item)}
      ],
    )
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
        rightIcon={{name: 'delete'}}
        onPressRightIcon={() => {this._showAlert(item.name)}}
      />
    );
  }

  deleteItem(item) {
    AsyncStorage.getItem('client_database').then((value) => {
      let currData = JSON.parse(value);
      let currClientData = currData.find(c => c.name === item);
      currData.splice(currData.indexOf(currClientData), 1);
      AsyncStorage.setItem('client_database', JSON.stringify(currData)).then(() => {
        this.fetchClients();
      });
    });

  }

  render() {
    let clientList = JSON.stringify(this.state.clients);
    

    return (
      <View style={styles.container}>
        <View style={{paddingTop: 15}}>
        <Button
          raised
          title="+ Add Client"
          onPress={this.onPress}
        />
        </View>
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
