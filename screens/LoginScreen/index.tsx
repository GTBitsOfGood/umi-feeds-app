// Navigation
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import React from 'react';
import { StyleSheet } from 'react-native';
import LoginButton from '../../components/Auth/LoginButton';
import { View, Text } from '../../style/Themed';
import Logo from '../../assets/images/umi-feeds-logo.svg';
import { LoginStackParamList } from '../../navigation/LoginStack/types';

type LoginScreenProp = StackNavigationProp<LoginStackParamList, 'Login'>

function LoginScreen() {
  const navigation = useNavigation<LoginScreenProp>();

  return (
    <View style={styles.container}>
      <Logo />
      <View style={{ margin: '5%' }}>
        <Text style={{ fontSize: 15, textAlign: 'center', paddingTop: 227 }}>
          A food rescue non-profit organization based in Atlanta dedicated to serving the hungry and homeless healthy and nutritious meals.
        </Text>
      </View>
      <View>
        <LoginButton onUserNotFound={() => navigation.navigate('OnboardingNameForm')} />
      </View>
    </View>
  );
}

export default LoginScreen;

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
