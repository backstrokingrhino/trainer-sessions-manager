// calendar dateString starts months at 1 -> January

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, ListView} from 'react-native';
import {Header, Button, Icon} from 'react-native-elements';
import { Calendar, CalendarList } from 'react-native-calendars';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", 
                "September", "October", "November", "December"];

var markedDates = [
    '2018-09-16',
    '2018-09-17',
    '2018-09-18',
    '2018-09-19'
];
var date = new Date(Date());

type Props = {};
export default class ClientCalendar extends Component<Props> {

  constructor() {
    super();
    let month = date.getMonth();
    let year = date.getFullYear();
    this.state = {
      //pressedDate: date,
      currentMonth: month, // starting at 0 -> Jan
      currentMonthSessions: this.getTotalSessions(month + 1),
      currentFullDate: this.getTodayDate(month + 1, year),
      monthVisible: this.getTodayDate(month + 1, year),
      addOrRemoveSessionToday: this.addOrRemoveToday(this.getTodayDate(month + 1, year))
    };
    this.onDayPress = this.onDayPress.bind(this);
  }

  getTodayDate(month, year) {
    return (year.toString() + '-' + ('0' + month).slice(-2) + '-' + ('0' + date.getDate()).slice(-2));
  }

  addOrRemoveToday(date) {
    let buttonText =  markedDates.includes(date) ? 'Remove Today\'s Session' : 'Add Session Today';
    return (buttonText);  
  }

  getTotalSessions(month) {
    let count = 0;
    markedDates.forEach(function(date) {
      let currentMonth = parseInt(date.substring(5, 7));
      if (month == currentMonth) {
        count++;
      }
    });
    return (count);
  }

  onDayPress(dayString) {
    //this.setState({
     // pressedDate: day,
    //});
    //let date = day.dateString;
    if (markedDates.includes(dayString)) {
      markedDates.splice(markedDates.indexOf(date), 1);
      this.setState({
        currentMonthSessions: this.state.currentMonthSessions - 1
      });
    }
    else {
      markedDates.push(dayString);
      this.setState({
        currentMonthSessions: this.state.currentMonthSessions + 1
      });
    }
    this.setState({
      addOrRemoveSessionToday: this.addOrRemoveToday(this.state.currentFullDate)
    });
  }

  onMonthChange(month) { 
    this.setState({
      currentMonth: month.month - 1,
      currentMonthSessions: this.getTotalSessions(month.month),
    });
  }

  onBackPress() {
    this.props.navigator.push({
      id: 'clientsPage' // change to calendar
    });
  } 

  render() {
    let allMarkedDays = {}
    markedDates.forEach((day) => {
      allMarkedDays = {
        ...allMarkedDays,
        [day]: {
          selected: true
        }
      };
    });

    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Header 
            leftComponent={{icon: 'arrow-back', color: '#fff', onPress: () => this.onBackPress() }}
            centerComponent={{ text: '*Client\'s* Sessions', style: { color: '#fff', fontSize: 22 } }}
          />
          <Text></Text>
          <Calendar
            onDayPress={(day) => {this.onDayPress(day.dateString)}}
            onMonthChange={(month) => this.onMonthChange(month)}
            markedDates={allMarkedDays}
            theme={{
              todayTextColor: '#ff2b2b'
            }}
          />
          <Button 
            title={this.state.addOrRemoveSessionToday}
            onPress={() => this.onDayPress(this.state.currentFullDate)}
          />

          <Text>{Date()}</Text>
          <Text>{this.state.currentFullDate}</Text>
          <Text>{this.state.addOrRemoveSessionToday}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Sessions Completed In {months[this.state.currentMonth]}: {this.state.currentMonthSessions}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

  },
  body: {
    flex: 1,
  },
  spacing: {
    flex: 0.2,
    justifyContent: 'center'
  },
  footerText: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '400'
  },
  instructions: {
    textAlign: 'center',
    color: '#555555',
    marginBottom: 5,
  },
  footer: {
    backgroundColor: '#7c7c7c',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    bottom: 10
  }
});

AppRegistry.registerComponent('ClientCalendar', () => ClientCalendar);


