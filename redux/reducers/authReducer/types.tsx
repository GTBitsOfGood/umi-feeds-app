import { Roles, Address, Dish, DonationForm } from '../../../types';

interface AuthState {
  _id: string,
  firstName: string;
  lastName: string;
  userName: string;
  businessName: string;
  email: string;
  phoneNumber: number;
  pushTokens: string[];
  isAdmin: boolean;
  auth0AccessToken: string;
  roles: Roles[];
  businessName: string;
  pickupAddresses: Address[];
  dishes: Dish[];
  donations: DonationForm[];
  authenticated: boolean;
  jwt: string;
}

export default AuthState;
