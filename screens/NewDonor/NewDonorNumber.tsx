import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Button, TextInput, Dimensions, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { View, Text } from '../../style/Themed';
import { setPhoneNumber } from '../../redux/reducers/donorReducer';

import { LoginScreenParamList } from '../../types';

type newDonorNumberProp = StackNavigationProp<LoginScreenParamList, 'NewDonorNumber'>

function NewDonorNumber() {
  const dispatch = useDispatch();
  const navigation = useNavigation<newDonorNumberProp>();
  const [phoneNumber, onPhoneNumberChange] = useState<string>('');
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}
    >
      <View style={styles.inputs}>
        <Text style={styles.title}>What is your number?</Text>
        <View style={styles.form}>
          <Text style={{ fontWeight: 'bold' }}>Phone Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={onPhoneNumberChange}
            placeholder="+1 XXX-XXX-XXXX"
            // keyboardType="numeric"
            textContentType="telephoneNumber"
            // onPressOut={() => Keyboard.dismiss()}
            // maxLength={10}
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <Button title="←" onPress={() => navigation.goBack()} />
        <Button
          title="NEXT"
          onPress={() => {
            dispatch(setPhoneNumber(phoneNumber));
            navigation.navigate('NewDonorLocation');
          }}
        />
      </View>
    </View>
  );
}

export default NewDonorNumber;

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
  title: {
    color: 'rgba(252,136,52,1)',
    fontSize: 45,
    lineHeight: 52.73,
    fontWeight: 'bold',
  },
  buttons: {
    paddingLeft: 45,
    paddingRight: 45,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
