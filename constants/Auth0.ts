// Note that the client ID can be publicly exposed
const auth0ClientId = 'NvwWn7ZBWw6redyn0lZqvJEj0f9U0Qw7';
const authorizationEndpoint = 'https://bog-dev.us.auth0.com/authorize';
const logoutEndpoint = 'https://bog-dev.us.auth0.com/v2/logout';

/* eslint-disable camelcase */
type jwtToken = {
    given_name: string,
    family_name: string,
    nickname: string,
    name: string,
}
/* eslint-enable camelcase */

export {
  auth0ClientId,
  authorizationEndpoint,
  logoutEndpoint,
  jwtToken,
};
