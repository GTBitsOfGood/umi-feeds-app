import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../DetailDonationOnQueue/styles';
import { RootState } from '../../../redux/rootReducer';
import { setLoading } from '../../../redux/reducers/loadingReducer';
import { updateStatus } from '../../../redux/reducers/donationQueue';
import GeneralModal from '../../../components/GeneralModal';

import { TemplateNavParamList } from '../../NavTypes';
import { DonationForm } from '../../../types';
import LoadingScreen from '../../../screens/LoadingScreen';

type ParamList = {
  DetailDonationOnQueue: {
    donationForm: DonationForm
  }
}

type DonationScreenProp = StackNavigationProp<TemplateNavParamList>;
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
  const dispatch = useDispatch();
  const { donationForm } = route.params;
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

  const loadingState = useSelector((state: RootState) => state.loading.loadingStatus);

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
          <Text style={{ fontSize: 21, fontWeight: '500', marginVertical: 24 }}>
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
                borderColor: '#F33636',
                borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F33636'
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
          <Text style={{ fontSize: 21, fontWeight: '500', marginVertical: 24 }}>
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
          <Text style={{ fontSize: 21, fontWeight: '500', marginVertical: 24 }}>
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
          <Text style={{ fontSize: 21, fontWeight: '500', marginVertical: 24 }}>
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

  return (
    loadingState ? (
      <LoadingScreen />
    ) : (
      <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, width: '100%', justifyContent: 'space-around' }}>
          <View style={styles.container}>
            <View style={{ width: '100%', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={[styles.title, { marginBottom: 8, marginTop: 28 }]}>{donationForm.businessName}</Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000000' }}>{formattedDate}</Text>

              {status()}
              <View style={{ marginTop: 30 }}>
                <Text style={styles.subHeader}>Delivery details</Text>
                <Text style={styles.detailsHeader}>Address</Text>
                <Text style={styles.details}>
                  {donationForm.dropOffAddress
                    ? (`${donationForm.dropOffAddress.streetAddress} \n${donationForm.dropOffAddress.city}, ${donationForm.dropOffAddress.state}, ${donationForm.dropOffAddress.zipCode}`) : '---'}
                </Text>
                <Text style={styles.detailsHeader}>Dropoff Instructions</Text>
                <Text style={styles.details}>
                  {
                    donationForm.dropOffInstructions ?? '---'
                  }
                </Text>

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
    )
  );
}

export default DetailDonationOnQueue;
