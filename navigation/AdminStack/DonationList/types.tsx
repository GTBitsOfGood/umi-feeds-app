import { Donation } from '../../../types';

export type DonationsListScreenParamList = {
  DonationsListScreen: undefined;
  DetailDonation: undefined | { donation: Donation };
  EditDonation: undefined | { donation: Donation };
};
