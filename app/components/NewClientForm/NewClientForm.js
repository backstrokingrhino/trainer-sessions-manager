import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import {FormLabel, FormInput, Header, Button, Icon} from 'react-native-elements';


type Props = {};
export default class NewClientForm extends Component {

  constructor() {
    super();

    this.state = {
      name:'',
      nameFieldEmpty:true
    }
  }

  onPress() {
    this.props.navigator.push({
      id: 'clientsPage' // change to calendar
    });
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
