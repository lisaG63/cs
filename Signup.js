import * as React from 'react';
import { View, Button, Text, Animated, TextInput, StyleSheet } from 'react-native';

export default function Signup({ navigation }) {
    const [username, onChangeUsername] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);

    const createAccount = () => {
        if (/\s/.test(username)) {
            alert("Username cannot include whitespace!");
            return;
        }
        if (/\s/.test(password)) {
            alert("Password cannot include whitespace!");
            return;
        }
        fetch("http://cs571.cs.wisc.edu:5000/users", {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            username: username,
            password: password,
            })
            
        })
        .then(res => res.json())
        .then(res => {alert(res.message)});
        

    }

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

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.h1}>Fitness Tracker</Text>
            <Text>New here? Let's get started!</Text>
            <Text>Please create an account below.</Text>
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
                <Button title="Create Account" onPress={createAccount} />
            </View>
            <View style={styles.button}>
                <Button title="Never Mind!" onPress={()=> navigation.navigate('Login')}/>
            </View>
            </View>
        </View>
    );
}
