export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  MapScreen: undefined;
  DonationsListScreen: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type MapScreenParamList = {
  MapScreen: undefined;
};

export type DonationsListScreenParamList = {
  DonationsListScreen: undefined;
};

export type Donor = {
  _id: string,
  name: string,
  latitude: number,
  longitude: number
};

export type Donation = {
  descriptionImages: Array<string>,
  foodImages: Array<string>,
  _id: string,
  donor: Donor,
  availability: {
    _id: string,
    startTime: string,
    endTime: string
  },
  description: string,
  createdAt: string,
  updatedAt: string,
  __v: number
};
