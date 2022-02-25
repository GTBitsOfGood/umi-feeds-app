import { DonationForm } from '../../../types';

// **** IMPORTANT ****
// Instead of using the typescript date type to store the dates for attributes like pickupStartTime, etc
// we'll just store a timestamp and we'll be able to use javascript's Date object to convert timestamps
// and such back to Date objects. So when you store data and such, convert them to timestamps to store in state
// https://www.delftstack.com/howto/javascript/javascript-convert-timestamp-to-date/
//
// The reason behind this is it is not good pratice to store non-serilizable data in redux stores, please
// refer to the following link for more details
// https://blog.bam.tech/developer-news/the-redux-best-practice-do-not-put-non-serializable-values-in-state-or-actions-explained

export interface DonationQueue {
  donationQueue: DonationForm[];
  donationSearch: DonationForm[];
}
