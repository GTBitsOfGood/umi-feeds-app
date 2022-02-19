import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Header } from '../../../components';

import { moderateScale, verticalScale, scale } from '../../../util';
import { DonationForm, Address } from '../../../types';

/**
 * Screen for any donations the Admin has claimed. If the Admin has not claimed any dishes, an icon will be displayed
 * and a message that there are no donations.
 *
 * IMPORTANT NOTES:
 *  - To test the screen, you can add dummy data to the myDonations array in the state or pass in an empty array.
 *
 * KNOWN BUGS:
 *  N/A
 *
 * @returns {TSX.Element}
 */

const MyDonationScreen = () => {
  const dummyAddress: Address = {
    streetAddress: 'North Ave NW',
    buildingNumber: 0,
    city: 'Atlanta',
    state: 'GA',
    zipCode: 30332,
    longitude: 10,
    latitude: 100,
  };
  const claimedItem1: DonationForm = {
    _id: '1',
    businessName: 'Food Terminal',
    ongoing: true,
    status: 'Claimed',
    imageLink: '',
    donationDishes: [],
    pickupAddress: dummyAddress,
    pickupInstructions: 'whateve',
    pickupStartTime: Number(new Date()),
    pickupEndTime: Number(new Date('February 20, 2022 03:24:00')),
    lockedByVolunteer: false
  };

  const claimedItem2: DonationForm = {
    _id: '3',
    businessName: 'Test Restauraunt',
    ongoing: true,
    status: 'Claimed',
    imageLink: '',
    donationDishes: [],
    pickupAddress: dummyAddress,
    pickupInstructions: 'whateve',
    pickupStartTime: Number(new Date()),
    pickupEndTime: Number(new Date('February 20, 2022 03:24:00')),
    lockedByVolunteer: false
  };

  const myDonations: DonationForm[] = [claimedItem1, claimedItem2];
  const display = () => {
    if (myDonations.length === 0) {
      return (
        <View style={styles.noDonations}>
          <MaterialCommunityIcons name="hand-heart" size={100} color="#B8B8B8" />
          <Text style={styles.emptyText}>You do not have any claimed donations</Text>
        </View>
      );
    } else {
      return (
        <View style={{ marginBottom: 50 }}>
          {myDonations.map(
            (item: DonationForm) => <Row key={item._id} donationForm={item} />
          )}
        </View>
      );
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingTop: moderateScale(20) }}>
        <Header title="My Donations" showCartButton={false} />
      </View>
      <View style={styles.tableTitle}>
        <View style={styles.tableH1}>
          <Text style={{ fontSize: verticalScale(12), fontWeight: 'bold', color: '#202020' }}>
            Claimed by me
          </Text>
        </View>
      </View>
      {display()}
    </ScrollView>
  );
};

type RowInfo = {
    donationForm: DonationForm;
}

export default MyDonationScreen;

function Row({ donationForm }: RowInfo) {
  let { businessName } = donationForm;
  const currDate = new Date(donationForm.pickupEndTime);
  const endDate = currDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  // check if donationForm is undefined
  if (donationForm.businessName !== undefined && donationForm.businessName.length > 10) {
    businessName = `${donationForm.businessName.slice(0, 10)}...`;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
      }}
    >
      <View style={{
        flex: 8,
        flexDirection: 'row' }}
      >
        <Text style={{ fontSize: 15, width: '35%', fontStyle: 'italic' }}>{businessName}</Text>
        <Text style={{ fontSize: 15, width: '35%', fontStyle: 'italic' }}>{endDate}</Text>
        <Pressable style={{
          width: '18%',
          borderRadius: 4,
          borderColor: '#00883F',
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        }}
        >
          <Text style={{ fontSize: 11, color: '#00883F', fontWeight: 'bold' }}>Claimed</Text>
        </Pressable>
        <TouchableOpacity
          onPress={() => console.log('you pressed a donation')}
        >
          <EntypoIcon name="chevron-thin-right" size={15} style={{ color: '#5D5D5D', marginLeft: scale(25) }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    color: 'white',
    fontWeight: '700',
  },
  listNumber: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  tableTitle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableH1: {
    flex: 8,
    fontSize: 25,
  },
  noDonations: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: moderateScale(50),
  },
  emptyText: {
    paddingTop: moderateScale(20),
    color: '#B8B8B8',
    fontSize: moderateScale(21),
    width: '50%',
    textAlign: 'center'
  }
});
