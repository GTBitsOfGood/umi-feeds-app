import * as AuthSession from 'expo-auth-session';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { StackNavigationProp, HeaderBackButton } from '@react-navigation/stack';
import { StyleSheet, TextInput, Platform, Alert } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { View, Text } from '../../style/Themed';

import * as Auth0 from '../../constants/Auth0';

import { saveNameAndRoles } from '../../redux/reducers/OnboardingReducer';
import { Roles } from '../../types';

import { LoginStackParamList } from '../../navigation/LoginStack/types';
import { HideKeyboardUtility } from '../../util/index';

type OnboardingNameFormProp = StackNavigationProp<LoginStackParamList, 'OnboardingNameForm'>

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export default function OnboardingNameForm() {
  const dispatch = useDispatch();
  const navigation = useNavigation<OnboardingNameFormProp>();
  const [businessName, onChangeBusinessName] = useState<string>('');
  const [phoneNumber, onChangeNumber] = useState<string>('');

  const [donorRoleForm, onSelectDonor] = useState<boolean>(false);
  const [volunteerRoleForm, onSelectVolunteer] = useState<boolean>(false);

  const [, logoutResult, promptAsyncLogout] = AuthSession.useAuthRequest({
    redirectUri,
    clientId: Auth0.auth0ClientId,
  },
  { authorizationEndpoint: Auth0.logoutEndpoint });

  // Cancel button to reset the Auth0 credentials in the state, otherwise
  // every new login attempt will be using that same account
  useEffect(() => {
    if (logoutResult) {
      // Although logout functionality works, it receives an error from Auth0,
      // so we only check for canceling logout rather than successful logout
      if (logoutResult.type !== 'cancel') {
        navigation.goBack();
      }
    }
  }, [logoutResult]);

  const formSubmit = () => {
    let rolesArr: Roles[];
    // eslint-disable-next-line prefer-const
    rolesArr = [];
    const numberPhone = parseInt(phoneNumber, 10);
    if (businessName.trim().length === 0) {
      Alert.alert('Company Name is Blank');
    } else if (Number.isNaN(numberPhone)) {
      Alert.alert('Entered Phone Number as 10 Digits');
    } else if (!donorRoleForm && !volunteerRoleForm) {
      Alert.alert('Please select one role: donor or volunteer');
    } else {
      if (donorRoleForm) {
        rolesArr.push('donor');
      }

      if (volunteerRoleForm) {
        rolesArr.push('volunteer');
      }

      dispatch(saveNameAndRoles({
        businessName: businessName.trim(),
        phoneNumber: numberPhone,
        roles: rolesArr,
      }));
      navigation.navigate('OnboardingAddressForm');
    }
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
          <HeaderBackButton label="Cancel" tintColor="#F37B36" onPress={() => promptAsyncLogout({ useProxy })} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Fill out the information to create your profile.</Text>
        </View>
        <View style={[styles.inputs, { flex: 7 }]}>
          <View>
            <TextInput
              value={businessName}
              onChangeText={onChangeBusinessName}
              style={styles.input}
              placeholder="Company Name"
              enablesReturnKeyAutomatically
            />
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={onChangeNumber}
              placeholder="Phone Number"
              enablesReturnKeyAutomatically
              keyboardType="numeric"
              textContentType="telephoneNumber"
            />
            <Text style={styles.subtitle}>Select All Roles that Apply.</Text>
            <CheckBox
              containerStyle={styles.checkbox}
              textStyle={{ fontWeight: 'normal' }}
              title="Donor"
              checked={donorRoleForm}
              onPress={() => {
                if (!donorRoleForm) {
                  onSelectVolunteer(false);
                }
                onSelectDonor(!donorRoleForm);
              }}
              checkedColor="#F37B36"
            />
            <CheckBox
              containerStyle={styles.checkbox}
              textStyle={{ fontWeight: 'normal' }}
              title="Volunteer"
              checked={volunteerRoleForm}
              onPress={() => {
                if (!volunteerRoleForm) {
                  onSelectDonor(false);
                }
                onSelectVolunteer(!volunteerRoleForm);
              }}
              checkedColor="#F37B36"
            />
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
  input: {
    height: '20%',
    marginTop: 1,
    marginBottom: 12,
    borderWidth: 0.5,
    color: 'black',
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
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
  },
  buttons: {
    paddingLeft: 45,
    paddingRight: 45,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkbox: {
    width: '40%',
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    padding: 2
  }
});
