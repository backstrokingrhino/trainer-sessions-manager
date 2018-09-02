// calendar dateString starts months at 1 -> January

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, ListView, AsyncStorage} from 'react-native';
import {Header, Button, Icon} from 'react-native-elements';
import { Calendar, CalendarList } from 'react-native-calendars';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", 
                "September", "October", "November", "December"];

let markedDatesTest = [
    '2018-09-16',
    '2018-09-17',
    '2018-09-18',
    '2018-09-19'
];
var date = new Date(Date());

type Props = {};
export default class ClientCalendar extends Component<Props> {

  constructor(props) {
    super(props);
    let month = date.getMonth();
    let dateString = this.getTodayDate(date.getDate(), date.getMonth() + 1, date.getFullYear());
    this.state = {
      currentMonth: month,  // currently visible month number starting at 0 -> Jan
      currentMonthSessions: 0,
      currentFullDate: dateString,  // dateString of date today
      monthVisible: dateString, // dateString of month visible on calendar
      addRemoveTodayButton: {
        title: '',
        icon: 'add',
        color: 'limegreen'
      },
      markedDates: this.props.client.markedDates
    };
    this.onDayPress = this.onDayPress.bind(this);
  }

  componentDidMount() {
    this.setMarkedDates();
    this.setState({
      currentMonthSessions: this.getTotalSessions(date.getMonth() + 1), // sessions completed in current month
      addRemoveTodayButton: this.setAddRemoveTodayButton(this.state.currentFullDate),
    })
  }

  setMarkedDates() {
    this.setState({
      markedDates: this.props.client.markedDates
    })
  }

  getTodayDate(day, month, year) { // change name to getdateString()
    return (year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2));
  }

  setAddRemoveTodayButton(dateString) {
    let marked = this.state.markedDates;
    let checkMarkedDate = this.markedDatesContains(dateString)
    let button = {
      title: checkMarkedDate ? 'Remove Today\'s Session' : 'Add Session Today',
      icon: checkMarkedDate ? 'close' : 'add',
      color: checkMarkedDate ? 'red' : 'limegreen',
    };
    return (button);
  }

  markedDatesContains(dateString) {
    let marked = this.state.markedDates;
    for (i = 0; i < marked.length; i++) {
      if (marked[i] === dateString) {
        return (true);
      }
    }
    return (false);
  }

  getTotalSessions(currentMonth) {
    let count = 0;
    let marked = this.state.markedDates;
    for (i = 0; i < this.state.markedDates.length; i++) {
      let month = parseInt(marked[i].substring(5, 7));
      if (month == currentMonth) {
        count++;
      }
    }
    return (count);
  }

  //
  onDayPress(dateString) { // check VisibleMonth is currentMonth becore chaning sessions 
    let sessionChange = 1;
    let marked = this.state.markedDates;
    if (this.markedDatesContains(dateString)) {
      marked.splice(this.state.markedDates.indexOf(dateString), 1);
      this.setState({
        markedDates: marked
      });
      sessionChange = -1;
    }
    else {
      marked.push(dateString)
      this.setState({
        markedDates: marked
      });
    }
    //  check if current month sessions need to be changed
    if (this.state.monthVisible.substring(5, 7) == dateString.substring(5, 7)) {
      this.setState({
        currentMonthSessions: this.state.currentMonthSessions + sessionChange,
      })
    }
    //  setting state of add/remove session today button
    this.setState({
      addRemoveTodayButton: this.setAddRemoveTodayButton(this.state.currentFullDate),
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
    try {
      AsyncStorage.getItem('client_database').then((value) => {
        let currData = JSON.parse(value);
        let currClientData = currData.find(c => c.name === this.props.client.name);
        currData.splice(currData.indexOf(currClientData), 1);
        currClientData.markedDates = this.state.markedDates;
        currData.push(currClientData);
        AsyncStorage.setItem('client_database', JSON.stringify(currData)).then(() => {
          this.props.navigator.push({
            id: 'clientsPage' 
          });
        })
      })
    } catch(e) {

    }
    
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
    let marked = this.state.markedDates;
    let allMarkedDays = {}
    /*
    marked.forEach((day) => {
      allMarkedDays = {
        ...allMarkedDays,
        [day]: {
          selected: true
        }
      };
    });
    */
    for (i = 0; i < this.state.markedDates.length; i++) {
      allMarkedDays = {
        ...allMarkedDays,
        [marked[i]] : {selected: true}
      };
    }

    return (
      <View style={styles.container}>
        <View style={styles.body}>
        <Header 
          leftComponent={{icon: 'arrow-back', color: '#fff', onPress: () => this.onBackPress() }}
          centerComponent={{ text: `${this.props.client.name}\'s Sessions`, style: { color: '#fff', fontSize: 22 } }}
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
          backgroundColor={this.state.addRemoveTodayButton.color}
          icon={{name: this.state.addRemoveTodayButton.icon}}
          title={this.state.addRemoveTodayButton.title}
          onPress={() => this.onDayPress(this.state.currentFullDate)}
        />

        <Text>Date(): {Date()}</Text>
        <Text>Current full date: {this.state.currentFullDate}</Text>
        <Text>{this.state.addRemoveTodayButton['title']}</Text>
        <Text>Month visible: {this.state.monthVisible}</Text>
        <Text>Client Name: {this.props.client.name}</Text>
        <Text>Client dates: {this.state.markedDates.constructor.name}</Text>
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
  },
  button: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('ClientCalendar', () => ClientCalendar);


