import { User } from '../../../types';

// It will be useful to store the authenticated state of the user and the jwt token
// for sending authenticated requests to the backend in addition to the other user info
export type AuthUser = User & {
  authenticated: boolean,
  jwt: string
}

// Name, jwt, and authenticated are the only things we know during onboarding, but
// name and jwt can still be useful when sending onboarding requests to the backend
export type OnboardingUser = {
  authenticated: boolean,
  jwt: string,
  name: string
}
