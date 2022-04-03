import * as AuthSession from 'expo-auth-session';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { StackNavigationProp, HeaderBackButton } from '@react-navigation/stack';
import { StyleSheet, TextInput, Platform, Alert } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import axios, { AxiosError } from 'axios';
import { View, Text } from '../../style/Themed';

import { LoginStackParamList } from '../../navigation/LoginStack/types';
import { HideKeyboardUtility } from '../../util/index';
import FloatingTitleTextInputField from '../../components/TextInput';

type VerifyVolunteerProp = StackNavigationProp<LoginStackParamList, 'OnboardingNameForm'>

export default function VerifyVolunteer() {
  const navigation = useNavigation<VerifyVolunteerProp>();

  const [volunteerPass, setVolunteerPass] = useState('');
  const [incorrectPass, setIncorrectPass] = useState(false);

  const formSubmit = () => {
    let passwordAttempt = volunteerPass;
    if (volunteerPass === '') {
      passwordAttempt = '45efdfad-dcdd-4d71-95bb-104a1ec960b9'; // I don't think erica will ever make the password this random uuid I generated
    }
    axios.get(`/admin/passcode/${passwordAttempt}`).then((res) => {
      if (res.data && res.data.message && res.data.message === 'match') {
        setIncorrectPass(false);
        navigation.navigate('OnboardingAddressForm');
      }
    }).catch((err: AxiosError) => {
      if (err.response?.data && err.response.data.message && err.response.data.message === 'no match') {
        setIncorrectPass(true);
      } else {
        Alert.alert('Verification error! Please try again at another time');
        console.error(err);
      }
    });
  };

  return (
    <HideKeyboardUtility>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        justifyContent: 'space-between'
      }}
      >
        <View style={{ flex: 1,
          width: '100%',
          paddingTop: 10,
          flexDirection: 'row',
          justifyContent: 'flex-start' }}
        >
          <HeaderBackButton
            label="Back"
            tintColor="#F37B36"
            onPress={() => {
              navigation.goBack();
              setIncorrectPass(false);
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Enter Password</Text>
          <Text style={styles.subtitle}>Enter the password that Erica provided to you.</Text>
        </View>
        <View style={[styles.inputs, { flex: 7 }]}>
          <View>
            <FloatingTitleTextInputField
              title="Password"
              value={volunteerPass}
              onChangeText={(pass) => setVolunteerPass(pass)}
              keyboardType="default"
              required={false}
              inputError={incorrectPass}
            />
            {incorrectPass && <Text style={{ color: '#FF3131', paddingTop: 5 }}>Incorrect Password</Text>}
          </View>
        </View>
        <View style={[{ flex: 0.8,
          width: '100%',
          justifyContent: 'center' }]}
        >
          <Button
            title="Next"
            buttonStyle={{ backgroundColor: '#F37B36', height: '100%' }}
            onPress={formSubmit}
          />
        </View>
      </View>
    </HideKeyboardUtility>
  );
}

const styles = StyleSheet.create({
  inputs: {
    paddingTop: 0
  },
  title: {
    color: '#202020',
    fontSize: 35,
    lineHeight: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#202020',
    fontSize: 16,
    paddingTop: 10,
  }
});
