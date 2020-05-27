import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';

import Events from './Events'

class Employee extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      name: '',
      phone: '',
      company: '',
    }
    this.userDetail = this.userDetail.bind(this)
    this.userLogOut = this.userLogOut.bind(this)
  }
  componentDidMount(){
    this.userDetail();
  }


  async userDetail(){
    await AsyncStorage.getItem('userName')
    .then(response => {this.setState({name: response})})
    await AsyncStorage.getItem('userID')
    .then(response => {this.setState({id: response})})
    await AsyncStorage.getItem('userCompany')
    .then(response => {this.setState({company: response})})
    await AsyncStorage.getItem('userPhone')
    .then(response => {this.setState({phone: response})})
    await Font.loadAsync({
      'comforta': require('../assets/fonts/Comforta.ttf'),
      'lato-bold': require('../assets/fonts/Lato-Bold.ttf')
    });
  }

  userLogOut(){
    AsyncStorage.clear();
    this.props.navigation.replace('Main')
  }

  render() {
    return (
      <ImageBackground source={require('../assets/eventsbackground.png')} style={{flex: 1, resizeMode: 'cover'}}>
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'flex-start' }}>
          <View style={styles.card}>
            <View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.cardText}>Добро пожаловать</Text>
                <Text style={styles.cardText}>{this.state.name}</Text>
              </View>
              <View>
                <Text style={styles.cardText}>Компания: {this.state.company}</Text>
                <Text style={styles.cardText}>Телефон: {this.state.phone}</Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Image source={require('../assets/helloboy.png')} style={{height: 100, width: 100}}/>
              <TouchableOpacity
                style={styles.button}
                onPress={ this.userLogOut }>
                <Image source={require('../assets/logout.png')} style={{height: 15, width: 15}}/>
              </TouchableOpacity>
            </View>
          </View>
          <Events />
        </View>
      </ImageBackground>
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
      margin: 5,
      width: 60,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      borderRadius: 10
    },
    buttonText: {
      color: 'white'
    },
    card: {
      backgroundColor: '#F5F5F7',
      borderRadius: 10,
      margin: 15,
      marginTop: 20,
      marginBottom: 0,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    cardText: {
      color: 'black',
      margin: 5,
      fontFamily: 'comforta',
      fontSize: 20
    }
});

export default Employee;
