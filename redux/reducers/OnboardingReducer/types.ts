import { Address, Roles } from '../../../types';

interface OnboardingState {
  name: string;
  email: string;
  phoneNumber: number;
  roles: Roles[];
  businessName: string;
  pickupAddress: Address[];
}

export default OnboardingState;
