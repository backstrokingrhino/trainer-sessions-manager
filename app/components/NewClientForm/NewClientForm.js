import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, AsyncStorage, TouchableOpacity} from 'react-native';
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

  static navigationOptions = {
    title: 'New Client',
  }

  onPressSubmit() {
    const clientData = [];
    const data = {
      name: this.state.name,
      sessionsSigned: this.state.sessionsSigned,
      sessionsCompleted: this.state.sessionsCompleted,
      markedDates: ['2000-09-14'],
    }
    clientData.push(data);
    try {
      AsyncStorage.getItem('client_database').then((value) => {
        if (value != null) {
          const currData = JSON.parse(value);
          currData.push(data);
          AsyncStorage.setItem('client_database', JSON.stringify(currData)).then(() => {
            this.props.navigation.state.params.onNavigateBack();
            this.props.navigation.navigate('Home');
          });
        }
        else {
          AsyncStorage.setItem('client_database', JSON.stringify(clientData)).then(() => {
            this.props.navigation.state.params.onNavigateBack();
            this.props.navigation.navigate('Home');
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

  onBackPress() {
    this.props.navigation.navigate('Home');
  }

  onSSChanged(value) {
    this.setState({ sessionsSigned: value });
  }

  onSCChanged(value) {
    this.setState({ sessionsCompleted: value });
  }

  render() {
    return(
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput 
          placeholder="Enter name"
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={(value) => this.onChangeText(value)}
        />

        <FormLabel>Sessions Signed Up For</FormLabel>
        <FormInput 
          placeholder="Optional"
          keyboardType="number-pad"
          onChangeText={(value) => this.onSSChanged(value)}
        />
        <FormLabel>Sessions Completed</FormLabel>
        <FormInput 
          placeholder="Optional"
          keyboardType="number-pad"
          onChangeText={(value) => this.onSCChanged(value)}
        />
        <Button 
          raised
          title="Submit"
          disabled={this.state.nameFieldEmpty}
          buttonStyle={{ backgroundColor: 'green' }}
          onPress={() => {this.onPressSubmit()}}
        />
      </View>
    );
  }
}


AppRegistry.registerComponent('NewClientForm', () => NewClientForm);
