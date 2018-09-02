import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import {FormLabel, FormInput, Header, Button, Icon} from 'react-native-elements';

//import ClientsPage from './app/components/ClientsPage/ClientsPage';

type Props = {};
export default class NewClientForm extends Component {

  constructor() {
    super();

    this.state = {
      name:'',
      sessionsSigned: -1,
      sessionsCompleted: -1,
      nameFieldEmpty: true
    }
  }

  onPress() {
    const clientData = [];
    const data = {
      name: this.state.name,
      sessionsSigned: this.state.sessionsSigned,
      sessionsCompleted: this.state.sessionsCompleted,
      markedDates: ['2018-09-14'],
    }
    clientData.push(data);
    try {
      AsyncStorage.getItem('client_database').then((value) => {
        if (value != null) {
          const currData = JSON.parse(value);
          currData.push(data);
          AsyncStorage.setItem('client_database', JSON.stringify(currData)).then(() => {
            this.props.navigator.push({
              //component: ClientsPage,
              id: 'clientsPage' // change to calendar
            });
          });
        }
        else {
          AsyncStorage.setItem('client_database', JSON.stringify(clientData)).then(() => {
            this.props.navigator.push({
              id: 'clientsPage' // change to calendar
            });
          });    
        }
      })
      
    } catch(error) {
      console.log(error);
    }

    
  } 

  onChangeText(value) {
    this.setState({
      name:value,
      nameFieldEmpty:false
    });
    if (value.length == 0) {
      this.setState({
        nameFieldEmpty:true
      });
    }
  }

  render() {
    return(
      <View>
        <Header 
          leftComponent={{icon: 'arrow-back', color: '#fff', onPress: () => this.onPress() }}
          centerComponent={{ text: 'New Client', style: { color: '#fff', fontSize: 22 } }}
        />
        <FormLabel>Name</FormLabel>
        <FormInput 
          placeholder="Enter name"
          autoCapitalize="words"
          onChangeText={(value) => this.onChangeText(value)}
          value={this.state.name}
        />

        <FormLabel>Sessions Signed Up For</FormLabel>
        <FormInput 
          placeholder="Optional"
          keyboardType="number-pad"
        />
        <FormLabel>Sessions Completed</FormLabel>
        <FormInput 
          placeholder="Optional"
          keyboardType="number-pad"
        />
        <Button 
          raised
          title="Submit"
          disabled={this.state.nameFieldEmpty}
          buttonStyle={{ backgroundColor: 'green' }}
          onPress={() => {this.onPress()}}
        />
      </View>
    );
  }
}


AppRegistry.registerComponent('NewClientForm', () => NewClientForm);
