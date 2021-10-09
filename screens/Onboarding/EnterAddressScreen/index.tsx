import axios from 'axios';
import React, { useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton, StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Button, TextInput, Dimensions, Pressable, Modal, Alert, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { View, Text } from '../../../style/Themed';
import { setAddress, setUseThisAddressForPickup } from '../../../redux/reducers/donorReducer';
import { BottomTabParamList } from '../../../navigation/MainNavBar/types';

const API_KEY = 'AIzaSyDV1e0TuU6bdCfQtdZIfUmmdvSXmrTlAoQ';

type newDonorLocationProps = StackNavigationProp<BottomTabParamList>;

function EnterAddressScreen() {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const donorState = useSelector((state: RootState) => state.donor);

  const navigation = useNavigation<newDonorLocationProps>();
  const [streetAddress, onStreetAddressChange] = useState<string>('');
  const [suiteAptBuildingNumber, onSuiteAptBuildingNumberChange] = useState<string>('');
  const [city, onCityChange] = useState('');
  const [state, onStateChange] = useState<string>('');
  const [zipCode, onZipCodeChange] = useState<string>('');
  const [latitude, onLatitudeChange] = useState<string>('');
  const [longitude, onLongitudeChange] = useState<string>('');

  const [addressData, setAddressData] = useState(null);

  // TODO: actually make a request to the backend
  const handleSaveProfile = () => {
    axios.post('/api/users', {
      name: authState.name,
      email: 'example@gmail.com',
      pushTokens: ['ExponentPushToken[EXAMPLE]'],
      donorInfo: {
        name: authState.name,
        phone: donorState.phoneNumber,
        address: streetAddress,
        longitude,
        latitude
      },
      volunteerInfo: {
        phone: donorState.phoneNumber
      },
      recipient: false,
      admin: false
    });
  };

  const handleAutofillAddress = (data, details) => {
    onStreetAddressChange(data.terms[0].value);
    onSuiteAptBuildingNumberChange(data.terms[1].value);
    onCityChange(data.terms[2].value);
    onStateChange('GA');
    onZipCodeChange(details.address_components[7].long_name);
    onLongitudeChange(details.geometry.location.lat);
    onLatitudeChange(details.geometry.location.lng);
  };

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between' // this needs to change to get the title up the page
      }}
      >
        <HeaderBackButton tintColor="#F37B36" style={styles.backButton} onPress={() => navigation.goBack()} />
        <KeyboardAvoidingView style={styles.inputs} behavior="position">
          <Text style={styles.title}>Enter address</Text>
          <Text style={styles.description}>
            Fill out the address information below. We’ll share this with your assigned driver for pickup.
          </Text>
          <View style={styles.form}>
            <View style={styles.google}>
              <GooglePlacesAutocomplete
                styles={{ textInput: styles.googleInput, listView: { position: 'absolute', zIndex: 100, borderColor: 'black', borderWidth: 1, top: 45 } }}
                placeholder="Street Address"
                fetchDetails
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  // eslint-disable-next-line no-console
                  console.log(details);
                  handleAutofillAddress(data, details);
                }}
                query={{
                  key: API_KEY,
                  language: 'en',
                  components: 'country:us',
                }}
              />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={onSuiteAptBuildingNumberChange}
              value={suiteAptBuildingNumber}
              placeholder="Suite, Apt, Building Number"
              textContentType="streetAddressLine2"
            />
            <TextInput
              style={styles.input}
              onChangeText={onCityChange}
              value={city}
              placeholder="City"
              textContentType="addressCity"
            />
            <TextInput
              style={styles.input}
              onChangeText={onStateChange}
              placeholder="Country/Region"
              defaultValue="United States"
              editable={false}
              textContentType="countryName"
            />
            <TextInput
              style={styles.input}
              onChangeText={onStateChange}
              placeholder="State"
              defaultValue="GA"
              editable={false}
              textContentType="addressState"
            />
            <TextInput
              style={styles.input}
              onChangeText={onZipCodeChange}
              placeholder="Zip Code"
              value={zipCode}
              textContentType="postalCode"
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.buttons}>
          <Button
            title="Save profile"
            color="white"
            onPress={() => {
              handleSaveProfile();
              // navigation.navigate('Donate');
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default EnterAddressScreen;

const styles = StyleSheet.create({
  backButton: {
    marginTop: 60,
    left: '1%'
  },
  inputs: {
    paddingHorizontal: 45,
    paddingTop: 0
  },
  form: {
    paddingTop: 100
  },
  google: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    width: 330,
    zIndex: 10
  },
  googleInput: {
    height: 40,
    marginBottom: 12,
    borderWidth: 0.5,
    color: 'black',
    borderColor: 'black',
    borderRadius: 10,
    width: 330,
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 0.5,
    color: 'black',
    borderColor: 'black',
    borderRadius: 10,
    width: 330,
    padding: 10,
  },
  inputBottom: {
    flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  title: {
    color: '#202020',
    fontSize: 32,
    lineHeight: 37,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 15
  },
  buttons: {
    backgroundColor: '#F37B36',
    padding: 15,
    margin: 20,
    marginBottom: 40,
    borderRadius: 4,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height / 11,
    // backgroundColor: 'transparent',
    top: Dimensions.get('window').height - 400,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(75,120,203,1)',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get('window').width + 10,
    height: Dimensions.get('window').height / 3,
  },
  buttonsView: {
    flexDirection: 'row',
    backgroundColor: 'rgba(75,120,203,1)',
  },
  buttonNo: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    margin: 15,
    elevation: 2,
    width: 139,
    height: 56,
    color: 'rgba(62,62,62,1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonYes: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 15,
    elevation: 2,
    width: 139,
    height: 56,
    color: 'rgba(252,136,52,1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyleNO: {
    color: 'rgba(62,62,62,1)',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  textStyleYes: {
    color: 'rgba(252,136,52,1)',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  textStyleNO2: {
    color: 'rgba(62,62,62,1)',
    textAlign: 'center',
    fontSize: 12,
  },
  textStyleYes2: {
    color: 'rgba(252,136,52,1)',
    textAlign: 'center',
    fontSize: 12,
  },
  modalText: {
    marginBottom: 15,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  exitOut: {
    alignSelf: 'baseline',
    paddingBottom: 20,
  }
});
