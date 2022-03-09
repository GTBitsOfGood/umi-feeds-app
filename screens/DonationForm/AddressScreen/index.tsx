import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import styles from './styles';
import { RootState } from '../../../redux/rootReducer';
import { Address } from '../../../types';
import { Header, ChevronButton, PrimaryButton, SecondaryButton, AddressSelection } from '../../../components';
import { DonateTabParamList } from '../../../navigation/DonorStack/Donate/types';
import { setPickupAddresses } from '../../../redux/reducers/authReducer';
import { setAddress } from '../../../redux/reducers/donationCartReducer';
import { ThemeColor } from '../../../constants/Colors';

type DonationScreenProp = StackNavigationProp<DonateTabParamList, 'DonateHomeScreen'>;

const DonateFormAddressScreen = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<DonationScreenProp>();
  const dispatch = useDispatch();

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(authState.pickupAddresses.length === 1 ? authState.pickupAddresses[0] : null);

  const handleSubmit = () => {
    if (selectedAddress) {
      dispatch(setAddress(selectedAddress));
    }
    navigation.navigate('SchedulePickupScreen');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <AddressSelection title="Your Address" subtitle="Select the address you would like the donation to be picked up at." navigation={navigation} buttonTitle="Schedule pickup time" handleSubmit={handleSubmit} />
      </ScrollView>
    </View>
  );
};

export default DonateFormAddressScreen;
