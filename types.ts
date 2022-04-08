export type Roles = 'donor' | 'volunteer' | 'recipient';

export type Address = {
  _id?: string; // the unqiue id assigned to a dish. Let Mongo create this when you insert a document without any _id attribute
  streetAddress: string;
  buildingNumber: number;
  city: string;
  state: string;
  zipCode: number;
  longitude: number;
  latitude: number;
}

export type Dish = {
  _id?: string; // the unqiue id assigned to a dish. Let Mongo create this when you insert a document without any _id attribute
  dishName: string;
  cost: number;
  pounds: number;
  allergens: string[];
  imageLink: string; // link to azure image
  comments: string;
  favorite: boolean;
}

export type DonationDishes = {
  _id?: string; // the unqiue id assigned to a dish. Let Mongo create this when you insert a document without any _id attribute
  name?: string; // ADDED, the name of the dish
  cost?: string; // ADDED, the cost per serving of the dish.
  dishName?: string;
  pounds?: number;
  imageLink?: string;
  comments?: string;
  allergens?: string[];
  favorite?: boolean;
  dishID: string; // points to the _id field of the Dish Schema
  quantity: number;
}

export type DonationForm = {
  _id?: string; // the unqiue id assigned to a dish. Let Mongo create this when you insert a document without any _id attribute
  businessName?: string; // not required for donors but is specified for admins and volunteers
  name?: string; // not required for donors but is specified for admins and volunteers
  phoneNumber?: number; // not required for donors but is specified for admins and volunteers
  ongoing: boolean;
  status: string;
  imageLink: string;
  donationDishes: DonationDishes[];
  pickupAddress: Address;
  pickupInstructions: string;
  dropOffAddress?: Address;
  dropOffInstructions?: string;
  pickupStartTime: number;
  pickupEndTime: number;
  volunteerLockTime?: number; // time when volunteer agrees to pick it up
  lockedByVolunteer: boolean; // whether the donation has been locked by a volunteer
  confirmPickUpTime?: number; // time when donation has been picked up by volunteer
  confirmDropOffTime?: number; // time when donation has been dropped off by volunteer
  volunteerUserID?: string; // userid of the volunteer
}

export type User = {
  _id?: string, // the unqiue id assigned to a user. Let Mongo create this when you insert a document without any _id attribute
  name: string,
  email: string,
  businessName: string,
  phoneNumber: number,
  pushTokens: string[],
  isAdmin: boolean,
  auth0AccessToken: string,
  roles: string[],
  pickupAddresses: Address[],
  dishes: Dish[],
  donations: DonationForm[]
};

// ========================================================================
// ========================================================================
// OLD TYPES DO NOT USE
// ========================================================================
// ========================================================================
/* eslint-disable camelcase */
export type decodedJwtToken = {
  given_name: string,
  family_name: string,
  nickname: string,
  name: string,
  sub: string,
}

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
