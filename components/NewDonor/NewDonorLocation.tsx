import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, Dimensions, Pressable, Modal, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import { RootState } from '../../rootReducer';
import { View, Text } from '../Themed';
import { setAddress, setUseThisAddressForPickup } from './donorReducer';

const mapDispatchToProps = { setAddress, setUseThisAddressForPickup };

function NewDonorLocation({ navigation, setAddress, setUseThisAddressForPickup,
  authenticated, jwt, firstName, lastName, phoneNumber }: {
  authenticated: boolean,
  navigation: any,
  setAddress: any,
  setUseThisAddressForPickup: any,
  jwt: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
}) {
  const [streetAddress, onStreetAddressChange] = useState<string>('');
  const [suiteAptBuildingNumber, onSuiteAptBuildingNumberChange] = useState<string>('');
  const [city, onCityChange] = useState('');
  const [state, onStateChange] = useState<string>('');
  const [zipCode, onZipCodeChange] = useState<string>('');
  const [useThisAddress, onUseThisAddressChange] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  // TODO
  const handleSubmitNewDonor = () => {
    axios.post('/api/users', {
      name: firstName + lastName,
      email: 'example@gmail.com',
      pushTokens: ['ExponentPushToken[EXAMPLE]'],
      donorInfo: {
        name: firstName + lastName,
        phone: phoneNumber,
        address: streetAddress,
        longitude: 0,
        latitude: 0
      },
      volunteerInfo: {
        phone: phoneNumber
      },
      recipient: false,
      admin: false
    });
  };

  return (
    <View>
      <View style={styles.inputs}>
        <Text style={styles.title}>Donor</Text>
        <View style={styles.form}>
          <Text style={{ fontWeight: 'bold' }}>Where are you located?</Text>
          <TextInput
            textContentType="streetAddressLine1"
            style={styles.input}
            onChangeText={onStreetAddressChange}
            // value={number}
            placeholder="Street Address"
          />
          <TextInput
            style={styles.input}
            onChangeText={onSuiteAptBuildingNumberChange}
            // value={number}
            placeholder="Suite, Apt, Building Number"
          />
          <TextInput
            style={styles.input}
            onChangeText={onCityChange}
            // value={number}
            placeholder="City"
            textContentType="addressCity"
          />
          <View style={styles.inputBottom}>
            <TextInput
              style={[styles.input, { marginRight: 22, width: 179 }]}
              onChangeText={onStateChange}
            // value={number}
              placeholder="State"
              textContentType="addressState"
            />
            <TextInput
              style={[styles.input, { width: 129 }]}
              onChangeText={onZipCodeChange}
            // value={number}
              placeholder="Zip Code"
              textContentType="postalCode"
            />

          </View>
        </View>
        {/* <Text>{`address: ${streetAddress}`}</Text>
        <Text>{`Suite, Apt, Building Number: ${suiteAptBuildingNumber}`}</Text>
        <Text>{`City: ${city}`}</Text>
        <Text>{`State: ${state}`}</Text>
        <Text>{`Zip Code: ${zipCode}`}</Text> */}
      </View>
      <View style={styles.buttons}>
        <Button title="<" onPress={() => navigation.goBack()} />
        <Button
          title="NEXT"
          onPress={() => {
            setAddress({
              streetAddress, suiteAptBuildingNumber, city, state, zipCode
            });
            setModalVisible(true);
            // TODO: make a request to create a new user
          }}
        />
      </View>
      {/* Pop up */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.exitOut}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Image source={require('../../assets/images/x.png')} />
            </Pressable>
            <Text style={styles.modalText}>Would you like to use this address for donation pickup?</Text>
            <View style={styles.buttonsView}>
              <Pressable
                style={[styles.buttonNo]}
                onPress={() => {
                  onUseThisAddressChange(false);
                  setModalVisible(!modalVisible);
                  setUseThisAddressForPickup(useThisAddress);
                  // handleSubmitNewDonor();
                  // need to redirect to home screen
                }}
              >
                <Text style={styles.textStyleNO}>NO</Text>
                <Text style={styles.textStyleNO2}>use different address</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonYes]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  // handleSubmitNewDonor();
                  // need to redirect to home screen
                  navigation.navigate('Donate');
                }}
              >
                <Text style={styles.textStyleYes}>YES</Text>
                <Text style={styles.textStyleYes2}>use this address</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const mapStateToProps = (state: RootState) => ({
  authenticated: state.auth.authenticated,
  jwt: state.auth.jwt,
  firstName: state.auth.firstName,
  lastName: state.auth.lastName,
  address: state.donor.address,
  phoneNumber: state.donor.phoneNumber,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDonorLocation);

const styles = StyleSheet.create({
  inputs: {
    paddingLeft: 45,
    paddingTop: 115
  },
  form: {
    paddingTop: 136
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
    color: 'rgba(252,136,52,1)',
    fontSize: 45,
    lineHeight: 52.73,
    fontWeight: 'bold',
  },
  buttons: {
    marginTop: Dimensions.get('window').height - 694,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
