import React, { useState } from 'react';
import Constants from 'expo-constants';
import { HeaderBackButton } from '@react-navigation/stack';
import { TouchableWithoutFeedback, StyleSheet, View, Text, TextInput, Keyboard } from 'react-native';

import { Button } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { Address } from '../../types';

import { moderateScale } from '../../util';

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
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
      <View style={{
        flex: 1,
        padding: moderateScale(20),
        flexDirection: 'column',
        backgroundColor: '#FFFFFF'
      }}
      >
        <View style={{ flex: 1 }} />
        <HeaderBackButton tintColor="#F37B36" style={styles.backButton} onPress={() => goBack()} />
        <View style={{ flex: 25 }}>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <View style={{ flex: 0.5 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Enter address</Text>
            </View>
            <View style={{ flex: 1.5 }}>
              <Text style={styles.description}>
                Fill out the address information below. We’ll share this with your assigned driver for pickup.
              </Text>
            </View>
            <View style={{ flex: 10 }}>
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
                textContentType="countryName"
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
        </View>
        <View style={{ flex: 4 }}>
          <Button
            buttonStyle={{ backgroundColor: '#F37B36', height: '70%', padding: 10, marginTop: moderateScale(25) }}
            title={ButtonTitle}
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
            }
            }
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddressForm;

const styles = StyleSheet.create({
  backButton: {
    flex: 2,
  },
  google: {
    height: moderateScale(55),
    width: 330,
    zIndex: 10
  },
  googleInput: {
    height: moderateScale(50),
    marginBottom: moderateScale(8),
    borderWidth: 0.5,
    color: 'black',
    borderColor: 'black',
    borderRadius: 4,
    width: 330,
  },
  input: {
    zIndex: 0,
    height: moderateScale(55),
    marginTop: moderateScale(8),
    marginBottom: moderateScale(8),
    borderWidth: 0.5,
    color: 'black',
    borderColor: 'black',
    borderRadius: 4,
    width: 330,
    padding: 10,
  },
  title: {
    color: '#202020',
    fontSize: 32,
    lineHeight: 37,
    fontWeight: 'bold',
  },
  description: {
    marginTop: moderateScale(5),
    marginBottom: moderateScale(5)
  },
});
