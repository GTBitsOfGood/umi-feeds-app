import * as AuthSession from 'expo-auth-session';
import React, { useEffect } from 'react';
import { Alert, Platform, View } from 'react-native';
import { Button } from 'react-native-elements';

import { useDispatch, batch } from 'react-redux';

import jwtDecode from 'jwt-decode';
import axios, { AxiosError } from 'axios';
import * as Auth0 from '../../constants/Auth0';

import { login } from '../../redux/reducers/authReducer';
import { beginOnboarding } from '../../redux/reducers/OnboardingReducer';
import { loadDonations } from '../../redux/reducers/donationQueue';
import { decodedJwtToken } from '../../types';
import { BeginOnboardingUser } from '../../redux/reducers/OnboardingReducer/types';
import { setLoading } from '../../redux/reducers/loadingReducer/index';

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

function LoginButton(props: { onUserNotFound: () => void }) {
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

        // here for testing pruposes. Change to the following if want authentication.
        // But better to use expo-secure to store jwt token rather than redux state
        // https://docs.expo.dev/versions/latest/sdk/securestore/
        // console.log(userInfo.sub);
        // axios.post(`/login/${userInfo.sub}`, {}, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //     Authorization: `Bearer ${receivedToken}`
        //   }
        // })

        dispatch(setLoading({ loading: true }));

        // Now that we have the user access token we can request the user information from the backend
        const loginUser = axios.post(`/login/${userInfo.sub}`, {});
        const getDonationQueue = axios.get('/api/ongoingdonations');

        Promise.all([loginUser, getDonationQueue]).then((values) => {
          const loginResponse = values[0];
          const donationQueueResponse = values[1];

          if (loginResponse.status === 200 && loginResponse.data !== null && loginResponse.data !== undefined && loginResponse.data.user !== null) {
            const { user } = loginResponse.data; // res.data.user is of type User
            user.jwt = receivedToken; // add jwt and authenticated to make it an AuthUser
            user.authenticated = true;
            if (user.isAdmin || user.roles.includes('volunteer')) {
              return batch(() => {
                dispatch(login(user));
                dispatch(loadDonations(donationQueueResponse.data['Ongoing Donations']));
              });
            } else {
              return dispatch(login(user));
            }
          } else {
            return Alert.alert('Authentication error!');
          }
        }).catch((err: AxiosError) => {
          // We actually expect an AxiosError with response code 303 if the user could not be located in
          // the database. In this case we should redirect to onboarding to sign up this new user.
          if (err.response !== null && err.response !== undefined && err.response?.status === 303) {
            // The name and jwt will be useful during onboarding even though we don't have any more user info
            const onboardingUser: BeginOnboardingUser = {
              name: `${userInfo.given_name} ${userInfo.family_name}`,
              auth0AccessToken: userInfo.sub,
              email: userInfo.nickname, // nickname field is email.  Had to make this change because otherwise users with same name could not both have accounts
              jwt: receivedToken,
            };

            dispatch(beginOnboarding(onboardingUser));
            return onUserNotFound();
          } else {
            // In this case it was actually an unexpected error
            return Alert.alert('Authentication error! Please Try Again Later');
          }
        })
          .finally(() => {
            dispatch(setLoading({ loading: false }));
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
