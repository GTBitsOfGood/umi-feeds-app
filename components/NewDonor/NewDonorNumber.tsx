import React, { useState } from 'react';
import { StyleSheet, Button, TextInput } from 'react-native';
import { View, Text } from '../Themed';

export default function NewDonerNumber({ navigation }) {
  const [phoneNumber, onPhoneNumberChange] = useState<string>('');
  return (
    <View>
      <Text>Whats is your number?</Text>
      <View>
        <Text>Phone Number</Text>
        <TextInput
          style={styles.input}
          onChangeText={onPhoneNumberChange}
              // value={number}
          placeholder="+1 XXX-XXX-XXXX"
          keyboardType="phone-pad"
        />
      </View>
      <Text>{`phone number: ${phoneNumber}`}</Text>
      <Button title="<" onPress={() => navigation.goBack()} />
      <Button title="NEXT" onPress={() => navigation.navigate('NewDonorLocation')} />
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
