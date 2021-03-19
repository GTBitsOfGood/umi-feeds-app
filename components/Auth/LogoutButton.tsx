import * as AuthSession from 'expo-auth-session';
import React, { useEffect } from 'react';
import { Button, Platform } from 'react-native';

import { connect } from 'react-redux';

import * as Auth0 from '../../constants/Auth0';

import { logout } from './authReducer';

const mapDispatchToProps = { logout };

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

function LogoutButton(props: {
  logout: () => void,
}) {
  const { logout } = props;

  const [logoutRequest, logoutResult, promptAsyncLogout] = AuthSession.useAuthRequest({
    redirectUri,
    clientId: Auth0.auth0ClientId,
  },
  { authorizationEndpoint: Auth0.logoutEndpoint });

  /* Can be used to do something on logout
  useEffect(() => {
    console.warn('LOGOUT RESULT');
    console.warn(logout);
    console.warn(logoutResult);
  }, [logoutResult]);
  */

  return (
    <Button
      title="Log out"
      onPress={() => {
        logout();
        promptAsyncLogout({ useProxy });
      }}
    />
  );
}

export default connect(
  null,
  mapDispatchToProps
)(LogoutButton);
