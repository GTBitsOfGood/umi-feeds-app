import React from 'react';

import { connect } from 'react-redux';
import { RootState } from '../../rootReducer';

import { Text, View } from '../Themed';

function LoginState(props: {
    authenticated: boolean,
    firstName: string,
    lastName: string,
    username: string,
}) {
  const { authenticated, firstName, lastName, username } = props;
  return (
    <View>
      <Text>{`Authenticated is ${authenticated}`}</Text>
      <Text>{`Your first name is ${firstName}, last name is ${lastName}, and username is ${username}`}</Text>
    </View>
  );
}

function mapStateToProps(state: RootState) {
  if (state.auth.jwt !== '') {
    return {
      authenticated: true,
      firstName: state.auth.firstName,
      lastName: state.auth.lastName,
      username: state.auth.username,
    };
  } else {
    return {
      authenticated: false,
      firstName: '',
      lastName: '',
      username: '',
    };
  }
}

export default connect(
  mapStateToProps
)(LoginState);
