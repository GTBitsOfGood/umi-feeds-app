import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
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

  useEffect(() => {
    if (logoutResult) {
      // Although logout functionality works, it receives an error from Auth0, so we only check for canceling logout rather than successful logout
      if (logoutResult.type !== 'cancel') {
        logout();
      }
    }
  }, [logoutResult]);

  return (
    <Button
      title="Log out"
      onPress={() => {
        promptAsyncLogout({ useProxy });
      }}
    />
  );
}

export default connect(
  null,
  mapDispatchToProps
)(LogoutButton);
