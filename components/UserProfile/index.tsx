import { ScrollView, View, TouchableHighlight } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { useSelector } from 'react-redux';
import styles from './styles';
import { Text } from '../../style/Themed';
import { RootState } from '../../redux/rootReducer';

import { UserProfileScreenParamList } from '../../navigation/SharedStack/UserProfile/types';
import { BottomTabParamList } from '../../navigation/MainNavBar/types';

type ProfileScreenProp = CompositeNavigationProp<
    StackNavigationProp<UserProfileScreenParamList, 'UserProfileScreen'>,
    BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;

/**
 * User Profile Component
 * @returns {JSX.Element}
 */
export default function UserProfile() {
  const authState = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<ProfileScreenProp>();

  const fullAddress = authState.pickupAddresses.map((businessAddress) => `${businessAddress.buildingNumber} ${businessAddress.streetAddress} \n${businessAddress.city}, ${businessAddress.state} ${businessAddress.zipCode}`).join('\n\n') || 'No Address';

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
      >
        <Text style={styles.title}>My Account</Text>
        <View style={{ marginBottom: 40, alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.profilePicture} />
          <Text style={styles.info}>{`${authState.firstName} ${authState.lastName}`}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.heading}>Personal Identification </Text>
          <EditButton onEdit={() => navigation.navigate('EditUserProfileScreen')} />
        </View>

        <Text style={styles.body}>Phone Number</Text>
        <Text style={styles.description}>{authState.phoneNumber || 'No Phone Number'}</Text>
        <Text style={styles.body}>Email</Text>
        <Text style={styles.description}>{authState.email || 'No Email'}</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.heading}>Business Information</Text>
          <EditButton onEdit={() => navigation.navigate('EditUserProfileScreen')} />
        </View>
        <Text style={styles.body}>Name</Text>
        <Text style={styles.description}>{authState.businessName || 'No Business Name'}</Text>
        <Text style={styles.body}>Address{authState.pickupAddresses.length > 1 ? 'es' : ''}</Text>
        <Text style={styles.description}>{fullAddress}</Text>
      </ScrollView>
    </View>
  );
}

/**
 * Structure for the edit button
 * @param props onEdit function to be called when the edit button is pressed
 * @returns {JSX.Element}
 */
function EditButton(props: { onEdit: () => void }) {
  return (
    <View>
      <TouchableHighlight
        onPress={props.onEdit}
        underlayColor="transparent"
      >
        <View style={{ flexGrow: 1, flexDirection: 'row', alignContent: 'center' }}>
          <Text style={styles.button}>
            Edit
          </Text>
          <Icon name="chevron-thin-right" size={20} style={styles.icon} />
        </View>
      </TouchableHighlight>
    </View>
  );
}