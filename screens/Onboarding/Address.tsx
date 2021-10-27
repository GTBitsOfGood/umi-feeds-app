import React from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { LoginStackParamList } from '../../navigation/LoginStack/types';
import { AddressForm } from '../../components';

import useNotifications from '../../hooks/useNotifications';
import { RootState } from '../../redux/rootReducer';
import { Address } from '../../types';
import { login } from '../../redux/reducers/authReducer';
import { reset } from '../../redux/reducers/OnboardingReducer';

type OnboardingAddressFormProp = StackNavigationProp<LoginStackParamList, 'OnboardingAddressForm'>

export default function AddressOnboardingForm() {
  const dispatch = useDispatch();
  const onboardingState = useSelector((state: RootState) => state.onboarding);
  const navigation = useNavigation<OnboardingAddressFormProp>();

  const [expoPushToken] = useNotifications();

  const goBack = () => navigation.goBack();

  const onSubmit = (addressObj: Address | null) => {
    axios.post('/signup', {
      name: onboardingState.name,
      businessName: onboardingState.businessName,
      email: onboardingState.email,
      phoneNumber: onboardingState.phoneNumber,
      pushTokens: [expoPushToken],
      isAdmin: false,
      auth0AccessToken: onboardingState.auth0AccessToken,
      roles: onboardingState.roles,
      pickupAddresses: addressObj ? [addressObj] : [],
      dish: [],
      donations: [],
      sub: onboardingState.auth0AccessToken,
    }).then((res) => {
      const user = res.data;
      user.jwt = onboardingState.jwt;
      user.authenticated = true;
      dispatch(reset());
      dispatch(login(user));
    }).catch((err: AxiosError) => {
      Alert.alert('Authentication error! Please try again at another time');
    });
  };

  return (
    <AddressForm goBack={goBack} onSubmit={onSubmit} ButtonTitle="Save Profile or Skip" />
  );
}
