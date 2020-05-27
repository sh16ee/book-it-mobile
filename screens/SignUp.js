import React, { Component } from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-paper'

import Main from './Main'

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      username: '',
      password: ''
    };
    this.userSignUp = this.userSignUp.bind(this)
  }

  userSignUp() {
    AsyncStorage.setItem('user', JSON.stringify(this.state));
    console.log(this.state);
    alert('User was registered successfully!')
    this.props.navigation.navigate('Main')
  }
  // saveData() {
  //   AsyncStorage.setItem('user', JSON.stringify(this.state));
  //   console.log(this.state);
  // }
  // displayData = async () => {
  //   try{
  //     let getUser = await AsyncStorage.getItem('user');
  //     let user = JSON.parse(getUser);
  //     console.log('Username is', user.name);
  //     this.props.navigation.navigate('Main', { email: 'user.email' });
  //   }
  //   catch(error){
  //     console.log(error);
  //   }
  // }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>SignUp screen</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
        />
        <TextInput
          style={styles.input}
          placeholder="Surname"
          value={this.state.surname}
          onChangeText={surname => this.setState({ surname })}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button} onPress={this.userSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
      borderRadius: 4,
      width: 240,
      backgroundColor: '#4541b0',
      alignItems: 'center'
    },
    buttonText: {
      color: 'white'
    }
});

export default SignUpScreen;
