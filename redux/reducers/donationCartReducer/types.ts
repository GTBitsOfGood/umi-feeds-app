import { Address, DonationDishes } from '../../../types';

// **** IMPORTANT ****
// Instead of using the typescript date type to store the dates for attributes like pickupStartTime, etc
// we'll just store a timestamp and we'll be able to use javascript's Date object to convert timestamps
// and such back to Date objects. So when you store data and such, convert them to timestamps to store in state
// https://www.delftstack.com/howto/javascript/javascript-convert-timestamp-to-date/
//
// The reason behind this is it is not good pratice to store non-serilizable data in redux stores, please
// refer to the following link for more details
// https://blog.bam.tech/developer-news/the-redux-best-practice-do-not-put-non-serializable-values-in-state-or-actions-explained

export interface DonationCartState {
  ongoing: boolean;
  status: string;
  imageLink: string;
  donationDishes: DonationDishes[]; // just dishes was having a conflict with the user dishes values!!!
  pickupAddress: Address;
  pickupInstructions: string;
  pickupStartTime: number;
  pickupEndTime: number;
  volunteerLockTime: number; // time when volunteer agrees to pick it up
  lockedByVolunteer: boolean; // whether the donation has been locked by a volunteer
  confirmPickUpTime: number; // time when donation has been picked up by volunteer
  confirmDropOffTime: number; // time when donation has been dropped off by volunteer
}

export type PickupTimeInformation = {
  pickupInstructions: string;
  pickupStartTime: number;
  pickupEndTime: number;
}
