import * as React from 'react';
import { View, Button, Text, Animated, TextInput, StyleSheet } from 'react-native';
import base64 from 'base-64';

export default function Login({ navigation }) {
    const [username, onChangeUsername] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
    const styles = StyleSheet.create({
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 100,
      },
      h1: {
        fontSize: 30,
        fontWeight: 'bold',
      },
      button: {
        marginHorizontal: 5,
        marginTop: 5,
      },
    });
  
    const checkLogin = () => {
      fetch("http://cs571.cs.wisc.edu:5000/login", {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + base64.encode(username + ":" + password)
        }
        
      })
      .then(res => res.json())
        .then(res => {
        if (res.token) {
            navigation.navigate("Profile", {username: username, token: res.token});
        } else {
        alert("Incorrect username or password! Please try again.");
        }
        })
    }
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.h1}>Fitness Tracker</Text>
        <Text>Welcome! Please login or signup to continue.</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUsername}
          value={username == null ? '' : username}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password == null ? '' : password}
          placeholder="Password"
        />
        <View style={{ flexDirection:"row" }}>
          <View style={styles.button}>
              <Button title="Login" onPress={checkLogin} />
          </View>
          <View style={styles.button}>
              <Button title="Signup" onPress={()=> navigation.navigate('Signup')}/>
          </View>
        </View>
      </View>
    );
  }