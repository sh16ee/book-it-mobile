import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import moment from 'moment';
import 'moment/locale/ru';
import CalendarStrip from 'react-native-calendar-strip';
import Icon from 'react-native-vector-icons/Entypo';

class Events extends Component {
  constructor(props){
    super(props);
    this.state = {
      events: null,
      currentDateEvents: []
    }
    this.eventsList = this.eventsList.bind(this)
  }
  componentDidMount(){
    this.eventsList();
  }

  async eventsList(){
    const id = await AsyncStorage.getItem('userID')
    const token = 'Token ' + await AsyncStorage.getItem('userToken')

    fetch('http://194.4.58.128/events_mobile/' + id, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
      })
        .then(response => response.json())
        .then(response => {
            this.setState({events: response});
        })
        .catch(err => this.setState({events: null}));
    await Font.loadAsync({
      'comforta': require('../assets/fonts/Comforta.ttf'),
      'lato-bold': require('../assets/fonts/Lato-Bold.ttf')
    });
  }

  calendarEvents(date){
    let formattedDate = moment(date).format("YYYY-MM-DD").toString();
    let currentDateEvents = this.state.events.events.filter(item => item.start.toString().split(" ")[0] == formattedDate);
    this.setState({currentDateEvents: currentDateEvents});
  }

  render() {
    let item;
    const eventsSorted = (a, b) => {
      const avent = a.start.slice(11,16);
      const bvent = b.start.slice(11,16);

      let comparison = 0;
      if (avent > bvent) {
        comparison = 1;
      } else if (avent < bvent) {
        comparison = -1;
      }
      return comparison;
    };
    if (this.state.currentDateEvents){
        item = (
            <FlatList
                data={this.state.currentDateEvents.sort(eventsSorted)}
                keyExtractor={(item) => {item.start}}
                renderItem={({item}) =>
                  <View style={styles.card}>
                    <Text style={styles.cardText}>{item.start.slice(11, 16)}</Text>
                    <Icon name="dot-single" size={30} color="#000" style={{marginTop: 4}} />
                    <Text style={styles.cardText}>{item.text}</Text>
                  </View>
                }
            />
        )
    } else if (this.state.currentDateEvents==[]) {
      item = (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'black', fontFamily: 'comforta' }}>
        <Text>В выбранный вами день записи отсутсвуют</Text>
      </View>)
    } else {
      item = (
      <View style={[styles.loading, styles.horizontal]}>
        <ActivityIndicator size="large" color="#4541b0" />
      </View>)
    }
    return (
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'flex-start' }}>
        <CalendarStrip
                    scrollable={true}
                    calendarAnimation={{type: 'sequence', duration: 100}}
                    daySelectionAnimation={{
                      type: 'background',
                      duration: 100,
                      highlightColor: '#DCDCDC'
                    }}
                    style={{ height: 100, paddingTop: 10}}
                    dateNameStyle={{fontFamily: 'comforta'}}
                    dateNumberStyle={{fontFamily: 'lato-bold'}}
                    onDateSelected={(date) => this.calendarEvents(date)}
                    calendarHeaderStyle={{fontFamily: 'comforta'}}
                    markedDateStyle={{fontFamily: 'comforta'}}
                    iconContainer={{flex: 0.1}}
                    iconLeft={require('../assets/left.png')}
                    iconRight={require('../assets/right.png')}

        />
        {item}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    input: {
      height: 35,
      margin: 10,
      width: 240
    },
    button: {
      padding: 10,
      margin: 10,
      width: 240,
      backgroundColor: '#4541b0',
      alignItems: 'center'
    },
    buttonText: {
      color: 'white'
    },
    card: {
      backgroundColor: '#F5F5F7',
      margin: 10,
      padding: 2,
      borderRadius: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
    cardText: {
      color: 'black',
      fontSize: 15,
      fontFamily: 'comforta',
      padding: 10,
      marginTop: 3
    },
    loading: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
});

export default Events;
