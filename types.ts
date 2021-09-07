export type DonationsListScreenParamList = {
  DonationsListScreen: undefined;
  DetailDonation: undefined | { donation: Donation };
  EditDonation: undefined | { donation: Donation };
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
