import * as AuthSession from 'expo-auth-session';
import React, { useEffect } from 'react';
import { Alert, Button, Platform } from 'react-native';

import { connect } from 'react-redux';

import * as Auth0 from '../../constants/Auth0';

import { login } from './authReducer';

const mapDispatchToProps = { login };

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

function LoginButton(props: {
  login: (token: string) => void,
}) {
  const { login } = props;

  const [request, result, promptAsync] = AuthSession.useAuthRequest({
    redirectUri,
    clientId: Auth0.auth0ClientId,
    // id_token will return a JWT token
    responseType: 'id_token',
    // retrieve the user's profile
    scopes: ['openid', 'profile'],
    extraParams: {
      // ideally, this will be a random value
      nonce: 'nonce',
    },
  },
  { authorizationEndpoint: Auth0.authorizationEndpoint });

  useEffect(() => {
    if (result) {
      if (result.type === 'success') {
        // Retrieve the JWT token and decode it
        const receivedToken = result.params.id_token;

        login(receivedToken);
      } else {
        Alert.alert('Authentication error!');
      }
    }
  }, [result]);

  return (
    <Button
      title="Log in with Auth0"
      onPress={() => promptAsync({ useProxy })}
    />
  );
}

export default connect(
  null,
  mapDispatchToProps
)(LoginButton);
