import React, { useState } from 'react';
import { StyleSheet, Button, TextInput } from 'react-native';
import { View, Text } from '../Themed';

export default function NewDonerLocation({ navigation }) {
  const [streetAddress, onStreetAddressChange] = useState<string>('');
  const [suiteAptBuildingNumber, onSuiteAptBuildingNumberChange] = useState<string>('');
  const [city, onCityChange] = useState<string>('');
  const [state, onStateChange] = useState<string>('');
  const [zipCode, onZipCodeChange] = useState<string>('');

  const [next, onNextChange] = useState<string>('');

  const text = 'not done';
  return (
    <View>
      <Text>Donor</Text>
      <View>
        <Text>Where are you located?</Text>
        <TextInput
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
        />
        <TextInput
          style={styles.input}
          onChangeText={onStateChange}
              // value={number}
          placeholder="State"
        />
        <TextInput
          style={styles.input}
          onChangeText={onZipCodeChange}
              // value={number}
          placeholder="Zip Code"
        />
      </View>
      <Text>{`address: ${streetAddress}`}</Text>
      <Text>{`Suite, Apt, Building Number: ${suiteAptBuildingNumber}`}</Text>
      <Text>{`City: ${city}`}</Text>
      <Text>{`State: ${state}`}</Text>
      <Text>{`Zip Code: ${zipCode}`}</Text>
      <Button title="<" onPress={() => navigation.goBack()} />
      <Button
        title="NEXT"
        onPress={() => onNextChange('Would you like to use this address for doncation pickup?')}
      />
      <Text>{next}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
