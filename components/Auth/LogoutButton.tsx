import * as AuthSession from 'expo-auth-session';
import React, { useEffect } from 'react';
import { Button, Platform } from 'react-native';

import { useDispatch, batch } from 'react-redux';

import * as Auth0 from '../../constants/Auth0';

import { logout } from '../../redux/reducers/authReducer';
import { resetCart } from '../../redux/reducers/donationCartReducer';

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

function LogoutButton() {
  const dispatch = useDispatch();

  const [, logoutResult, promptAsyncLogout] = AuthSession.useAuthRequest({
    redirectUri,
    clientId: Auth0.auth0ClientId,
  },
  { authorizationEndpoint: Auth0.logoutEndpoint });

  useEffect(() => {
    if (logoutResult) {
      // Although logout functionality works, it receives an error from Auth0,
      // so we only check for canceling logout rather than successful logout
      if (logoutResult.type !== 'cancel') {
        batch(() => {
          dispatch(logout());
          dispatch(resetCart());
        });
      }
    }
  }, [logoutResult]);

  return (
    <Button
      title="Log Out"
      onPress={() => {
        promptAsyncLogout({ useProxy });
      }}
    />
  );
}

export default LogoutButton;
