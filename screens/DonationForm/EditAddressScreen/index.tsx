import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { AddressForm } from '../../../components';
import { DonateTabParamList } from '../../../navigation/DonorStack/Donate/types';
import { Address } from '../../../types';
import { RootState } from '../../../redux/rootReducer';
import { setPickupAddresses } from '../../../redux/reducers/authReducer';

type DonationScreenProp = StackNavigationProp<DonateTabParamList, 'DonateHomeScreen'>;

export default function EditAddresScreen() {
  const authState = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<DonationScreenProp>();
  const dispatch = useDispatch();

  const onSuccess = (response: AxiosResponse) => {
    const newPickupAddresses = response.data as Address[];
    console.log(response);
    // set authState pickup addresses to response
    dispatch(setPickupAddresses(newPickupAddresses));
    navigation.goBack();
  };

  const onError = (response: any) => {
    console.log(response);
    alert('Error! This address could not be saved. Please try again later');
  };

  return (
    <AddressForm
      goBack={navigation.goBack}
      onSubmit={(address) => {
        if (address) {
          if (address._id) {
            axios.put(`/pickupAddress/${address._id}`, {
              ...address,
              _id: address._id
            }).then(onSuccess).catch(onError);
          } else {
            axios.post(`/pickupAddress/${authState._id}`, address).then(onSuccess).catch(onError);
          }
        }
      }}
      ButtonTitle="Save address"
    />
  );
}