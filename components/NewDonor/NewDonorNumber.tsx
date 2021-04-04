import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, Dimensions } from 'react-native';
import { View, Text } from '../Themed';

export default function NewDonerNumber({ navigation }) {
  const [phoneNumber, onPhoneNumberChange] = useState<string>('');
  return (
    <View>
      <View style={styles.inputs}>
        <Text style={styles.title}>Whats is your number?</Text>
        <View style={styles.form}>
          <Text>Phone Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={onPhoneNumberChange}
              // value={number}
            placeholder="  +1 XXX-XXX-XXXX"
            keyboardType="phone-pad"
          />
        </View>
        <Text>{`phone number: ${phoneNumber}`}</Text>
      </View>
      <View style={styles.buttons}>
        <Button title="<" onPress={() => navigation.goBack()} />
        <Button title="NEXT" onPress={() => navigation.navigate('NewDonorLocation')} />
      </View>
    </View>
  );
}

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
    color: 'white',
    borderColor: 'white',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
