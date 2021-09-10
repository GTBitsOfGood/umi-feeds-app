import { Roles, Address, Dish, DonationForm } from '../../../types';

interface AuthState {
  _id: string,
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: number;
  pushTokens: string[];
  isAdmin: boolean;
  auth0AccessToken: string;
  roles: Roles[];
  pickupAddresses: Address[];
  dishes: Dish[];
  donations: DonationForm[];
  authenticated: boolean;
  jwt: string;
}

export default AuthState;
