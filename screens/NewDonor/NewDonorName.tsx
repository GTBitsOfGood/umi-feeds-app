import * as AuthSession from 'expo-auth-session';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, TextInput, Button as LinkButton, Platform } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { View, Text } from '../../style/Themed';

import * as Auth0 from '../../constants/Auth0';

import { HomeScreenParamList } from '../../navigation/SharedStack/Home/types';
import { HideKeyboardUtility } from '../../util/index';

type newDonorNameProp = StackNavigationProp<HomeScreenParamList, 'NewDonorName'>

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export default function NewDonorName() {
  const navigation = useNavigation<newDonorNameProp>();
  const [businessName, onChangeBusinessName] = useState<string>('');
  const [phoneNumber, onChangeNumber] = useState<string>();

  const [donorRoleForm, onSelectDonor] = useState<boolean>(false);
  const [volunteerRoleForm, onSelectVolunteer] = useState<boolean>(false);
  const [recipientRoleForm, onSelectRecipient] = useState<boolean>(false);

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
          <LinkButton title="← Cancel" color="#F37B36" onPress={() => promptAsyncLogout({ useProxy })} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Fill out the information to create your profile.</Text>
        </View>
        <View style={[styles.inputs, { flex: 7 }]}>
          <View style={styles.form}>
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
              onPress={() => onSelectDonor(!donorRoleForm)}
              checkedColor="#F37B36"
            />
            <CheckBox
              containerStyle={styles.checkbox}
              textStyle={{ fontWeight: 'normal' }}
              title="Volunteer"
              checked={volunteerRoleForm}
              onPress={() => onSelectVolunteer(!volunteerRoleForm)}
              checkedColor="#F37B36"
            />
            <CheckBox
              containerStyle={styles.checkbox}
              textStyle={{ fontWeight: 'normal' }}
              title="Recipient"
              checked={recipientRoleForm}
              onPress={() => onSelectRecipient(!recipientRoleForm)}
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
            onPress={() => navigation.navigate('NewDonorNumber')}
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
  form: {
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-between'
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
