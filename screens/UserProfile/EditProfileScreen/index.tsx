import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector, batch } from 'react-redux';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState } from '../../../redux/rootReducer';
import { HideKeyboardUtility } from '../../../util';
import { login } from '../../../redux/reducers/authReducer';
import { setLoading } from '../../../redux/reducers/loadingReducer';
import { UserProfileScreenParamList } from '../../../navigation/SharedStack/UserProfile/types';
import { BottomTabParamList } from '../../../navigation/MainNavBar/DonorTabs/types';
import LoadingScreen from '../../LoadingScreen';

type ProfileScreenProp = CompositeNavigationProp<
    StackNavigationProp<UserProfileScreenParamList, 'EditUserProfileScreen'>,
    BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;

export default function EditProfileScreen() {
  const authState = useSelector((state: RootState) => state.auth);
  const loadingState = useSelector((state: RootState) => state.loading.loadingStatus);
  const navigation = useNavigation<ProfileScreenProp>();
  const dispatch = useDispatch();

  const [businessName, onChangeBusinessName] = useState<string>(authState.businessName);
  const [phoneNumber, onChangeNumber] = useState<string>(authState.phoneNumber.toString());
  const [email, onChangeEmail] = useState<string>(authState.email);

  const saveChanges = () => {
    const parsedPhoneNumber = parseInt(phoneNumber, 10);
    if (businessName.trim().length === 0) {
      Alert.alert('Business Name Cannot Be Blank');
    } else if (Number.isNaN(parsedPhoneNumber) || phoneNumber.length !== 10) {
      Alert.alert('Please Enter a Valid 10-Digit Phone Number');
    } else if (email.trim().length === 0) {
      Alert.alert('Email Cannot Be Blank');
    }

    /* copying with JSON creates a deep copy! updated profile is now a different object with a
       different reference but same values */
    dispatch(setLoading({ loading: true }));
    const updatedProfile = JSON.parse(JSON.stringify(authState));
    updatedProfile.businessName = businessName;
    updatedProfile.phoneNumber = parsedPhoneNumber;
    updatedProfile.email = email;

    axios.put(`/api/user/${authState._id}`, updatedProfile)
      .then((res) => {
        batch(() => {
          dispatch(login(updatedProfile)); // causes authState to point to a new object, retroactively updating all authState rendered components
          dispatch(setLoading({ loading: false }));
        });
        navigation.goBack();
      })
      .catch((error) => console.error(error));
  };

  return (
    loadingState ? (
      <LoadingScreen />
    ) : (
      <HideKeyboardUtility>
        <View style={styles.container}>
          <Text style={styles.title}>Edit Profile</Text>
          <View style={[styles.inputs, { flex: 7 }]}>
            <Text style={styles.inputTitle}>Business Name</Text>
            <TextInput
              value={businessName}
              onChangeText={onChangeBusinessName}
              style={styles.input}
              placeholder="Business Name"
              enablesReturnKeyAutomatically
            />
            <Text style={styles.inputTitle}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={onChangeNumber}
              placeholder="Phone Number"
              enablesReturnKeyAutomatically
              keyboardType="numeric"
              textContentType="telephoneNumber"
            />
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={onChangeEmail}
              placeholder="Email"
              enablesReturnKeyAutomatically
            />
          </View>
          <View style={[{ flex: 0.8,
            width: '100%',
            justifyContent: 'center' }]}
          >
            <Button
              title="Save Changes"
              buttonStyle={{ backgroundColor: '#F37B36', height: '100%' }}
              onPress={saveChanges}
            />
          </View>
        </View>
      </HideKeyboardUtility>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
    padding: '5%',
    backgroundColor: 'white'
  },
  inputs: {
    paddingTop: '7%',
    justifyContent: 'flex-start'
  },
  input: {
    height: '10%',
    marginTop: 5,
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
  inputTitle: {
    color: '#202020',
    fontSize: 16,
    paddingTop: 10,
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
