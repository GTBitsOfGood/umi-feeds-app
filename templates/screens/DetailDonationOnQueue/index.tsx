import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRoute, RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import styles from '../DetailDonationOnQueue/styles';
import { Address, DonationForm } from '../../../types';
import { RootState } from '../../../redux/rootReducer';

type ParamList = {
  DetailDonationOnQueue: {
    donationForm: DonationForm
  }
}

/**
 * Admin view of donation details. Can view Restaurant Name, Deliverary Details, Pickup Details, Meal List, and Contact
 * info.
 *
 * IMPORTANT NOTES:
 *
 *
 * KNOWN BUGS:
 *  N/A
 *
 * @returns {TSX.Element}
 */

function DetailDonationOnQueue() {
  const route = useRoute<RouteProp<ParamList, 'DetailDonationOnQueue'>>();
  const { donationForm } = route.params;

  let buildingNumberStr = '';
  if (typeof donationForm.pickupAddress.buildingNumber !== 'undefined') {
    buildingNumberStr = `#${donationForm.pickupAddress.buildingNumber}`;
  }

  const pickupStartTimeDate = new Date(donationForm.pickupStartTime);
  let pickupStartHour = pickupStartTimeDate.getHours();
  const startAmPm = pickupStartHour >= 12 ? 'PM' : 'AM';
  pickupStartHour %= 12;
  pickupStartHour = pickupStartHour !== 0 ? pickupStartHour : 12;
  const pickupStartMinute = pickupStartTimeDate.getMinutes();
  const pickupStartMinuteStr = pickupStartMinute < 10 ? `0${pickupStartMinute}` : pickupStartMinute;
  const formattedStartTime = `${pickupStartHour}:${pickupStartMinuteStr} ${startAmPm}`;

  const pickupEndTimeDate = new Date(donationForm.pickupEndTime);
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
  let donationTotalCost:any;
  for (let i = 0; i < donationForm.donationDishes.length; i += 1) {
    let dishName = donationForm.donationDishes[i].dishID;
    for (let j = 0; j < authState.dishes.length; j += 1) {
      if (authState.dishes[j]._id === donationForm.donationDishes[i].dishID) {
        dishName = authState.dishes[i].dishName;
      }
    }
    donationDish.push(
      <View key={donationForm.donationDishes[i].dishID}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>{dishName}</Text>
          <Text>{donationForm.donationDishes[i].quantity}</Text>
        </View>
        <View style={{ width: '100%', borderTopColor: '#E6E6E6', borderTopWidth: 1, marginVertical: 16 }} />
      </View>
    );
    donationTotalCost += Number(donationForm.donationDishes[i].cost ?? '0');
  }

  const status = () => {
    if (donationForm.status === 'Pending') {
      return (
        <View>
          <Text style={{ fontSize: 21, fontWeight: '500', marginVertical: 24 }}>
              Status: <Text style={{ fontSize: 21, fontWeight: 'bold', marginVertical: 24, color: "#5D5D5D" }}>{donationForm.status}</Text>
            </Text>
          <Pressable
            style={{
              height: 52,
              borderRadius: 4,
              borderColor: '#5D5D5D',
              borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: "#5D5D5D"
            }}
            onPress={() => console.log('pending more like never ending')}
          >
            <Text style={{ fontSize: 17, color: '#FFFFFF', fontWeight: 'bold' }}>Set Address</Text>
          </Pressable>
        </View>
      );
    } else if (donationForm.status === 'Unclaim') {
      return (
        <View>
          <Text style={{ fontSize: 21, fontWeight: '500', marginVertical: 24 }}>
              Status: <Text style={{ fontSize: 21, fontWeight: 'bold', marginVertical: 24, color: "#007FA7" }}>{donationForm.status}</Text>
            </Text>
          <Pressable
            style={{
              height: 52,
              borderRadius: 4,
              borderColor: '#007FA7',
              borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: '#007FA7'
            }}
            onPress={() => console.log('unclaimed more like long forgotten idk')}
          >
            <Text style={{ fontSize: 17, color: '#FFFFFF', fontWeight: 'bold' }}>Claim this Donation</Text>
          </Pressable>
        </View>
      );
    } else if (donationForm.status === 'Claimed') {
      return (
        <View>
          <Text style={{ fontSize: 21, fontWeight: '500', marginVertical: 24 }}>
              Status: <Text style={{ fontSize: 21, fontWeight: 'bold', marginVertical: 24, color: "#00883F" }}>{donationForm.status}</Text>
            </Text>
          <Pressable
            style={{
              height: 52,
              borderRadius: 4,
              borderColor: '#00883F',
              borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00883F'
            }}
            onPress={() => console.log('complete more like deplete')}
          >
            <Text style={{ fontSize: 17, color: '#FFFFFF', fontWeight: 'bold' }}>Complete Donation</Text>
          </Pressable>
        </View>
      );
    } else {
      return (
        //Overdue
        <View>
          <Text style={{ fontSize: 21, fontWeight: '500', marginVertical: 24 }}>
              Status: <Text style={{ fontSize: 21, fontWeight: 'bold', marginVertical: 24, color: "#E90000" }}>{donationForm.status}</Text>
            </Text>
          <Pressable
            style={{
              height: 52,
              borderRadius: 4,
              borderColor: '#E90000',
              borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: '#E90000'
            }}
            onPress={() => console.log('overdue delievery more like smellivery')}
          >
            <Text style={{ fontSize: 17, color: '#FFFFFF', fontWeight: 'bold' }}>Set as Delivered</Text>

          </Pressable>
        </View>
      );
    }
  };

  return (
    <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, width: '100%', justifyContent: 'space-around' }}>
        <View style={styles.container}>
          <View style={{ width: '100%', justifyContent: 'space-between', marginBottom: 20 }}>
            <Text style={[styles.title, { marginBottom: 8, marginTop: 28 }]}>{formattedDate}</Text>
            {status()}
            <Text style={{ fontSize: 21, fontWeight: '500', marginVertical: 8 }}>Pickup details</Text>
            <Text style={styles.detailsHeader}>Address</Text>
            <Text style={styles.details}>
              {donationForm.pickupAddress.streetAddress} {buildingNumberStr}{'\n'}
              {donationForm.pickupAddress.city}, {donationForm.pickupAddress.state}, {donationForm.pickupAddress.zipCode}
            </Text>
            <Text style={styles.detailsHeader}>Scheduled time</Text>
            <Text style={styles.details}>
              Date: {formattedDate}{'\n'}
              Time: {formattedStartTime} - {formattedEndTime}
            </Text>
            <Text style={styles.detailsHeader}>Pickup instructions</Text>
            <Text style={styles.details}>{donationForm.pickupInstructions}</Text>
          </View>
          <View style={{ width: '100%', justifyContent: 'flex-start' }}>
            <View style={[styles.spacedContainer, { marginBottom: 20 }]}>
              <Text style={styles.subHeader}>Meal list</Text>
            </View>
            <View style={{ width: '100%', justifyContent: 'space-around' }}>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={styles.spacedContainer}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Dish item</Text>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Qty</Text>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Cost</Text>
                </View>
                <View style={{ width: '100%', borderTopColor: 'rgba(93, 93, 93, 1)', borderTopWidth: 1, marginTop: 7, marginBottom: 16 }} />
              </View>
              {donationDish}
              {donationTotalCost > 0 && (
                <View>
                  <View style={styles.spacedContainer}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Total Cost of Donation</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>$ {donationTotalCost}</Text>
                  </View>
                  <View style={{ width: '100%', borderTopColor: 'rgba(93, 93, 93, 1)', borderTopWidth: 1, marginTop: 7, marginBottom: 16 }} />
                </View>
              )}

            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default DetailDonationOnQueue;
