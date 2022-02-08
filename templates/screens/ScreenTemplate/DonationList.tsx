/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { ButtonGroup } from 'react-native-elements/dist/buttons/ButtonGroup';

import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DonateTabParamList } from '../../../navigation/DonorStack/Donate/types';
import { BottomTabParamList } from '../../../navigation/MainNavBar/types';

import MonthYearPicker from '../../../components/DateTimePicker/MonthYearPicker';
import { ChevronButton, Header } from '../../../components';

import { moderateScale, verticalScale, scale } from '../../../util';
import { DonationForm, Address } from '../../../types';

type DonationScreenProp = CompositeNavigationProp<
  StackNavigationProp<DonateTabParamList, 'DonateHomeScreen'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;
/**
 * Admin view of donation list screen. Currently contains dummy date to see what pending and approved ongoing donations
 * should look like when the app is live. Can choose to view ongoing or completed donations.
 *
 * Completed donations should be filtered by month and year since there are many donations. The completed screen will
 * initially be empty until the user chooses a month and year.
 *
 * IMPORTANT NOTES:
 *  - The date picker includes month, date, and year but the user should not worry about the date when choosing a month.
 *  - Need to add logic to filter the completed donations by month and year.
 *
 * KNOWN BUGS:
 *  N/A
 *
 * @returns {TSX.Element}
 */
const DonationListScreen = () => {
  // get current month - not number but actual word
  const navigation = useNavigation<DonationScreenProp>();
  const [filterDate, setFilterDate] = React.useState(new Date());

  // TODO: get ongoing and completed arrays from the list of donations in authState

  // create dummy DonationForm
  const dummyAddress: Address = {
    streetAddress: 'North Ave NW',
    buildingNumber: 0,
    city: 'Atlanta',
    state: 'GA',
    zipCode: 30332,
    longitude: 10,
    latitude: 100,
  };

  const pendingItem: DonationForm = {
    _id: '1',
    businessName: 'Food Terminal',
    ongoing: true,
    status: 'Pending',
    imageLink: '',
    donationDishes: [],
    pickupAddress: dummyAddress,
    pickupInstructions: 'whateve',
    pickupStartTime: Number(new Date()),
    pickupEndTime: Number(new Date()),
    lockedByVolunteer: false
  };

  const unclaimedItem: DonationForm = {
    _id: '2',
    businessName: 'John Doe',
    ongoing: true,
    status: 'Unclaimed',
    imageLink: '',
    donationDishes: [],
    pickupAddress: dummyAddress,
    pickupInstructions: 'whateve',
    pickupStartTime: Number(new Date()),
    pickupEndTime: Number(new Date()),
    lockedByVolunteer: false
  };

  const claimedItem: DonationForm = {
    _id: '3',
    businessName: 'Test Restauraunt',
    ongoing: true,
    status: 'Claimed',
    imageLink: '',
    donationDishes: [],
    pickupAddress: dummyAddress,
    pickupInstructions: 'whateve',
    pickupStartTime: Number(new Date()),
    pickupEndTime: Number(new Date()),
    lockedByVolunteer: false
  };

  const deliveredItem: DonationForm = {
    _id: '4',
    businessName: 'Test Restauraunt',
    ongoing: true,
    status: 'Delivered',
    imageLink: '',
    donationDishes: [],
    pickupAddress: dummyAddress,
    pickupInstructions: 'whateve',
    pickupStartTime: Number(new Date()),
    pickupEndTime: Number(new Date()),
    lockedByVolunteer: false
  };

  const ongoing = [
    pendingItem,
    unclaimedItem,
    claimedItem
  ];

  // create a donationForm object
  const completed: DonationForm[] = [deliveredItem];

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  // extract all pickupEndTimeDate from completed, no repeats. e.g. February 2022

  const [completedDates, setCompletedDates] = React.useState<string[]>([]);

  const setMonth = (currDate: Date) => {
    console.log('set the filtered month here');
  };

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const selectedView = () => {
    if (selectedIndex === 1) {
      return (
        <View>
          <MonthYearPicker
            datetime={filterDate}
            setDatetime={setFilterDate}
            filterHandler={setMonth}
          />
          <Text style={{ fontSize: scale(5) }}>Do not worry about the date when selecting a month and year</Text>
          {// replace with actual filter logic
          completedDates.map((date) => (
            <View>
              <Subsection key={Number(new Date(date))} dataDate={date} />
              <ScrollView>
                {completed.filter((item: DonationForm) => {
                  const completedDate = `${monthNames[new Date(item.pickupEndTime).getMonth()]} ${new Date(item.pickupEndTime).getFullYear()}`;
                  return completedDate === date;
                }).map((item: DonationForm) => <Row key={item._id} donationForm={item} />)}
              </ScrollView>
            </View>
          ))}

        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.tableTitle}>
            <View style={styles.tableH1}>
              <Text style={{ fontSize: verticalScale(12), fontWeight: 'bold', color: '#202020' }}>
                Pending Donations
              </Text>
            </View>
          </View>
          <ScrollView>
            {ongoing.filter((item: DonationForm) => item.status === 'Pending').map(
              (item: DonationForm) => <Row key={item._id} donationForm={item} />
            )}
          </ScrollView>
          <View style={styles.tableTitle}>
            <View style={styles.tableH1}>
              <Text style={{ fontSize: verticalScale(12), fontWeight: 'bold', color: '#202020' }}>
                Approved Donations
              </Text>
            </View>
          </View>
          <ScrollView>
            {ongoing.filter((item: DonationForm) => item.status !== 'Pending').map(
              (item: DonationForm) => <Row key={item._id} donationForm={item} />
            )}
          </ScrollView>
        </View>
      );
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View style={{ marginTop: moderateScale(25), marginLeft: 15 }}>
          <ChevronButton text="Home" onPress={() => navigation.navigate('Home')} />
        </View>
        <Header title="Donation List" showCartButton={false} />
        <View>
          <ButtonGroup
            buttons={['Ongoing', 'Completed']}
            selectedIndex={selectedIndex}
            onPress={(value) => {
              setSelectedIndex(value); // 0 index for completed, 1 index for Ongoing
            }}
            textStyle={{ fontSize: verticalScale(17), fontWeight: '700', color: '#5D5D5D' }}
            selectedButtonStyle={{ backgroundColor: '#F37B36', borderColor: '#F37B36' }}
            selectedTextStyle={{ color: 'white', fontWeight: '700' }}
            containerStyle={{ borderColor: '#F37B36', borderWidth: 1, borderRadius: 5, backgroundColor: 'transparent' }}
          />
        </View>
        {selectedView()}
      </View>
    </Provider>
  );
};

type TableSubsection = {
  dataDate: string;
}

type RowInfo = {
    donationForm: DonationForm
}

export default DonationListScreen;

function Subsection({ dataDate }: TableSubsection) {
  return (
    <View style={styles.tableTitle}>
      <View style={styles.tableH1}>
        <Text style={{ fontSize: verticalScale(12), fontWeight: 'bold', color: '#202020' }}>{dataDate}</Text>
      </View>
    </View>
  );
}

function Row({ donationForm }: RowInfo) {
  let { businessName } = donationForm;
  const currDate = new Date(donationForm.pickupEndTime);
  const endDate = currDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  const statusLabel = () => {
    if (donationForm.status === 'Pending') {
      return (
        <Pressable style={{
          width: '18%',
          borderRadius: 4,
          borderColor: '#5D5D5D',
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        }}
        >
          <Text style={{ fontSize: 12, color: '#5D5D5D', fontWeight: 'bold' }}>Pending</Text>
        </Pressable>
      );
    } else if (donationForm.status === 'Unclaimed') {
      return (
        <Pressable style={{
          width: '18%',
          borderRadius: 4,
          borderColor: '#007FA7',
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        }}
        >
          <Text style={{ fontSize: 12, color: '#007FA7', fontWeight: 'bold' }}>Unclaimed</Text>
        </Pressable>
      );
    } else if (donationForm.status === 'Claimed') {
      return (
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
          <Text style={{ fontSize: 12, color: '#00883F', fontWeight: 'bold' }}>Claimed</Text>
        </Pressable>
      );
    } else {
      return (
        <Pressable style={{
          width: '18%',
          borderRadius: 4,
          borderColor: '#00883F',
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00883F'
        }}
        >
          <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: 'bold' }}>Delivered</Text>
        </Pressable>
      );
    }
  };

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
        {statusLabel()}
        <TouchableOpacity
          onPress={() => console.log('you pressed a donation')}
        >
          <Icon name="chevron-thin-right" size={15} style={{ color: '#5D5D5D', marginLeft: scale(25) }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  title2: {
    fontSize: 25,
    color: '#F37B36',
  },
  title3: {
    fontSize: 15,
    paddingTop: 10,
    color: '#F37B36',
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
  tableH2: {
    flex: 2,
  },
  ongoingComplete: {
    position: 'relative',
    top: -25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  buttonStyle: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 50,
    borderRadius: 4,
    borderColor: '#F37B36',
    backgroundColor: '#F37B36',
  },
  disabledSelectedTextStyle: {
    color: '#5D5D5D'
  },
  monthOption: {
    marginTop: verticalScale(20),
    borderColor: '#5D5D5D',
    borderRadius: 2,
    borderWidth: 1,
    height: moderateScale(20),
    width: moderateScale(95),
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  monthOptionText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: moderateScale(11),
    fontWeight: '500',
    color: '#5D5D5D',
  }
});
