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
    let dateString = this.getTodayDate(date.getDate(), date.getMonth() + 1, date.getFullYear());
    this.state = {
      //pressedDate: date,
      currentMonth: month, // currently visible month number starting at 0 -> Jan
      currentMonthSessions: this.getTotalSessions(month + 1), // sessions completed in current month
      currentFullDate: dateString, // dayString of date today
      monthVisible: dateString, // dayString of month visible on calendar
      addOrRemoveSessionToday: this.addOrRemoveToday(dateString), // string for add/remove session today button
      addOrRemoveTodayIcon: this.addOrRemoveTodayIcon(dateString), // icon for add/remove session today button
    };
    this.onDayPress = this.onDayPress.bind(this);
  }

  getTodayDate(day, month, year) { // change name to getDayString()
    return (year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2));
  }

  addOrRemoveToday(date) {
    let buttonText =  markedDates.includes(date) ? 'Remove Today\'s Session' : 'Add Session Today';
    return (buttonText);  
  }

  addOrRemoveTodayIcon(date) {
    let buttonIconName = markedDates.includes(date) ? 'close' : 'add';
    return (buttonIconName);
  }

  getTotalSessions(currentMonth) {
    let count = 0;
    markedDates.forEach(function(date) {
      let month = parseInt(date.substring(5, 7));
      if (month == currentMonth) {
        count++;
      }
    });
    return (count);
  }

  //checks if the currentMonth is the visibleMonth
  currentMonthVisibleCheck() {
    return (this.state.mo + 1 === parseInt(this.state.monthVisible.substring(5, 7)));
  }

  //
  onDayPress(dayString) { // check VisibleMonth is currentMonth becore chaning sessions 
    let sessionChange = 1;
    if (markedDates.includes(dayString)) {
      markedDates.splice(markedDates.indexOf(dayString), 1);
      sessionChange = -1;
    }
    else {
      markedDates.push(dayString);
    }
    //  check if current month sessions need to be changed
    if (this.state.monthVisible.substring(5, 7) == dayString.substring(5, 7)) {
      this.setState({
        currentMonthSessions: this.state.currentMonthSessions + sessionChange,
      })
    }
    //  setting state of add/remove session today button
    this.setState({
      addOrRemoveSessionToday: this.addOrRemoveToday(this.state.currentFullDate),
      addOrRemoveTodayIcon: this.addOrRemoveTodayIcon(this.state.currentFullDate),
    });
  }

  onMonthChange(month) { 
    this.setState({
      currentMonth: month.month - 1,
      currentMonthSessions: this.getTotalSessions(month.month),
      monthVisible: this.getTodayDate(1, month.month, month.year),
    });
  }

  onBackPress() {
    this.props.navigator.push({
      id: 'clientsPage' 
    });
  } 

  onBackToCurrentPress() {
    let month = date.getMonth();
    this.setState({
      monthVisible: this.state.currentFullDate,
      currentMonth: month,
      currentMonthSessions: this.getTotalSessions(month + 1),

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
          <Button
            raised
            rounded
            title="Return to Current Month"
            onPress={() => this.onBackToCurrentPress()}
          />

          <Calendar
            current={this.state.monthVisible}
            onDayPress={(day) => {this.onDayPress(day.dateString)}}
            onMonthChange={(month) => this.onMonthChange(month)}
            markedDates={allMarkedDays}
            theme={{
              todayTextColor: '#ff2b2b'
            }}
          />

          <Button 
            raised
            rounded
            icon={{name: this.state.addOrRemoveTodayIcon}}
            title={this.state.addOrRemoveSessionToday}
            onPress={() => this.onDayPress(this.state.currentFullDate)}
          />

          <Text>{Date()}</Text>
          <Text>{this.state.currentFullDate}</Text>
          <Text>{this.state.addOrRemoveSessionToday}</Text>
          <Text>{this.state.monthVisible}</Text>
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
    bottom: 0
  }
});

AppRegistry.registerComponent('ClientCalendar', () => ClientCalendar);


