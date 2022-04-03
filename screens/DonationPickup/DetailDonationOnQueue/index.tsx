/* eslint-disable max-len */
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute, RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Entypo, AntDesign, Foundation, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { DonationForm } from '../../../types';
import { BottomTabParamList } from '../../../navigation/MainNavBar/DonorTabs/types';
import { updateDonation, deleteDonation, updateStatus, deleteDonationByID } from '../../../redux/reducers/donationQueue';
import { TemplateNavParamList } from '../../../templates/NavTypes';
import { GeneralModal } from '../../../components';
import { RootState } from '../../../redux/rootReducer';
import LoadingScreen from '../../LoadingScreen';
import { setLoading } from '../../../redux/reducers/loadingReducer';
import { navigationRef } from '../../../navigation/RootNavigation';
import { logAxiosError } from '../../../utils';

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
 *  If the dropdown menu is too long it won't show up entirely.  This is because it is bound by the size of the view it is
 *  placed within.  So far the lists only have 2-3 elements so it isn't a problem at the moment, but this should be considered
 *  in the future and perhaps checked at different screen sizes.
 *
 * @returns {TSX.Element}
 */

function DetailDonationOnQueue() {
  const route = useRoute<RouteProp<ParamList, 'DetailDonationOnQueue'>>();
  const dispatch = useDispatch();
  const { donationForm } = route.params;

  const loadingState = useSelector((state: RootState) => state.loading.loadingStatus);
  const authState = useSelector((state: RootState) => state.auth);

  const closeCompleteModal = () => setCompleteModalVisible(false);
  const [completeModalVisible, setCompleteModalVisible] = useState<boolean>(false);

  let buildingNumberStr = '';
  if (typeof donationForm.pickupAddress.buildingNumber !== 'undefined') {
    buildingNumberStr = `#${donationForm.pickupAddress.buildingNumber}`;
  }
  const navigation = useNavigation<DonationScreenProp>();

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

  // Styling and logic related to the Deny Confirmation Modal
  const [denyModalVisible, setDenyModalVisible] = React.useState<boolean>(false);
  const closeDenyModal = () => setDenyModalVisible(false);
  const handleModalSubmit = (denyPressed: boolean, cancelPressed: boolean) => {
    if (denyPressed) {
      dispatch(setLoading({ loading: true }));
      const formdata = new FormData();
      formdata.append('json', JSON.stringify({
        status: 'Denied',
        ongoing: false
      }));
      axios.put(`/api/ongoingdonations/${donationForm._id}`, formdata)
        .then((res) => {
          dispatch(updateStatus({ donationForm, status: 'Denied' }));
          navigation.goBack();
        })
        .catch((err) => {
          Alert.alert('Error denying this donation.', err.message);
        })
        .finally(() => {
          dispatch(setLoading({ loading: false }));
        });
    } else if (cancelPressed) {
      setDenyModalVisible(false);
    }
  };

  const donationDish = [];
  let donationTotalCost = 0;
  donationDish.push(
    <View key={-1}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: 'bold' }}>Dish Item</Text>
        <Text style={{ fontWeight: 'bold' }}>Qty</Text>
        <Text style={{ fontWeight: 'bold' }}>  Cost</Text>
      </View>
      <View style={{ width: '100%', borderTopColor: 'rgba(93, 93, 93, 1)', borderTopWidth: 1, marginVertical: 8 }} />
    </View>
  );
  for (let i = 0; i < donationForm.donationDishes.length; i += 1) {
    donationDish.push(
      <View key={donationForm.donationDishes[i].dishID}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>{donationForm.donationDishes[i].dishName}</Text>
          <Text>{donationForm.donationDishes[i].quantity}</Text>
          <Text>$ {donationForm.donationDishes[i].cost}</Text>
        </View>
        <View style={{ width: '100%', borderTopColor: '#E6E6E6', borderTopWidth: 1, marginVertical: 16 }} />
      </View>
    );
    donationTotalCost += (Number(donationForm.donationDishes[i].cost ?? 0) * Number(donationForm.donationDishes[i].quantity ?? 0));
  }

  const claimDonation = () => {
    dispatch(setLoading({ loading: true }));
    const formdata = new FormData();
    formdata.append('json', JSON.stringify({
      status: 'Claimed',
      lockedByVolunteer: true
    }));
    axios.put(`/api/ongoingdonations/${donationForm._id}`, formdata)
      .then((res) => {
        navigationRef.current?.setParams({ donationForm: res.data.donationform });
      })
      .catch((error) => {
        logAxiosError(error);
        Alert.alert('Cannot Update Donation', 'There was an error updating your donation status, please refresh and try again.');
      })
      .finally(() => {
        dispatch(setLoading({ loading: false }));
      });
  };

  const completeDonation = (completePressed: boolean, cancelPressed: boolean) => {
    if (completePressed) {
      dispatch(setLoading({ loading: true }));
      axios.delete(`/api/ongoingdonations/${donationForm._id}`)
        .then((res) => {
          if (donationForm._id) {
            dispatch(deleteDonationByID(donationForm._id));
          }
          // this will set the parameters for the current navigation screen but we'll simply just delete it from the queue
          // navigationRef.current?.setParams({ donationForm: res.data.donationform });
        })
        .catch((error) => {
          logAxiosError(error);
          Alert.alert('Cannot Update Donation', 'There was an error updating your donation status, please refresh and try again.');
        })
        .finally(() => {
          dispatch(setLoading({ loading: false }));
          navigationRef.current?.goBack();
        });
    }
  };

  const status = () => {
    if (donationForm.status === 'Pending') {
      return (
        <View>
          <Text style={{ fontSize: 21, fontWeight: '500', marginBottom: 24 }}>
            Status: <Text style={{ fontSize: 21, marginVertical: 24 }}>{donationForm.status}</Text>
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <GeneralModal
              title="Deny Donation"
              subtitle="Are you sure you want to deny this donation? It will be removed from the donation list."
              numButtons={2}
              buttonOneTitle="Deny"
              buttonTwoTitle="Cancel"
              visible={denyModalVisible}
              closeModal={closeDenyModal}
              modalSubmit={handleModalSubmit}
            />
            <Pressable
              style={{
                marginRight: 5,
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
              onPress={() => {
                navigation.navigate('AddressScreen', { donationForm });
              }}
            >
              <Text style={{ fontSize: 17, color: '#FFFFFF', fontWeight: 'bold' }}>Accept</Text>
            </Pressable>
            <Pressable
              style={{
                marginLeft: 5,
                flex: 4,
                height: 52,
                borderRadius: 4,
                borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F33636',
                borderColor: '#F33636'
              }}
              onPress={() => setDenyModalVisible(true)}
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
            onPress={claimDonation}
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
            onPress={() => {
              setCompleteModalVisible(!completeModalVisible);
            }}
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
                dispatch(setLoading({ loading: true }));
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
                  }).finally(() => {
                    dispatch(setLoading({ loading: false }));
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
                dispatch(setLoading({ loading: true }));
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
                  }).finally(() => {
                    dispatch(setLoading({ loading: false }));
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
      dispatch(setLoading({ loading: true }));
      axios.delete(`/api/ongoingdonations/${donationForm._id}`)
        .then((res) => {
          // Update this in the frontend central state
          dispatch(deleteDonation(res.data.donationForm));
          // Update this in the local route state
          navigation.goBack();
        })
        .catch((error) => {
          Alert.alert('There was a problem deleting the donation.  Please try again');
          console.error(error);
        }).finally(() => {
          dispatch(setLoading({ loading: false }));
        });
    }
  };

  return loadingState ? (
    <LoadingScreen />
  ) : (
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
      <GeneralModal
        title="Complete Donation"
        subtitle="Have you delivered this donation to the appropriate address?"
        numButtons={2}
        buttonOneTitle="Set as delivered"
        buttonTwoTitle="Cancel"
        visible={completeModalVisible}
        closeModal={closeCompleteModal}
        modalSubmit={completeDonation}
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
                { donationForm.status !== 'Pending' && getEditMenuView() && authState.isAdmin }
              </View>
            </View>

            {status()}
            <View style={{ marginTop: 30 }}>
              <Text style={styles.subHeader}>Delivery details</Text>
              <Text style={styles.detailsHeader}>Address</Text>
              <Text style={styles.details}>{donationForm.dropOffAddress ? `${donationForm.dropOffAddress.streetAddress}\n${
                donationForm.dropOffAddress.city} ${donationForm.dropOffAddress.state} ${donationForm.dropOffAddress.zipCode}` : '---'}
              </Text>
              <Text style={styles.detailsHeader}>Dropoff Instructions</Text>
              <Text style={styles.details}>{donationForm.dropOffInstructions ?? '---'}</Text>
            </View>
            <Text style={{ width: '100%', borderTopColor: '#5D5D5D', borderTopWidth: 1, marginTop: 20, marginBottom: 7 }} />

            <Text style={styles.subHeader}>Pickup details</Text>
            <Text style={styles.detailsHeader}>Address</Text>
            <Text style={styles.details}>
              {donationForm.pickupAddress.streetAddress}{'\n'}
              {donationForm.pickupAddress.city}, {donationForm.pickupAddress.state}, {donationForm.pickupAddress.zipCode}
            </Text>
            <Text style={styles.detailsHeader}>Scheduled time</Text>
            <Text style={styles.details}>
              Date: {formattedDate}{'\n'}
              Time: {formattedStartTime} - {formattedEndTime}
            </Text>
            <Text style={styles.detailsHeader}>Pickup instructions</Text>
            <Text style={styles.details}>{donationForm.pickupInstructions.trim().length === 0 ? 'None' : donationForm.pickupInstructions}</Text>
          </View>
          <View style={{ width: '100%', justifyContent: 'flex-start' }}>
            <View style={{ width: '100%', justifyContent: 'flex-start' }}>
              <View style={[styles.spacedContainer, { marginBottom: 20 }]}>
                <Text style={styles.subHeader}>Meal list</Text>
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
