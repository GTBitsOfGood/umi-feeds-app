import React from 'react';
import { StyleSheet } from 'react-native';
import Login from '../components/Login/Login';
import LoginState from '../components/Login/LoginState';
import { View } from '../components/Themed';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Login />
      <LoginState />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
