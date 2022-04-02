import { DonationForm } from '../../../types';

export type DonationQueueParamList = {
  DonationQueue: undefined,
  DetailDonationOnQueue: DonationForm, // this will need to change so that it doesn't take in undefined params
  DropoffDetailsEditScreen: DonationForm,
  AddressScreen: DonationForm,
  EditAddressScreen: undefined,
  Root: undefined,
};
