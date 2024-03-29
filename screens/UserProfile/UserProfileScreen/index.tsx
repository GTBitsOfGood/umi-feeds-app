import { ScrollView, View, TouchableHighlight, Pressable } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { useSelector } from 'react-redux';
import styles from './styles';
import { Text } from '../../../style/Themed';
import { RootState } from '../../../redux/rootReducer';

import { UserProfileScreenParamList } from '../../../navigation/SharedStack/UserProfile/types';
import { BottomTabParamList } from '../../../navigation/MainNavBar/DonorTabs/types';
import { LogoutButton } from '../../../components';
import LoadingScreen from '../../LoadingScreen';
import { moderateScale } from '../../../util';

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
  const loadingState = useSelector((state: RootState) => state.loading.loadingStatus);
  const navigation = useNavigation<ProfileScreenProp>();

  const isDonor = authState.roles.indexOf('donor') !== -1;

  const fullAddress = authState.pickupAddresses.map((businessAddress) => `${businessAddress.buildingNumber === 0 ? '' : businessAddress.buildingNumber} ${businessAddress.streetAddress} \n${businessAddress.city}, ${businessAddress.state} ${businessAddress.zipCode}`).join('\n\n') || 'No Address';

  return (
    loadingState ? (
      <LoadingScreen />
    ) : (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', marginBottom: 20, marginTop: 20 }}>
            <Text style={styles.title}>Profile</Text>
            {isDonor ? (
              <Pressable style={{ paddingTop: 12 }} onPress={() => navigation.navigate('HelpScreen')}>
                <Icon name="help-with-circle" size={moderateScale(20)} color="#5D5D5D" />
                <Text style={{ fontSize: moderateScale(12), color: '#5D5D5D' }}>Help</Text>
              </Pressable>
            ) : null}
          </View>
          <View style={{ marginBottom: 40, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.profilePicture} />
            <Text style={styles.info}>{`${authState.name}`}</Text>
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
          </View>
          <Text style={styles.body}>Name</Text>
          <Text style={styles.description}>{authState.businessName || 'No Business Name'}</Text>
          <Text style={styles.body}>Address{authState.pickupAddresses.length > 1 ? 'es' : ''}</Text>
          <Text style={styles.description}>{fullAddress}</Text>
          <LogoutButton />
        </ScrollView>
      </View>
    )
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
        <View style={{ flexGrow: 1, flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
          <Icon name="pencil" size={25} style={styles.icon} />
          <Text style={styles.button}>
            Edit
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
