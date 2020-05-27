import React, { Component } from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet, Alert, Image, ImageBackground, StatusBar, AsyncStorage } from 'react-native'
import { TextInput } from 'react-native-paper'
import * as Font from 'expo-font';

import SignUp from './SignUp'
import Employee from './Employee'

const save = (name, data) => {
    try {
        AsyncStorage.setItem(name, data.toString()).then(response => console.log('Saved data to AsyncStorage')).catch(err => console.log(err));
    } catch (error) {
        console.log('Error approached', error.message);
    }
};

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: '',
      isAuthorized: false
    };
    this.userLogin = this.userLogin.bind(this)
  }

  // async userLogin(){
  //   let getUser = await AsyncStorage.getItem('user');
  //   let user = JSON.parse(getUser);
  //   console.log('Username is', user.name);
  //   console.log(this.state);
  //   if (this.state.username!=user.username || this.state.password!=user.password) {
  //     alert('Email or Password is incorrect')
  //   } else {
  //     this.props.navigation.navigate('Appointments')
  //   }
  // }

  async componentDidMount(){
    await Font.loadAsync({
      'comforta': require('../assets/fonts/Comforta.ttf'),
      'lato-bold': require('../assets/fonts/Lato-Bold.ttf')
    });
  }

  userLogin(){
    fetch('http://194.4.58.128/login_mobile/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(response => {
          if (!response.message) {
              save('userToken', response.token);
              save('userID', response.id_emp);
              save('userName', response.name);
              save('userPhone', response.phone);
              save('userCompany', response.company);
              this.props.navigation.replace('Employee')
          } else {
              console.log(response.message);
              Alert.alert(response.message)
          }
      })
      .catch(err => console.log(err))
  }


  render() {
    return (
      <ImageBackground source={require('../assets/mainbackground.png')} style={{flex: 1, resizeMode: 'cover'}}>
        <StatusBar barStyle = "light-content" hidden = {false} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/logo.png')} style={{height: 170, width: 310, marginBottom: 50}}/>
          <TextInput
            style={styles.input}
            placeholder="Логин"
            value={this.state.username}
            autoCapitalize='none'
            onChangeText={username => this.setState({ username })}
          />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.button}
            onPress={ this.userLogin }>
            <Text style={styles.buttonText}>Войти</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    input: {
      height: 50,
      margin: 5,
      width: 300
    },
    button: {
      padding: 10,
      margin: 10,
      width: 240,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      width: 300,
      borderRadius: 10
    },
    buttonText: {
      color: '#303031',
      fontFamily: 'comforta'
    }
});

export default MainScreen;
