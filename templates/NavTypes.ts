import { DonationForm } from "../types";

export type TemplateNavParamList = {
  DonationQueue: undefined,
  DetailDonationOnQueue: DonationForm, // this will need to change so that it doesn't take in undefined params
};
