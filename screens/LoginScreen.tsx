import React from 'react';
import { StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import LoginButton from '../components/Auth/LoginButton';
import LogoutButton from '../components/Auth/LogoutButton';

import { View, Text } from '../components/Themed';

import { RootState } from '../rootReducer';

function LoginScreen(props: {
  authenticated: boolean,
  firstName: string,
  lastName: string,
  username: string,
}) {
  const { authenticated, firstName, lastName, username, email } = props;

  return (
    <View style={styles.container}>

      {!authenticated
        ? <LoginButton />
        : (
          <View>
            <LogoutButton />
            <Text>{`Your first name is ${firstName}, last name is ${lastName}, and username is ${username}`}</Text>
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
