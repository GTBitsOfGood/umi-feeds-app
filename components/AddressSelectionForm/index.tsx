import React, { useState } from 'react';
import { Alert, View, Text, Pressable, KeyboardAvoidingView, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import styles from './styles';
import { RootState } from '../../redux/rootReducer';
import { Address, DonationForm } from '../../types';
import { setPickupAddresses } from '../../redux/reducers/authReducer';
import { ThemeColor } from '../../constants/Colors';

// Components
import ChevronButton from '../ChevronButton';
import Header from '../Header';
import PrimaryButton from '../Button/PrimaryButton';
import SecondaryButton from '../Button/SecondaryButton';

type AddressSelectionParams = {
    title: string,
    subtitle: string,
    navigation: any,
    buttonTitle: string,
    handleSubmit: (address: Address) => void,
    backButton ?: boolean
    donationForm ?: DonationForm

}

const AddressFormScreen = ({
  title,
  subtitle,
  navigation,
  buttonTitle,
  handleSubmit,
  backButton,
  donationForm

}: AddressSelectionParams) => {
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(authState.pickupAddresses.length === 1 ? authState.pickupAddresses[0] : null);
  const dummyAddress: Address = {
    streetAddress: 'North Ave NW',
    buildingNumber: 0,
    city: 'Atlanta',
    state: 'GA',
    zipCode: 30332,
    longitude: 10,
    latitude: 100,
  };
  const pickupAddresses = [dummyAddress, ...authState.pickupAddresses];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          {(backButton !== false) && <ChevronButton onPress={navigation.goBack} text="Donation Cart" />}
          <Header title={title} showCartButton={false} />
          <Text style={{ marginBottom: 20, marginTop: -10 }}>{subtitle}</Text>
          <SecondaryButton onPress={() => navigation.navigate('EditAddressScreen')}>
            <>
              <Icon name="plus" size={15} />
              Add address
            </>
          </SecondaryButton>
          {/* <Text>{JSON.stringify(authState.pickupAddresses, null, 2)}</Text> */}
          {pickupAddresses.map((address: Address) => (
            <AddressCard
              selected={selectedAddress?._id === address._id}
              key={address.longitude}
              address={address}
              businessName="Test Business Name"
              onPress={() => setSelectedAddress(address)}
              onEdit={() => {
                navigation.navigate('EditAddressScreen' as any, { address });
              }}
              onDelete={() => {
                const url = `/api/user/pickupAddress/${authState._id}?addressId=${address._id}`;
                Alert.alert('Are you sure you want to delete this pickup address?', '', [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                      axios.delete(url).then(() => {
                        dispatch(setPickupAddresses(authState.pickupAddresses.filter((a: Address) => a._id !== address._id)));
                      }).catch((e) => {
                        Alert.alert('Error deleting pickup address.', e.message);
                      });
                    }
                  }
                ]);
              }}
            />
          ))}
          <PrimaryButton
            onPress={() => {
              if (selectedAddress) {
                handleSubmit(selectedAddress);
              }
            }}
            disabled={!selectedAddress}
          >
            {buttonTitle}
          </PrimaryButton>
        </View>
      </ScrollView>
    </View>
  );
};

function AddressCard(props: { address: Address, businessName: string, onPress: () => void, onEdit: () => void, onDelete: () => void, selected?: boolean }) {
  const fullAddress = `${props.address.streetAddress} \n${props.address.city}, ${props.address.state} ${props.address.zipCode}`;

  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="transparent">
      <View style={[styles.addressCard, (props.selected ? { borderColor: ThemeColor, borderWidth: 2, backgroundColor: 'rgba(243, 123, 54, 0.15)' } : {})]}>
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

export default AddressFormScreen;
