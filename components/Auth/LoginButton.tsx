import * as AuthSession from 'expo-auth-session';
import React, { useEffect } from 'react';
import { Alert, Platform, View } from 'react-native';
import { Button } from 'react-native-elements';

import { useDispatch } from 'react-redux';

import jwtDecode from 'jwt-decode';
import axios, { AxiosError } from 'axios';
import * as Auth0 from '../../constants/Auth0';

import { login, beginOnboarding } from '../../redux/reducers/authReducer';
import { decodedJwtToken } from '../../types';
import { OnboardingUser } from '../../redux/reducers/authReducer/types';

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

function LoginButton(props: {onUserNotFound: ()=>void}) {
  const dispatch = useDispatch();
  const { onUserNotFound } = props;

  const [, result, promptAsync] = AuthSession.useAuthRequest({
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
        const userInfo: decodedJwtToken = jwtDecode(receivedToken);
        // Now that we have the user access token we can request the user information from the backend
        axios.post(`/login/${userInfo.sub}`, {}).then((res) => {
          // This is the success condition: we have found the user based on the accesstoken
          if (res.status === 200 && res.data !== null && res.data !== undefined && res.data.user !== null) {
            const { user } = res.data; // res.data.user is of type User
            user.jwt = receivedToken; // add jwt and authenticated to make it an AuthUser
            user.authenticated = true;
            dispatch(login(user));
          } else {
            Alert.alert('Authentication error!');
          }
        }).catch((err:AxiosError) => {
          // We actually expect an AxiosError with response code 303 if the user could not be located in
          // the database. In this case we should redirect to onboarding to sign up this new user.
          if (err.response !== null && err.response !== undefined && err.response?.status === 303) {
            // The name and jwt will be useful during onboarding even though we don't have any more user info
            const onboardingUser:OnboardingUser = { name: userInfo.name, jwt: receivedToken, authenticated: false };
            dispatch(beginOnboarding(onboardingUser));
            onUserNotFound();
          } else {
            // In this case it was actually an unexpected error
            Alert.alert(`Authentication error! ${err.message}`);
          }
        });
      } else {
        Alert.alert('Authentication error!');
      }
    }
  }, [result]);

  return (
    <View>
      <Button
        buttonStyle={{ backgroundColor: '#F37B36', width: 327, height: 52 }}
        title="Continue to sign in"
        onPress={() => promptAsync({ useProxy })}
      />
    </View>
  );
}
export default LoginButton;
