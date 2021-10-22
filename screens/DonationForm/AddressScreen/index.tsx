import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import styles from './styles';
import { RootState } from '../../../redux/rootReducer';
import { Address } from '../../../types';
import { Header, ChevronButton } from '../../../components';
import { DonateTabParamList } from '../../../navigation/DonorStack/Donate/types';
import { PrimaryButton, SecondaryButton } from '../../../components/Button';

const orangeColor = '#F37B36';

type DonationScreenProp = StackNavigationProp<DonateTabParamList, 'DonateHomeScreen'>;

const DonateFormAddressScreen = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<DonationScreenProp>();

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(authState.pickupAddresses.length === 1 ? authState.pickupAddresses[0] : null);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <ChevronButton onPress={navigation.goBack} text="Donation Cart" />
          <Header title="Your address" showCartButton={false} />
          <Text style={{ marginBottom: 20, marginTop: -10 }}>Select the address you would like the donation to be picked up at.</Text>
          <SecondaryButton onPress={() => navigation.navigate('EditAddressScreen')}>
            <>
              <Icon name="plus" size={15} />
              Add address
            </>
          </SecondaryButton>
          {/* <Text>{JSON.stringify(authState.pickupAddresses, null, 2)}</Text> */}
          {authState.pickupAddresses.map((address: Address) => (
            <AddressCard
              selected={selectedAddress?._id === address._id}
              key={address._id}
              address={address}
              businessName={authState.businessName}
              onPress={() => setSelectedAddress(address)}
              onEdit={() => alert('test edit!')}
              onDelete={() => alert('test delete!')}
            />
          ))}
          <PrimaryButton
            onPress={() => alert('test!')}
            disabled={!selectedAddress}
          >
            Schedule pickup time
          </PrimaryButton>
        </View>
      </ScrollView>
    </View>
  );
};

function AddressCard(props: { address: Address, businessName: string, onPress: () => void, onEdit: () => void, onDelete: () => void, selected?: boolean }) {
  const fullAddress = `${props.address.buildingNumber} ${props.address.streetAddress} \n${props.address.city}, ${props.address.state} ${props.address.zipCode}`;

  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="transparent">
      <View style={[styles.addressCard, (props.selected ? { borderColor: orangeColor, borderWidth: 2, backgroundColor: 'rgba(243, 123, 54, 0.15)' } : {})]}>
        <View style={{ flex: 2 }}>
          <Text style={{ fontWeight: '700', fontSize: 15 }}>{props.businessName}</Text>
          <Text style={{ marginTop: 5, fontSize: 12 }}>{fullAddress}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: 15 }}>
            <TouchableHighlight onPress={props.onEdit} underlayColor="transparent">
              <>
                <MaterialIcon name="edit" size={25} style={{ color: '#5D5D5D', alignSelf: 'center' }} />
                <Text style={{ fontSize: 12, color: '#5D5D5D' }}>Edit</Text>
              </>
            </TouchableHighlight>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <TouchableHighlight onPress={props.onDelete} underlayColor="transparent">
              <>
                <MaterialIcon name="delete" size={25} style={{ color: '#5D5D5D', alignSelf: 'center' }} />
                <Text style={{ fontSize: 12, color: '#5D5D5D' }}>Delete</Text>
              </>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default DonateFormAddressScreen;
