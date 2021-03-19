import React from 'react';

import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { RootState } from '../../rootReducer';

import { Text, View } from '../Themed';
import { decodedJwtToken } from '../../types';

function LoginState(props: {
    authenticated: boolean,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
}) {
  const { authenticated, firstName, lastName, username, email } = props;
  return (
    <View>
      <Text>{`Authenticated is ${authenticated}, email is ${email}`}</Text>
      <Text>{`Your first name is ${firstName}, last name is ${lastName}, and username is ${username}`}</Text>
    </View>
  );
}

function mapStateToProps(state: RootState) {
  if (state.auth.jwt !== '') {
    const userInfo : decodedJwtToken = jwtDecode(state.auth.jwt);
    return {
      authenticated: true,
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      username: userInfo.nickname,
      email: userInfo.name,
    };
  } else {
    return {
      authenticated: false,
      firstName: '',
      lastName: '',
      username: '',
      email: '',
    };
  }
}

export default connect(
  mapStateToProps
)(LoginState);
