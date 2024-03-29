import React from 'react';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios, { AxiosResponse } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Alert } from 'react-native';
import { Address, Donation, DonationForm } from '../../../types';
import { BottomTabParamList } from '../../../navigation/MainNavBar/DonorTabs/types';
import { AddressForm } from '../../../components';
import { TemplateNavParamList } from '../../../templates/NavTypes';
import { updateDonation } from '../../../redux/reducers/donationQueue';
import { setLoading } from '../../../redux/reducers/loadingReducer';
import { RootState } from '../../../redux/rootReducer';
import LoadingScreen from '../../LoadingScreen';

type ParamList = {
  DropoffDetailsEditScreen: {
    donationForm: DonationForm
  },
}

type DonationScreenProp = CompositeNavigationProp<
  StackNavigationProp<TemplateNavParamList, 'DonationQueue'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
  >;

/**
 * Screen to edit the drop off location and instructions for an ongoing donation
 *
 * IMPORTANT NOTES:
 *  If using the version of the Address form without instructions this screen is not setup to update the backend,
 *  however it currently is using the version of the address form with a textbox for instructions, so this won't come up
 *  as an issue unless changed by a developer.
 *
 * KNOWN BUGS:
 *  NA
 *
 * @returns {TSX.Element}
 */
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

        // Update this in the local route state if navigating back to DetailDonationOnQueueScreen
        // But currently there is a bug with the navigation stack since DetailDonationOnQueueScreen has a back
        // button which goes back to this address screen and user is prompted to fill out address again
        // navigation.setParams({
        //   donationForm: res.data.donationform,
        // });
        // navigation.navigate('DetailDonationOnQueue', { donationForm: res.data.donationform });
        // @ts-ignore donationForm is the correct parameter for this route
        navigation.navigate('DonationQueue');
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
      onSubmit={(address) => console.log(address)} // use the other submission handler. This one is specified for donors and onboardings
      hideBack
      formTitle="Destination address"
      formDescription="Fill out the destination address information below, as well as any additional directions."
      includeInstructions
      priorInstructions={donationForm.dropOffInstructions}
      onSubmitWithInstructions={onSubmit}
    />
  );
}
