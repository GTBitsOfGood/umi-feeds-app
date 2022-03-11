import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import styles from './styles';
import { RootState } from '../../../redux/rootReducer';
import { Address, DonationForm } from '../../../types';
import { AddressSelection } from '../../../components';
import { setLoading } from '../../../redux/reducers/loadingReducer';
import { updateStatus } from '../../../redux/reducers/donationQueue';
import { TemplateNavParamList } from '../../NavTypes';
import LoadingScreen from '../../../screens/LoadingScreen';

type ParamList = {
  AddressScreen: {
    donationForm: DonationForm,
  }
}

type AdminScreenProp = StackNavigationProp<TemplateNavParamList>;

function AdminAcceptAddressScreen() {
  const route = useRoute<RouteProp<ParamList, 'AddressScreen'>>();
  const navigation = useNavigation<AdminScreenProp>();
  const dispatch = useDispatch();

  const loadingState = useSelector((state: RootState) => state.loading.loadingStatus);

  // destructure route.params

  const setAddress = (address: Address) => {
    const { donationForm } = route.params;
    if (donationForm) {
      dispatch(setLoading({ loading: true }));
      const formdata = new FormData();
      formdata.append('json', JSON.stringify({
        dropOffAddress: address,
        status: 'Unclaim'
      }));
      axios.put(`/api/ongoingdonations/${donationForm._id}`, formdata)
        .then((res) => {
          dispatch(updateStatus({ donationForm, status: 'Unclaim', dropoffAddr: address }));
          navigation.navigate('DonationQueue');
        })
        .catch((err) => {
          Alert.alert('Error accepting this donation.', err.message);
        })
        .finally(() => {
          dispatch(setLoading({ loading: false }));
        });
    }
  };

  return (
    loadingState ? (
      <LoadingScreen />
    ) : (
      <ScrollView style={styles.scrollView}>
        <AddressSelection title="Destination Address" subtitle="Select a destination address for this donation below, or add a new address." navigation={navigation} buttonTitle="Accept Donation" handleSubmit={setAddress} backButton={false} />
      </ScrollView>
    )
  );
}

export default AdminAcceptAddressScreen;
