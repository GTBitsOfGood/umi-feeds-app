import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import styles from './styles';
import { RootState } from '../../../redux/rootReducer';
import { Address, DonationForm } from '../../../types';
import { Header, ChevronButton, PrimaryButton, SecondaryButton, AddressSelection } from '../../../components';
import { setLoading } from '../../../redux/reducers/loadingReducer';
import donationQueue, { updateStatus } from '../../../redux/reducers/donationQueue';
import { ThemeColor } from '../../../constants/Colors';
import { TemplateNavParamList } from '../../NavTypes';
import LoadingScreen from '../../../screens/LoadingScreen';

type ParamList = {
  AddressDropoffScreen: {
    donationForm: DonationForm,
    navigation: any,
  }
}

type AdminScreenProp = StackNavigationProp<TemplateNavParamList>;

function AdminAcceptAddressScreen() {
  const route = useRoute<RouteProp<ParamList, 'AddressDropoffScreen'>>();
  const state = useSelector((state: RootState) => state);
  const navigation = useNavigation<AdminScreenProp>();
  const dispatch = useDispatch();

  const loadingState = useSelector((state: RootState) => state.loading.loadingStatus);

  // destructure route.params
  const { donationForm } = route.params;

  const setAddress = (address: Address) => {
    if (donationForm) {
      dispatch(setLoading({ loading: true }));
      const formdata = new FormData();
      formdata.append('json', JSON.stringify({
        dropOffAddress: address,
        status: 'Unclaim'
      }));
      axios.put('/api/ongoingdonations/62185e29d8b2650022fadd1a', formdata)
        .then((res) => {
          dispatch(updateStatus({ donationForm, status: 'Unclaim' }));
          const donation = state.donationQueueReducer.donationQueue.find((donation) => donation._id === donationForm._id);
          if (donation) {
            console.log(donation);
            navigation.navigate('DetailDonationOnQueue', donation);
          }
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
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <AddressSelection title="Destination Address" subtitle="Select a destination address for this donation below, or add a new address." navigation={navigation} buttonTitle="Accept Donation" handleSubmit={setAddress} backButton={false} />
        </ScrollView>
      </View>
    )
  );
}

export default AdminAcceptAddressScreen;
