import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Linking
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { Header, DonationQueueRow } from '../../components';
import { moderateScale, verticalScale, scale } from '../../util';
import Logo from '../../assets/images/umi-feeds-logo.svg';
import { DonationForm } from '../../types';
import { MyDonationParamList } from '../../navigation/AdminStack/MyDonations/types';

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
type MyDonationProp = StackNavigationProp<MyDonationParamList, 'MyDonations'>

const MyDonationScreen = () => {
  const navigation = useNavigation<MyDonationProp>();
  const authState = useSelector((state: RootState) => state.auth);
  const myDonations = useSelector(
    (state: RootState) => state.donationQueueReducer.donationQueue.filter((item) => item.ongoing && (item.businessName === authState.businessName))
  );

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
            (item: DonationForm) => <DonationQueueRow key={item._id} donationForm={item} navigation={navigation} />
          )}
        </View>
      );
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View>
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
      <View style={styles.contact}>
        <View>
          <Text style={[styles.standardText, { marginBottom: 10 }]}>Umi Feeds contact
          </Text>
          <Text style={styles.field}>
            Phone
          </Text>
          <Text onPress={() => {
            Linking.openURL('tel:6787185864');
          }}
          >
            678-718-5864
          </Text>
          <Text style={styles.field}>
            Email
          </Text>
          <Text onPress={() => {
            Linking.openURL('mailto:umi@umifeeds.org');
          }}
          >
            umi@umifeeds.org
          </Text>
        </View>
        <Logo style={{
          flexShrink: 1
        }}
        />
      </View>
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
  },
  contact: {
    marginHorizontal: 30,
    marginVertical: '40%',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  field: {
    fontWeight: '700',
    color: 'gray',
    fontSize: 11,
    marginVertical: 5
  },
  standardText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'rgba(62, 62, 62, 1)',
  }
});
