import { Roles } from '../../../types';

export interface OnboardingState {
  name: string;
  email: string;
  phoneNumber: number;
  roles: Roles[];
  businessName: string;
  isAdmin: boolean;
  auth0AccessToken: string,
  jwt: string,
}

export type BeginOnboardingUser = {
  jwt: string,
  auth0AccessToken: string,
  name: string,
  email: string,
}

export type NameOnboardingUser = {
  businessName: string,
  roles: Roles[],
  phoneNumber: number;
}
