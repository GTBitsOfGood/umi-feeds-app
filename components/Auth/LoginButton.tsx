import * as AuthSession from 'expo-auth-session';
import React, { useEffect } from 'react';
import { Alert, Button, Platform, StyleSheet, View } from 'react-native';

import { useDispatch } from 'react-redux';

import * as Auth0 from '../../constants/Auth0';

import { login, logout } from '../../redux/reducers/authReducer';

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
        // Retrieve the JWT access token from Auth0 and decode it
        const receivedToken = result.params.id_token;
        console.log(receivedToken);
        // dispatch(logout());
        dispatch(login(receivedToken));
      } else {
        Alert.alert('Authentication error!');
      }
    }
  }, [result]);

  return (
    <View style={styles.button}>
      <Button
        color="#F37B36"
        title="Continue to sign in"
        onPress={() => promptAsync({ useProxy })}
      />
    </View>

  );
}
const styles = StyleSheet.create({
  button:{
    width: 327,
    height: 52,
  }
});
export default LoginButton;
