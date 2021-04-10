import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LoginButton from '../components/Auth/LoginButton';
import LogoutButton from '../components/Auth/LogoutButton';
import { View, Text } from '../components/Themed';
import { RootState } from '../rootReducer';
import Logo from '../assets/images/umi-feeds-logo.svg';

function LoginScreen(props: {
  authenticated: boolean,
  firstName: string,
  lastName: string,
  username: string,
}) {
  const { authenticated, firstName, lastName, username } = props;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Logo />
      <View style={{ margin: '5%' }}>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>
          The Umi Feeds app lets restaurants, caterers, supermarkets, and others donate excess food to people in need!
        </Text>
      </View>
      {!authenticated
        ? (
          <View>
            <LoginButton />
            <Button title="New Donor" onPress={() => navigation.navigate('NewDonorName')} />
          </View>
        )
        : (
          <View>
            <LogoutButton />
            <Text>{`Your first name is ${firstName}, last name is ${lastName}, and username is ${username}`}</Text>
            <Button title="New Donor" onPress={() => navigation.navigate('NewDonorName')} />
          </View>
        )
      }
    </View>
  );
}

function mapStateToProps(state: RootState) {
  return {
    authenticated: state.auth.authenticated,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    username: state.auth.username,
  };
}

export default connect(
  mapStateToProps
)(LoginScreen);

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
