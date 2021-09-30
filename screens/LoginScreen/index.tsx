// Navigation
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import LoginButton from '../../components/Auth/LoginButton';
import LogoutButton from '../../components/Auth/LogoutButton';
import { View, Text } from '../../style/Themed';
import { RootState } from '../../redux/rootReducer';
import Logo from '../../assets/images/umi-feeds-logo.svg';

import { HomeScreenParamList } from '../../navigation/SharedStack/Home/types';

import { BottomTabParamList } from '../../navigation/MainNavBar/types';

type LoginScreenProp = CompositeNavigationProp<
  StackNavigationProp<HomeScreenParamList, 'LoginScreen'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;

function LoginScreen() {
  const authState = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<LoginScreenProp>();

  return (
    <View style={styles.container}>
      <Logo />
      <View style={{ margin: '5%' }}>
        <Text style={{ fontSize: 15, textAlign: 'center', paddingTop: 227 }}>
          A food rescue non-profit organization based in Atlanta dedicated to serving the hungry and homeless healthy and nutritious meals.
        </Text>
      </View>
      {!authState.authenticated
        ? (
          <View>
            <LoginButton onUserNotFound={() => navigation.navigate('NewDonorName')} />
          </View>
        )
        : (
          <View>
            <Text style={{ fontSize: 20 }}>{`Hello, ${authState.name}!`}</Text>
            <Button title="Register as New Donor" onPress={() => navigation.navigate('NewDonorName')} />
            <LogoutButton />
          </View>
        )
      }
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
