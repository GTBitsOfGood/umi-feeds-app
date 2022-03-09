import React, { useState } from 'react';
import Constants from 'expo-constants';
import { HeaderBackButton } from '@react-navigation/stack';
import { SectionList, StyleSheet, View, Text, TextInput, Keyboard, ScrollView, KeyboardAvoidingView } from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { Address } from '../../types';
import Header from '../Header';
import { moderateScale, HideKeyboardUtility } from '../../util';
import PrimaryButton from '../Button/PrimaryButton';

type AddressFormProps = {
  ButtonTitle: string,
  UserAddress?: Address,
  backButton?: boolean,
  goBack: () => void,
  onSubmit: (addressObj: Address | null) => void,
  onSubmitWithInstructions?: (addressObj: Address | null, instructions: string | null) => void
  hideBack?: boolean,
  formTitle?: string,
  formDescription?: string,
  includeInstructions?: boolean,
  priorInstructions?: string,
}

const AddressForm = (
  { ButtonTitle, UserAddress, goBack, onSubmit, onSubmitWithInstructions,
    hideBack, formTitle, formDescription,
    includeInstructions, priorInstructions
  }: AddressFormProps
) => {
  const [address, setAddress] = useState<string>(UserAddress ? UserAddress.streetAddress : '');
  const [city, setCity] = useState<string>(UserAddress ? UserAddress?.city : '');
  const [zipCode, onZipCodeChange] = useState<string>(UserAddress ? UserAddress.zipCode.toString() : '');
  const [latitude, onLatitudeChange] = useState<number>(0);
  const [longitude, onLongitudeChange] = useState<number>(0);
  const [instructions, setInstructions] = useState<string>(priorInstructions ?? '');

  const title = formTitle ?? 'Enter address';
  const description = formDescription ?? 'Fill out the address information below. We’ll share this with your assigned driver for pickup.';

  const handleAutofillAddress = (data, detail) => {
    setAddress(`${data.terms[0].value} ${data.terms[1].value}`);
    setCity(data.terms[2].value);
    onZipCodeChange(detail.address_components[7].long_name);
    onLongitudeChange(detail.geometry.location.lat);
    onLatitudeChange(detail.geometry.location.lng);
  };

  return (
    <HideKeyboardUtility>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          style={{
            padding: moderateScale(20),
            backgroundColor: '#FFFFFF'
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{}} />
          {!hideBack && <HeaderBackButton tintColor="#F37B36" style={styles.backButton} onPress={() => goBack()} />}
          <View style={{}}>
            <View style={{}}>
              <View style={{}} />
              <View style={{}}>
                <Header title={title} showCartButton={false} />
                {/* <Text style={styles.title}>Enter address</Text> */}
              </View>
              <View style={{}}>
                <Text style={styles.description}>
                  {description}
                </Text>
              </View>
              <View style={{}}>
                <TextInput
                  style={styles.input}
                  onChangeText={setAddress}
                  value={address}
                  placeholder="Full Street Address"
                  textContentType="fullStreetAddress"
                />
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
                  editable
                />
                {includeInstructions
                && (
                <TextInput
                  style={[styles.input, { height: moderateScale(110) }]}
                  onChangeText={setInstructions}
                  placeholder="Additional Directions"
                  value={instructions}
                  multiline
                  editable
                />
                )}

              </View>
            </View>
            <PrimaryButton
              onPress={() => {
                if (address.trim().length === 0) {
                  if (includeInstructions && onSubmitWithInstructions) {
                    onSubmitWithInstructions(null, instructions);
                  } else {
                    onSubmit(null);
                  }
                } else if (!includeInstructions || !onSubmitWithInstructions) {
                  onSubmit({
                    streetAddress: address,
                    buildingNumber: 0,
                    city: 'Atlanta',
                    state: 'GA',
                    zipCode: parseInt(zipCode, 10),
                    longitude,
                    latitude,
                  });
                } else {
                  onSubmitWithInstructions({
                    streetAddress: address,
                    buildingNumber: 0,
                    city: 'Atlanta',
                    state: 'GA',
                    zipCode: parseInt(zipCode, 10),
                    longitude,
                    latitude,
                  }, instructions);
                }
              }}
            >
              {ButtonTitle}
            </PrimaryButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    width: '100%',
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
