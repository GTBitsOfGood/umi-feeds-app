import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { RootState } from '../../rootReducer';
import { View, Text } from '../Themed';
import { setAddress } from './donorReducer';

const mapDispatchToProps = { setAddress };

function NewDonorLocation({ navigation, setAddress, authenticated, jwt }: {
  navigation: any,
  setAddress: any,
}) {
  const [streetAddress, onStreetAddressChange] = useState<string>('');
  const [suiteAptBuildingNumber, onSuiteAptBuildingNumberChange] = useState<string>('');
  const [city, onCityChange] = useState('');
  const [state, onStateChange] = useState<string>('');
  const [zipCode, onZipCodeChange] = useState<string>('');

  const [next, onNextChange] = useState<string>('');

  return (
    <View>
      <View style={styles.inputs}>
        <Text style={styles.title}>Donor</Text>
        <View style={styles.form}>
          <Text>Where are you located?</Text>
          <TextInput
            style={styles.input}
            onChangeText={onStreetAddressChange}
              // value={number}
            placeholder="  Street Address"
          />
          <TextInput
            style={styles.input}
            onChangeText={onSuiteAptBuildingNumberChange}
              // value={number}
            placeholder="  Suite, Apt, Building Number"
          />
          <TextInput
            style={styles.input}
            onChangeText={onCityChange}
              // value={number}
            placeholder="  City"
          />
          <TextInput
            style={styles.input}
            onChangeText={onStateChange}
              // value={number}
            placeholder="  State"
          />
          <TextInput
            style={styles.input}
            onChangeText={onZipCodeChange}
              // value={number}
            placeholder="  Zip Code"
          />
        </View>
        <Text>{`address: ${streetAddress}`}</Text>
        <Text>{`Suite, Apt, Building Number: ${suiteAptBuildingNumber}`}</Text>
        <Text>{`City: ${city}`}</Text>
        <Text>{`State: ${state}`}</Text>
        <Text>{`Zip Code: ${zipCode}`}</Text>
        <Text>{next}</Text>
      </View>
      <View style={styles.buttons}>
        <Button title="<" onPress={() => navigation.goBack()} />
        <Button
          title="NEXT"
          onPress={() => {
            setAddress({
              streetAddress, suiteAptBuildingNumber, city, state, zipCode
            });
            onNextChange('Would you like to use this address for doncation pickup?');
            // TODO: make a request to create a new user
          }}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state: RootState) => ({
  authenticated: state.auth.authenticated,
  jwt: state.auth.jwt
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDonorLocation);

const styles = StyleSheet.create({
  inputs: {
    paddingLeft: 45,
    paddingTop: 44
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
  },
  title: {
    color: 'rgba(252,136,52,1)',
    fontSize: 45,
    lineHeight: 52.73,
    fontWeight: 'bold',
  },
  buttons: {
    marginTop: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
