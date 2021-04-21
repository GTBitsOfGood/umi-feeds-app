export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Login: undefined;
  Donate: undefined;
  Map: undefined;
  DonationsList: undefined;
};

export type DonationScreenParamList = {
  DonationScreen: undefined;
};

export type MapScreenParamList = {
  MapScreen: undefined;
  DonationDetails: undefined;
};

export type LoginScreenParamList = {
  LoginScreen: undefined;
  NewDonorName: undefined;
  NewDonorNumber: undefined;
  NewDonorLocation: undefined;
};

/* eslint-disable camelcase */
export type decodedJwtToken = {
  given_name: string,
  family_name: string,
  nickname: string,
  name: string,
  sub: string,
}
/* eslint-enable camelcase */

export type DonationsListScreenParamList = {
  DonationsListScreen: undefined;
  DetailDonation: undefined;
  EditDonation: undefined;
};

export type User = {
  _id: string,
  name: string,
  email: string,
  pushTokens: string,
  recipient: boolean,
  admin: boolean,
  createdAt: string,
  updatedAt: string,
  __v: number,
  sub: string
};

export type Donation = {
  foodImages: Array<string>,
  _id: string,
  donor: {
    _id: string,
    donorInfo: {
      name: string,
      phone: string,
      address: string,
      longitude: number,
      latitude: number
    }
  },
  volunteer?: {
    _id: string,
    name: string,
    volunteerInfo: {
      phone: string
    },
  },
  availability: {
    _id: string,
    startTime: string,
    endTime: string
  },
  pickup?: {
    pickupTime: string,
    dropoffTime: string
  }
  description: string,
  pickupInstructions?: string,
  weight?: number,
  createdAt: string,
  updatedAt: string,
  __v: number
};
