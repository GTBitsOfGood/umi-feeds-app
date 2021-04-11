import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, Dimensions, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { View, Text } from '../../components/Themed';
import { setPhoneNumber } from './donorReducer';

const mapDispatchToProps = { setPhoneNumber };

function NewDonorNumber({ navigation, setPhoneNumber }) {
  const [phoneNumber, onPhoneNumberChange] = useState<string>('');
  return (
    <View>
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
        {/* <Text>{`phone number: ${phoneNumber}`}</Text> */}
      </View>
      <View style={styles.buttons}>
        <Button title="<" onPress={() => navigation.goBack()} />
        <Button
          title="NEXT"
          onPress={() => {
            setPhoneNumber(phoneNumber);
            navigation.navigate('NewDonorLocation');
          }}
        />
      </View>
    </View>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(NewDonorNumber);

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
    marginTop: Dimensions.get('window').height - 553,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
