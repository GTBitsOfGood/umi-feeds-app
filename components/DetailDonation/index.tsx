import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { DonationDishes } from '../../../types';
import { RootState } from '../../../redux/rootReducer';

import { DonateTabParamList } from '../../../navigation/DonorStack/Donate/types';
import { BottomTabParamList } from '../../../navigation/MainNavBar/types';
import { DonationForm } from '../../types';
import { HomeScreenParamList } from '../../navigation/SharedStack/Home/types';

type DetailDonationScreenProp = CompositeNavigationProp<
  StackNavigationProp<HomeScreenParamList>,
  BottomTabNavigationProp<BottomTabParamList>
>;

function DetailDonationScreen(donation: DonationForm) {
  const navigation = useNavigation<DetailDonationScreenProp>();

  let buildingNumberStr = '';
  if (typeof donation.route.params.donation.pickupAddress.buildingNumber !== 'undefined') {
    buildingNumberStr = `#${donation.route.params.donation.pickupAddress.buildingNumber}`;
  }

  const pickupStartTimeDate = new Date(donation.route.params.donation.pickupStartTime);
  let pickupStartHour = pickupStartTimeDate.getHours();
  const startAmPm = pickupStartHour >= 12 ? 'PM' : 'AM';
  pickupStartHour %= 12;
  pickupStartHour = pickupStartHour !== 0 ? pickupStartHour : 12;
  const pickupStartMinute = pickupStartTimeDate.getMinutes();
  const pickupStartMinuteStr = pickupStartMinute < 10 ? `0${pickupStartMinute}` : pickupStartMinute;
  const formattedStartTime = `${pickupStartHour}:${pickupStartMinuteStr} ${startAmPm}`;

  const pickupEndTimeDate = new Date(donation.route.params.donation.pickupEndTime);
  let pickupEndHour = pickupEndTimeDate.getHours();
  const endAmPm = pickupEndHour >= 12 ? 'PM' : 'AM';
  pickupEndHour %= 12;
  pickupEndHour = pickupEndHour !== 0 ? pickupEndHour : 12;
  const pickupEndMinute = pickupEndTimeDate.getMinutes();
  const pickupEndMinuteStr = pickupEndMinute < 10 ? `0${pickupEndMinute}` : pickupEndMinute;
  const formattedEndTime = `${pickupEndHour}:${pickupEndMinuteStr} ${endAmPm}`;

  const formattedDate = `${pickupEndTimeDate.getMonth() + 1}/${pickupEndTimeDate.getDate()}/${pickupEndTimeDate.getFullYear()}`;

  const authState = useSelector((state: RootState) => state.auth);

  const donationDish = [];
  for (let i = 0; i < donation.route.params.donation.dishes.length; i += 1) {
    let dishName = donation.route.params.donation.dishes[i].dishID;
    for (let j = 0; j < authState.dishes.length; j += 1) {
      if (authState.dishes[j]._id === donation.route.params.donation.dishes[i].dishID) {
        dishName = authState.dishes[i].dishName;
      }
    }
    donationDish.push(
      <>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>{dishName}</Text>
          <Text>{donation.route.params.donation.dishes[i].quantity}</Text>
        </View>
        <View style={{ width: '100%', borderTopColor: '#E6E6E6', borderTopWidth: 1, marginVertical: 16 }} />
      </>
    );
  }

  return (
    <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, width: '100%', justifyContent: 'space-around' }}>
        <View style={styles.container}>
          <View style={{ width: '100%', justifyContent: 'space-between', marginBottom: 20 }}>
            <Pressable
              onPress={() => navigation.navigate('DonationsList')}
              style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start', marginTop: 30 }}
            >
              <AntDesign name="left" size={21} color="rgba(243, 123, 54, 1)" />
              <Text style={{ fontSize: 15, color: 'rgba(243, 123, 54, 1)' }}>Donations</Text>
            </Pressable>
            <Text style={[styles.title, { marginBottom: 8, marginTop: 28 }]}>{formattedDate}</Text>
            <Text style={{ fontSize: 21, fontWeight: '500', marginVertical: 24 }}>
              Status: <Text style={{ fontSize: 21, fontWeight: '400', marginVertical: 24 }}>{donation.route.params.donation.status}</Text>
            </Text>
            <Text style={{ fontSize: 21, fontWeight: '500', marginVertical: 8 }}>Pickup details</Text>
            <Text style={styles.detailsHeader}>Address</Text>
            <Text style={styles.details}>
              {donation.route.params.donation.pickupAddress.streetAddress} {buildingNumberStr}{'\n'}
              {donation.route.params.donation.pickupAddress.city}, {donation.route.params.donation.pickupAddress.state}, {donation.route.params.donation.pickupAddress.zipCode}
            </Text>
            <Text style={styles.detailsHeader}>Scheduled time</Text>
            <Text style={styles.details}>
              Date: {formattedDate}{'\n'}
              Time: {formattedStartTime} - {formattedEndTime}
            </Text>
            <Text style={styles.detailsHeader}>Pickup instructions</Text>
            <Text style={styles.details}>{donation.route.params.donation.pickupInstructions}</Text>
          </View>
          <View style={{ width: '100%', justifyContent: 'flex-start' }}>
            <View style={[styles.spacedContainer, { marginBottom: 20 }]}>
              <Text style={styles.subHeader}>Donation list</Text>
            </View>
            <View style={{ width: '100%', justifyContent: 'space-around' }}>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={styles.spacedContainer}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Dish item</Text>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Qty</Text>
                </View>
                <View style={{ width: '100%', borderTopColor: 'rgba(93, 93, 93, 1)', borderTopWidth: 1, marginTop: 7, marginBottom: 16 }} />
              </View>
              {donationDish}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default DetailDonationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  topContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  spacedContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItem: {
    width: '100%',
  },
  standardText: {
    alignContent: 'flex-start',
    fontSize: 15,
    color: 'black',
  },
  title: {
    alignContent: 'flex-start',
    fontSize: 32,
    fontWeight: '500',
    color: 'black',
  },
  detailsHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
    marginVertical: 8,
  },
  details: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});
