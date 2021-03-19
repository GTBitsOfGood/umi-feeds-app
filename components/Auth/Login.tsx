import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { Alert, Button, Platform } from 'react-native';

import { connect } from 'react-redux';
import { Text, View } from '../Themed';

import * as Auth0 from '../../constants/Auth0';
import { decodedJwtToken } from '../../types';

import { login, logout } from './authReducer';
import { RootState } from '../../rootReducer';

const mapDispatchToProps = { login, logout };

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

function Login(props: {
  login: (token: string) => void,
  logout: () => void,
  authenticated: boolean,
  email: string,
}) {
  const { login, logout, authenticated, email } = props;

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

  const [logoutRequest, logoutResult, promptAsyncLogout] = AuthSession.useAuthRequest({
    redirectUri,
    clientId: Auth0.auth0ClientId,
  },
  { authorizationEndpoint: Auth0.logoutEndpoint });

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

  /* Can be used to do something on logout
  useEffect(() => {
    console.warn('LOGOUT RESULT');
    console.warn(logout);
    console.warn(logoutResult);
  }, [logoutResult]);
  */

  return (
    <View>
      {authenticated ? (
        <>
          <Text>
            You are logged in,
            { email }
            !
          </Text>
          <Button
            title="Log out"
            onPress={() => {
              logout();
              promptAsyncLogout({ useProxy });
            }}
          />
        </>
      ) : (
        <Button
          disabled={!request}
          title="Log in with Auth0"
          onPress={() => promptAsync({ useProxy })}
        />
      )}
    </View>
  );
}

function mapStateToProps(state: RootState) {
  return {
    authenticated: true,
    username: state.auth.username,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
