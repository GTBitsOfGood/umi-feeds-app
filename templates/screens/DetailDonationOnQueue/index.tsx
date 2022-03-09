import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute, RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import { Entypo, AntDesign, Foundation, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';
import styles from '../DetailDonationOnQueue/styles';
import { Address, DonationForm } from '../../../types';
import { DonateTabParamList } from '../../../navigation/DonorStack/Donate/types';
import { BottomTabParamList } from '../../../navigation/MainNavBar/types';
import { updateDonation, deleteDonation } from '../../../redux/reducers/donationQueue';
import { TemplateNavParamList } from '../../NavTypes';
import { GeneralModal } from '../../../components';

type ParamList = {
  DetailDonationOnQueue: {
    donationForm: DonationForm
  }
}

// type DonationScreenProp = CompositeNavigationProp<
//   StackNavigationProp<DonateTabParamList, 'DonateHomeScreen'>,
//   BottomTabNavigationProp<BottomTabParamList, 'Home'>
//   >;

type DonationScreenProp = CompositeNavigationProp<
  StackNavigationProp<TemplateNavParamList, 'DonationQueue'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
  >;

/**
 * Admin view of donation details. Can view Restaurant Name, Deliverary Details, Pickup Details, Meal List, and Contact
 * info.
 *
 * IMPORTANT NOTES:
 * This screen is a WIP in context of the whole app. Fields such as Delivery details, Meal list, total donation cost and
 * Contact info have conditional renders if the data is populated in DonationForm but atm have placeholder dashes ("---").
 *
 * KNOWN BUGS:
 *  N/A
 *
 * @returns {TSX.Element}
 */

function DetailDonationOnQueue() {
  const route = useRoute<RouteProp<ParamList, 'DetailDonationOnQueue'>>();
  const { donationForm } = route.params;

  const dispatch = useDispatch();
  const navigation = useNavigation<DonationScreenProp>();

  let buildingNumberStr = '';
  if (typeof donationForm.pickupAddress.buildingNumber !== 'undefined') {
    buildingNumberStr = `#${donationForm.pickupAddress.buildingNumber}`;
  }
  let dropoffBuildingNumberStr = '';
  if (donationForm.dropOffAddress && typeof donationForm.dropOffAddress.buildingNumber !== 'undefined') {
    dropoffBuildingNumberStr = `#${donationForm.dropOffAddress.buildingNumber}`;
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

  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const donationDish = [];
  let donationTotalCost:any;
  for (let i = 0; i < donationForm.donationDishes.length; i += 1) {
    donationDish.push(
      <View key={donationForm.donationDishes[i].dishID}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>{donationForm.donationDishes[i].dishName}</Text>
          <Text>{donationForm.donationDishes[i].cost}</Text>
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
          <Text style={{ fontSize: 21, fontWeight: '500', marginBottom: 24 }}>
            Status: <Text style={{ fontSize: 21, marginVertical: 24 }}>{donationForm.status}</Text>
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Pressable
              style={{
                marginRight: 5,
                flex: 4,
                height: 52,
                borderRadius: 4,
                borderColor: '#F33636',
                borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F33636'
              }}
              onPress={() => console.log('pending more like never ending')}
            >
              <Text style={{ fontSize: 17, color: '#FFFFFF', fontWeight: 'bold' }}>Accept</Text>
            </Pressable>
            <Pressable
              style={{
                marginLeft: 5,
                flex: 4,
                height: 52,
                borderRadius: 4,
                borderColor: '#11B25B',
                borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                backgroundColor: '#11B25B'
              }}
              onPress={() => console.log('pending more like never ending')}
            >
              <Text style={{ fontSize: 17, color: '#FFFFFF', fontWeight: 'bold' }}>Deny</Text>
            </Pressable>
          </View>
        </View>
      );
    } else if (donationForm.status === 'Unclaim') {
      return (
        <View>
          <Text style={{ fontSize: 21, fontWeight: '500', marginBottom: 24 }}>
            Status: <Text style={{ fontSize: 21, marginVertical: 24, color: '#007FA7' }}>Unclaimed</Text>
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
              backgroundColor: '#007FA7',
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
          <Text style={{ fontSize: 21, fontWeight: '500', marginBottom: 24 }}>
            Status: <Text style={{ fontSize: 21, marginVertical: 24, color: '#00883F' }}>{donationForm.status}</Text>
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
        // Overdue
        <View>
          <Text style={{ fontSize: 21, fontWeight: '500', marginBottom: 24 }}>
            Status: <Text style={{ fontSize: 21, marginVertical: 24, color: '#E90000' }}>{donationForm.status}</Text>
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

  const getEditMenuView = () => (
    <MenuProvider style={{ flexDirection: 'column', overflow: 'visible' }}>
      {/* @ts-ignore Menu type defined in react-native-popup-menu library */}
      <Menu opened={editMenuOpen} style={{ alignSelf: 'flex-end' }}>
        <MenuTrigger>
          <Entypo name="dots-three-vertical" size={24} color="black" onPress={() => setEditMenuOpen(true)} />
        </MenuTrigger>

        <MenuOptions>
          {
            (donationForm.status === 'Claimed' || donationForm.status === 'Unclaim') && (
              <MenuOption onSelect={() => {
                const formdata = new FormData();
                // Mark the donation as overdue
                formdata.append('json', JSON.stringify({
                  status: 'Overdue'
                }));
                // Push this change to the backend
                axios.put(`/api/ongoingdonations/${donationForm._id}`, formdata)
                  .then((res) => {
                    // Push this change to the central frontend state
                    dispatch(updateDonation(res.data.donationform));
                    navigation.goBack();
                  })
                  .catch((error) => {
                    Alert.alert('There was a problem marking the donation as overdue.  Please try again');
                    console.error(error);
                  });
              }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 16, alignItems: 'center' }}>
                    <AntDesign name="warning" size={16} color="black" />
                  </View>
                  <Text> Set as overdue </Text>
                </View>
              </MenuOption>
            )
          }
          {
            donationForm.status === 'Claimed' && (
              <MenuOption onSelect={() => {
                const formdata = new FormData();
                // Mark the donation as unclaimed
                formdata.append('json', JSON.stringify({
                  status: 'Unclaim'
                }));
                // Update this in the backend
                axios.put(`/api/ongoingdonations/${donationForm._id}`, formdata)
                  .then((res) => {
                    // Update this in the frontend central state
                    dispatch(updateDonation(res.data.donationform));
                    // Update this in the local route state
                    navigation.setParams({
                      donationForm: res.data.donationform,
                    });
                  })
                  .catch((error) => {
                    Alert.alert('There was a problem marking the donation as unclaimed.  Please try again');
                    console.error(error);
                  });
              }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 16, alignItems: 'center' }}>
                    <Foundation name="trash" size={16} color="black" />
                  </View>
                  <Text> Remove volunteer </Text>
                </View>
              </MenuOption>
            )
          }
          {
            donationForm.status === 'Overdue' && (
              <MenuOption onSelect={() => {
                setDeleteModalOpen(true);
              }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 16, alignItems: 'center' }}>
                    <Foundation name="trash" size={16} color="black" />
                  </View>
                  <Text> Delete donation </Text>
                </View>
              </MenuOption>
            )
          }

          <MenuOption onSelect={() => {
            // @ts-ignore donationForm is the correct parameter for this route
            navigation.navigate('DropoffDetailsEditScreen', { donationForm });
          }}
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 16, alignItems: 'center' }}>
                <Ionicons name="pencil" size={16} color="black" />
              </View>
              <Text> Edit delivery details </Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </MenuProvider>
  );

  const deleteModalSubmit = (deleteButton:boolean, cancelButton: boolean) => {
    setDeleteModalOpen(false);
    if (deleteButton) {
      axios.delete(`/api/ongoingdonations/${donationForm._id}`)
        .then((res) => {
          // Update this in the frontend central state
          dispatch(deleteDonation(res.data.donationform));
          // Update this in the local route state
          navigation.goBack();
        })
        .catch((error) => {
          Alert.alert('There was a problem deleting the donation.  Please try again');
          console.error(error);
        });
    }
  }

  return (
    <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }} onTouchStart={() => setEditMenuOpen(false)}>
      <GeneralModal
        title="Delete donation"
        subtitle="Are you sure you want to permanently delete this donation? You will not be able to access this information again."
        visible={deleteModalOpen}
        closeModal={() => { setDeleteModalOpen(!deleteModalOpen); }}
        numButtons={2}
        buttonOneTitle="Delete Donation"
        buttonTwoTitle="Cancel"
        modalSubmit={deleteModalSubmit}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1, width: '100%', justifyContent: 'space-around' }}>
        <View style={styles.container}>
          <View style={{ width: '100%', justifyContent: 'space-between', marginBottom: 20 }}>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 28 }}>
              <View style={{ width: '50%', marginBottom: 24 }}>
                <Text style={[styles.title, { marginBottom: 8 }]}>{donationForm.businessName}</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000000' }}>{formattedDate}</Text>
              </View>
              <View style={{ width: '50%', marginTop: 6 }}>
                { donationForm.status !== 'Pending' && getEditMenuView() }
              </View>
            </View>

            {status()}
            <View style={{ marginTop: 30 }}>
              <Text style={styles.subHeader}>Delivery details</Text>
              <Text style={styles.detailsHeader}>Address</Text>
              <Text style={styles.details}>{donationForm.dropOffAddress ? `${donationForm.dropOffAddress.streetAddress} ${dropoffBuildingNumberStr}\n${
                donationForm.dropOffAddress.city} ${donationForm.dropOffAddress.state} ${donationForm.dropOffAddress.zipCode}` : '---'}
              </Text>
              <Text style={styles.detailsHeader}>Dropoff Instructions</Text>
              <Text style={styles.details}>{donationForm.dropOffInstructions ?? '---'}</Text>

            </View>
            <Text style={{ width: '100%', borderTopColor: '#5D5D5D', borderTopWidth: 1, marginTop: 20, marginBottom: 7 }} />

            <Text style={styles.subHeader}>Pickup details</Text>
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
                <View style={styles.spacedContainer}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Total Cost of Donation</Text>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>$ {donationTotalCost}</Text>
                </View>
              )}
              <View style={{ width: '100%', borderTopColor: 'rgba(93, 93, 93, 1)', borderTopWidth: 1, marginTop: 8, marginBottom: 20 }} />
              <Text style={styles.subHeader}>Contact Info</Text>
              <Text style={styles.detailsHeader}>Name</Text>
              <Text style={styles.details}>{donationForm.name ? donationForm.name : '---'}</Text>
              <Text style={styles.detailsHeader}>Phone Number</Text>
              <Text style={styles.details}>{donationForm.phoneNumber ? donationForm.phoneNumber : '---'}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default DetailDonationOnQueue;
