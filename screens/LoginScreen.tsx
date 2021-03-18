import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { Alert, Button, Platform, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

// Note that the client ID can be publicly exposed
const auth0ClientId = 'NvwWn7ZBWw6redyn0lZqvJEj0f9U0Qw7';
const authorizationEndpoint = 'https://bog-dev.us.auth0.com/authorize';
const logoutEndpoint = 'https://bog-dev.us.auth0.com/v2/logout';

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export default function LoginScreen() {
  const [name, setName] = useState(null);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: 'id_token',
      // retrieve the user's profile
      scopes: ['openid', 'profile'],
      extraParams: {
        // ideally, this will be a random value
        nonce: 'nonce',
      },
    },
    { authorizationEndpoint }
  );

  const [logout, logoutResult, promptAsyncLogout] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: 'id_token',
      // retrieve the user's profile
      scopes: ['openid', 'profile'],
      extraParams: {
        // ideally, this will be a random value
        nonce: 'nonce',
      },
    },
    { authorizationEndpoint: logoutEndpoint }
  );

  /*
  // Retrieve the redirect URL, add this to the callback URL list
  // of your Auth0 application.
  console.log(`Redirect URL: ${redirectUri}`);
  console.warn(`Redirect URL: ${redirectUri}`);
  console.warn(request);
  console.warn(logout);
  */

  useEffect(() => {
    if (result) {
      if (result.error) {
        Alert.alert(
          'Authentication error',
          result.params.error_description || 'something went wrong'
        );
        return;
      }
      if (result.type === 'success') {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token;
        const decoded = jwtDecode(jwtToken);

        const { name } = decoded;
        setName(name);
      }
    }

    console.log('RESULT');
    console.log(result);
  }, [result]);

  useEffect(() => {
    console.warn('LOGOUT RESULT');
    console.warn(logout);
    console.warn(logoutResult);
  }, [logoutResult]);

  return (
    <View style={styles.container}>
      {name ? (
        <>
          <Text style={styles.title}>
            You are logged in,
            {name}
            !
          </Text>
          <Button
            title="Log out"
            onPress={() => {
              setName(null);
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
