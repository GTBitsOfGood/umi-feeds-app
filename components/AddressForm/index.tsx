import React, { useState } from 'react';
import Constants from 'expo-constants';
import { HeaderBackButton } from '@react-navigation/stack';
import { SectionList, StyleSheet, View, Text, TextInput, Keyboard, ScrollView } from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { Address } from '../../types';
import Header from '../Header';
import { moderateScale, HideKeyboardUtility } from '../../util';
import { PrimaryButton } from '../Button';

type AddressFormProps = {
  ButtonTitle: string,
  UserAddress?: Address,
  goBack: () => void,
  onSubmit: (addressObj: Address | null) => void,
}

const AddressForm = ({ ButtonTitle, UserAddress, goBack, onSubmit }: AddressFormProps) => {
  const [address, setAddress] = useState<string>(UserAddress ? UserAddress.streetAddress : '');
  const [city, setCity] = useState<string>(UserAddress ? UserAddress?.city : '');
  const [zipCode, onZipCodeChange] = useState<string>(UserAddress ? UserAddress.zipCode.toString : '');
  const [latitude, onLatitudeChange] = useState<number>(0);
  const [longitude, onLongitudeChange] = useState<number>(0);

  const handleAutofillAddress = (data, detail) => {
    setAddress(`${data.terms[0].value} ${data.terms[1].value}`);
    setCity(data.terms[2].value);
    onZipCodeChange(detail.address_components[7].long_name);
    onLongitudeChange(detail.geometry.location.lat);
    onLatitudeChange(detail.geometry.location.lng);
  };

  return (
    <HideKeyboardUtility>
      <ScrollView
        style={{
          padding: moderateScale(20),
          backgroundColor: '#FFFFFF'
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{}} />
        <HeaderBackButton tintColor="#F37B36" style={styles.backButton} onPress={() => goBack()} />
        <View style={{}}>
          <View style={{}}>
            <View style={{}} />
            <View style={{}}>
              <Header title="Enter address" showCartButton={false} />
              {/* <Text style={styles.title}>Enter address</Text> */}
            </View>
            <View style={{}}>
              <Text style={styles.description}>
                Fill out the address information below. We’ll share this with your assigned driver for pickup.
              </Text>
            </View>
            <View style={{}}>
              <View style={styles.google}>
                <GooglePlacesAutocomplete
                  styles={{ textInput: styles.googleInput, listView: { position: 'absolute', zIndex: 100, borderColor: 'black', borderWidth: 1, top: moderateScale(50), elevation: 3 } }}
                  placeholder="Street Address"
                  fetchDetails
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    handleAutofillAddress(data, details);
                  }}
                  query={{
                    key: Constants.manifest.extra.GOOGLE_MAPS_API_KEY,
                    language: 'en',
                    components: 'country:us',
                  }}
                />
              </View>
              <TextInput
                style={styles.input}
                onChangeText={setCity}
                value={city}
                placeholder="City"
                textContentType="addressCity"
              />
              <TextInput
                style={styles.input}
                placeholder="Country/Region"
                value="United States"
                editable={false}
              />
              <TextInput
                style={styles.input}
                placeholder="State"
                value="GA"
                editable={false}
                textContentType="addressState"
              />
              <TextInput
                style={styles.input}
                onChangeText={onZipCodeChange}
                placeholder="Zip Code"
                value={zipCode}
                textContentType="postalCode"
                editable={false}
              />
            </View>
          </View>
          <PrimaryButton
            onPress={() => {
              if (address.trim().length === 0) {
                onSubmit(null);
              } else {
                onSubmit({
                  streetAddress: address,
                  buildingNumber: 0,
                  city: 'Atlanta',
                  state: 'GA',
                  zipCode: parseInt(zipCode, 10),
                  longitude,
                  latitude,
                });
              }
            }}
          >
            {ButtonTitle}
          </PrimaryButton>
        </View>
      </ScrollView>
    </HideKeyboardUtility>
  );
};

export default AddressForm;

const styles = StyleSheet.create({
  backButton: {
    // flex: 2,
  },
  google: {
    height: moderateScale(55),
    width: 330,
    zIndex: 10
  },
  googleInput: {
    height: moderateScale(50),
    marginBottom: moderateScale(8),
    borderWidth: 1,
    color: 'black',
    borderColor: '#b8b8b8',
    borderRadius: 4,
    width: 330,
  },
  input: {
    zIndex: 0,
    height: moderateScale(55),
    marginTop: moderateScale(8),
    marginBottom: moderateScale(8),
    borderWidth: 1,
    color: 'black',
    borderColor: '#b8b8b8',
    borderRadius: 4,
    width: 330,
    padding: 10,
  },
  title: {
    color: '#202020',
    fontSize: 32,
    lineHeight: 37,
    fontWeight: '600',
  },
  description: {
    marginTop: moderateScale(5),
    marginBottom: moderateScale(5)
  },
});
