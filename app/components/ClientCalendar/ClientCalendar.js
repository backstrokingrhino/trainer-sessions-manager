// calendar dateString starts months at 1 -> January

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, ListView} from 'react-native';
import {Header, Button} from 'react-native-elements';
import { Calendar, CalendarList } from 'react-native-calendars';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", 
                "September", "October", "November", "December"];

var markedDate = [
    '2018-09-16',
    '2018-09-17',
    '2018-09-18',
    '2018-09-19'
];
var d = new Date(Date());

type Props = {};
export default class ClientCalendar extends Component<Props> {

  constructor() {
    super();
    
    this.state = {
      pressedDate: d,
      currentMonth: d.getMonth(), // starting at 0 -> Jan
      currentMonthSessions: this.getTotalSessions(d.getMonth() + 1)
    };
    this.onDayPress = this.onDayPress.bind(this);
  }

  getTotalSessions(month) {
    let count = 0;
    markedDate.forEach(function(date) {
      let currentMonth = parseInt(date.substring(5, 7));
      if (month == currentMonth) {
        count++;
      }
    });
    return (count);
  }

  onDayPress(day) {
    this.setState({
      pressedDate: day,
    });
    let date = day.dateString;
    if (markedDate.includes(date)) {
      markedDate.splice(markedDate.indexOf(date), 1);
      this.setState({
        currentMonthSessions: this.state.currentMonthSessions - 1
      });
    }
    else {
      markedDate.push(date);
      this.setState({
        currentMonthSessions: this.state.currentMonthSessions + 1
      });
    }
  }

  onMonthChange(month) { 
    this.setState({
      currentMonth: month.month - 1,
      currentMonthSessions: this.getTotalSessions(month.month)
    });
  }

  onPress() {
    this.props.navigator.push({
      id: 'clientsPage' // change to calendar
    });
  } 

  render() {
    let allMarkedDays = {}
    markedDate.forEach((day) => {
      allMarkedDays = {
        ...allMarkedDays,
        [day]: {
          selected: true
        }
      };
    });
    return (
      <View style={styles.container}>
        <Header 
          leftComponent={{icon: 'chevron-left', color: '#fff', onPress: () => this.onPress() }}
          centerComponent={{ text: '*Name\'s* Sessions', style: { color: '#fff', fontSize: 22 } }}
        />
        <Calendar
          onDayPress={(day) => {this.onDayPress(day)}}
          onMonthChange={(month) => this.onMonthChange(month)}
          markedDates={allMarkedDays}
          theme={{
            todayTextColor: '#ff2b2b'
          }}
        />
        <Text>{this.state.pressedDate.day}</Text>
        <Text>{this.state.pressedDate.month}</Text>
        <Text>{this.state.pressedDate.year}</Text>
        <Text>{this.state.pressedDate.timestamp}</Text>
        <Text>{this.state.pressedDate.dateString}</Text>
        <Text>{Date()}</Text>
        <Text style={styles.welcome}>Sessions Completed In {months[this.state.currentMonth]}: {this.state.currentMonthSessions}</Text>
        <Text style={styles.instructions}>{this.state.currentMonth + 1}</Text>
        <Text>{this.state.currentMonthSessions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  welcome: {

    fontSize: 20,
    textAlign: 'center',
    margin: 12,
    backgroundColor: '#476DC5',
    color: '#ffffff',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ClientCalendar', () => ClientCalendar);


