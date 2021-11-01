import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios, { AxiosResponse } from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { AddressForm } from '../../../components';
import { DonateTabParamList } from '../../../navigation/DonorStack/Donate/types';
import { Address } from '../../../types';
import { RootState } from '../../../redux/rootReducer';
import { setPickupAddresses } from '../../../redux/reducers/authReducer';

type DonationScreenProp = StackNavigationProp<DonateTabParamList, 'DonateHomeScreen'>;

export default function EditAddresScreen({ route }: { route: { params: { address: Address | undefined } } }) {
  const authState = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<DonationScreenProp>();
  const dispatch = useDispatch();

  const oldAddress = route?.params?.address ?? null;

  const onSuccess = (response: AxiosResponse) => {
    const newPickupAddresses = response.data.pickupAddresses as Address[];
    // set authState pickup addresses to response
    dispatch(setPickupAddresses(newPickupAddresses));
    navigation.goBack();
  };

  const onError = () => {
    alert('This address could not be saved. Please try again later');
  };

  return (
    <AddressForm
      goBack={navigation.goBack}
      onSubmit={(address) => {
        if (address) {
          if (oldAddress) {
            axios.put(`api/user/pickupAddress/${authState._id}`, {
              _id: oldAddress._id, // preserve id
              ...address
            }).then(onSuccess).catch(onError);
          } else {
            axios.post(`/api/user/pickupAddress/${authState._id}`, address).then(onSuccess).catch(onError);
          }
        }
      }}
      ButtonTitle="Save address"
    />
  );
}
