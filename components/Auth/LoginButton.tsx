import * as AuthSession from 'expo-auth-session';
import React, { useEffect } from 'react';
import { Alert, Button, Platform } from 'react-native';

import { useDispatch } from 'react-redux';

import * as Auth0 from '../../constants/Auth0';

import { login } from '../../redux/reducers/authReducer';

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

function LoginButton() {
  const dispatch = useDispatch();

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

        dispatch(login(receivedToken));
      } else {
        Alert.alert('Authentication error!');
      }
    }
  }, [result]);

  return (
    <Button
      title="Log In"
      onPress={() => promptAsync({ useProxy })}
    />
  );
}
export default LoginButton;
