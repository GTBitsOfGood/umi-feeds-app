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
import { SearchBar } from 'react-native-elements';

import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DonateTabParamList } from '../../../navigation/DonorStack/Donate/types';
import { BottomTabParamList } from '../../../navigation/MainNavBar/types';

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
  // const navigation = useNavigation<DonationScreenProp>();
  // const [filterDate, setFilterDate] = React.useState(new Date());
  const [overdueView, setOverdueView] = React.useState(false);

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
    businessName: 'Fod Terminal',
    ongoing: true,
    status: 'Pending',
    imageLink: '',
    donationDishes: [],
    pickupAddress: dummyAddress,
    pickupInstructions: 'whateve',
    pickupStartTime: Number(new Date()),
    pickupEndTime: Number(new Date('February 20, 2022 03:24:00')),
    lockedByVolunteer: false
  };

  const unclaimedItem: DonationForm = {
    _id: '2',
    businessName: 'John Doe',
    ongoing: true,
    status: 'Overdue',
    imageLink: '',
    donationDishes: [],
    pickupAddress: dummyAddress,
    pickupInstructions: 'whatever',
    pickupStartTime: Number(new Date()),
    pickupEndTime: Number(new Date('February 11, 2022 03:24:00')),
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
    status: 'Pending',
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

  const overdue = [
    pendingItem,
    unclaimedItem,
    claimedItem
  ].filter((item) => item.status === 'Overdue');

  // create a donationForm object
  const completed: DonationForm[] = [deliveredItem];

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  // extract all pickupEndTimeDate from completed, no repeats. e.g. February 2022

  const [completedDates, setCompletedDates] = React.useState<string[]>([]);

  // const setMonth = (currDate: Date) => {
  //   console.log('set the filtered month here');
  // };

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [dateSearch, searchData] = React.useState<string>('');

  const selectedView = () => {
    if (selectedIndex === 1 && !overdueView) {
      return (
        <View>
          <View style={{ marginTop: moderateScale(25), marginLeft: 15 }}>
            <ChevronButton text="Home" onPress={() => console.log('Back Button')} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Header title="Donation List" showCartButton={false} />
            <Pressable
              style={{ marginLeft: scale(110), marginTop: moderateScale(25) }}
              onPress={() => setOverdueView(!overdueView)}
            >
              <Text style={{ fontSize: moderateScale(15), color: '#E90000', fontWeight: 'bold' }}> Overdue ({overdue.length})</Text>
            </Pressable>
          </View>
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
          <SearchBar
            placeholder="Month/Year"
            value={dateSearch}
            platform="ios"
            onChangeText={searchData}
            lightTheme
            showLoading
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
    } else if (selectedIndex === 0 && !overdueView) {
      return (
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Header title="Donation List" showCartButton={false} />
            <Pressable
              style={{ marginLeft: scale(110), marginTop: moderateScale(25) }}
              onPress={() => setOverdueView(!overdueView)}
            >
              <Text style={{ fontSize: moderateScale(15), color: '#E90000', fontWeight: 'bold' }}> Overdue ({overdue.length})</Text>
            </Pressable>
          </View>
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
          <View style={styles.tableTitle}>
            <View style={styles.tableH1}>
              <Text style={{ fontSize: verticalScale(12), fontWeight: 'bold', color: '#202020' }}>
                Pending Donations
              </Text>
            </View>
          </View>
          <View>
            {ongoing.filter((item: DonationForm) => item.status === 'Pending').map(
              (item: DonationForm) => <Row key={item._id} donationForm={item} />
            )}
          </View>
          <View style={styles.tableTitle}>
            <View style={styles.tableH1}>
              <Text style={{ fontSize: verticalScale(12), fontWeight: 'bold', color: '#202020' }}>
                Approved Donations
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 50 }}>
            {ongoing.filter((item: DonationForm) => item.status !== 'Pending' && item.status !== 'Overdue').map(
              (item: DonationForm) => <Row key={item._id} donationForm={item} />
            )}
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ marginTop: moderateScale(25), marginLeft: 15 }}>
          <ChevronButton
            text="Donation List"
            onPress={() => {
              setSelectedIndex(0);
              setOverdueView(false);
            }}
          />
          <View style={styles.tableTitle}>
            <View style={styles.tableH1}>
              <Text style={{ fontSize: verticalScale(12), fontWeight: 'bold', color: '#202020' }}>
                Overdue Donations
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 50 }}>
            {overdue.map(
              (item: DonationForm) => <Row key={item._id} donationForm={item} />
            )}
          </View>
        </View>

      );
    }
  };

  return (
    <Provider>
      <ScrollView style={styles.container}>
        {selectedView()}
      </ScrollView>
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
  const navigation = useNavigation<DonationScreenProp>();
  const currDate = new Date(donationForm.pickupEndTime);
  const endDate = currDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  const statusLabel = () => {
    if (donationForm.status === 'Overdue') {
      return (
        <Pressable style={{
          width: '18%',
          borderRadius: 4,
          borderColor: '#E90000',
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        }}
        >
          <Text style={{ fontSize: 11, color: '#E90000', fontWeight: 'bold' }}>Overdue</Text>
        </Pressable>
      );
    } else if (donationForm.status === 'Pending') {
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
          <Text style={{ fontSize: 11, color: '#5D5D5D', fontWeight: 'bold' }}>Pending</Text>
        </Pressable>
      );
    } else if (donationForm.status === 'Unclaim') {
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
          <Text style={{ fontSize: 10, color: '#007FA7', fontWeight: 'bold' }}>Unclaimed</Text>
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
          <Text style={{ fontSize: 11, color: '#00883F', fontWeight: 'bold' }}>Claimed</Text>
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
          <Text style={{ fontSize: 11, color: '#FFFFFF', fontWeight: 'bold' }}>Delivered</Text>
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
          // onPress={() => console.log('you pressed a donation')}
          onPress={() => navigation.navigate('DetailDonationOnQueue', {
            donationForm
          })}
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
    padding: 25,
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
