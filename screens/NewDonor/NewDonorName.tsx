import * as AuthSession from 'expo-auth-session';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Button, TextInput, Platform } from 'react-native';
import { View, Text } from '../../style/Themed';

import * as Auth0 from '../../constants/Auth0';

import { HomeScreenParamList } from '../../navigation/SharedStack/Home/types';

type newDonorNameProp = StackNavigationProp<HomeScreenParamList, 'NewDonorName'>

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export default function NewDonorName() {
  const navigation = useNavigation<newDonorNameProp>();
  const [text, onChangeText] = useState<string>('');

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
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}
    >
      <View style={styles.inputs}>
        <Text style={styles.title}>What is your business’s name?</Text>
        <View style={styles.form}>
          <Text style={{ fontWeight: 'bold' }}>Business Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            placeholder="Trattoria"
            enablesReturnKeyAutomatically
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <Button title="CANCEL" onPress={() => promptAsyncLogout({ useProxy })} />
        <Button title="NEXT" onPress={() => navigation.navigate('NewDonorNumber')} />
      </View>
    </View>
  );
}

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
