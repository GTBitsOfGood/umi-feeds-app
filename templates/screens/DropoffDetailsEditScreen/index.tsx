import React from 'react';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios, { AxiosResponse } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Alert } from 'react-native';
import { Address, Donation, DonationForm } from '../../../types';
import { BottomTabParamList } from '../../../navigation/MainNavBar/types';
import { AddressForm } from '../../../components';
import { TemplateNavParamList } from '../../NavTypes';
import { updateDonation } from '../../../redux/reducers/donationQueue';
import { setLoading } from '../../../redux/reducers/loadingReducer';
import { RootState } from '../../../redux/rootReducer';
import LoadingScreen from '../../../screens/LoadingScreen';

type ParamList = {
  DropoffDetailsEditScreen: {
    donationForm: DonationForm
  },
}

// type DonationScreenProp = CompositeNavigationProp<
//   StackNavigationProp<DonateTabParamList, 'DonateHomeScreen'>,
//   BottomTabNavigationProp<BottomTabParamList, 'Home'>
//   >;

type DonationScreenProp = CompositeNavigationProp<
  StackNavigationProp<TemplateNavParamList, 'DonationQueue'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
  >;

export default function DropoffDetailsEditScreen() {
  const route = useRoute<RouteProp<ParamList, 'DropoffDetailsEditScreen'>>();
  const { donationForm } = route.params;

  const navigation = useNavigation<DonationScreenProp>();
  const dispatch = useDispatch();

  const loadingState = useSelector((state: RootState) => state.loading.loadingStatus);

  const onSubmit = (address:Address | null, instructions: string | null) => {
    let addr = address;
    let instr = instructions;
    if (!address) {
      addr = { streetAddress: '', buildingNumber: 0, city: '', state: '', zipCode: 0, longitude: 0, latitude: 0 };
    }
    if (!instr) {
      instr = '';
    }
    dispatch(setLoading({ loading: true }));
    const formdata = new FormData();
    // Update the donation address and instructions
    formdata.append('json', JSON.stringify({
      dropOffAddress: addr,
      dropOffInstructions: instr,
    }));
    // Update this in the backend
    axios.put(`/api/ongoingdonations/${donationForm._id}`, formdata)
      .then((res) => {
        // Update this in the frontend central state
        dispatch(updateDonation(res.data.donationform));
        // Update this in the local route state
        navigation.setParams({
          donationForm: res.data.donationform,
        });
        // @ts-ignore donationForm is the correct parameter for this route
        navigation.navigate('DetailDonationOnQueue', { donationForm: res.data.donationform });
      })
      .catch((error) => {
        Alert.alert('There was a problem updating the donation.  Please try again');
        console.error(error);
      }).finally(() => {
        dispatch(setLoading({ loading: false }));
      });
  };

  return loadingState ? (
    <LoadingScreen />
  ) : (
    <AddressForm
      UserAddress={donationForm.dropOffAddress}
      ButtonTitle="Update Donation"
      goBack={navigation.goBack}
      onSubmit={(address) => console.log(address)}
      hideBack
      formTitle="Destination address"
      formDescription="Fill out the destination address information below, as well as any additional directions."
      includeInstructions
      priorInstructions={donationForm.dropOffInstructions}
      onSubmitWithInstructions={onSubmit}
    />
  );
}
