import { Address, Roles } from '../../../types';

interface OnboardingState {
  name: string;
  email: string;
  phoneNumber: number;
  roles: Roles[];
  pickupAddress: Address[];
}

export default OnboardingState;
