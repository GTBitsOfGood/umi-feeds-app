/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable
} from 'react-native';
import { Provider } from 'react-native-paper';
import { useNavigation, CompositeNavigationProp, useIsFocused } from '@react-navigation/native';
import { ButtonGroup } from 'react-native-elements/dist/buttons/ButtonGroup';
import { SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import axios from 'axios';
import { BottomTabParamList } from '../../../navigation/MainNavBar/DonorTabs/types';

import { ChevronButton, Header, DonationQueueRow } from '../../../components';

import { moderateScale, verticalScale, scale } from '../../../util';
import { DonationForm } from '../../../types';

import { RootState } from '../../../redux/rootReducer';
import { loadDonations, searchDonations } from '../../../redux/reducers/donationQueue';
import { DonationQueueParamList } from '../../../navigation/AdminStack/DonationQueue/types';

type DonationScreenProp = CompositeNavigationProp<
  StackNavigationProp<DonationQueueParamList, 'DonationQueue'>,
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
  const navigation = useNavigation<DonationScreenProp>();
  const authState = useSelector((state: RootState) => state.auth);

  // get ongoing and completed arrays from the list of donations in database
  const dispatch = useDispatch();
  const donationQueue = useSelector((state: RootState) => state.donationQueueReducer.donationQueue);
  const donationSearch = useSelector((state: RootState) => state.donationQueueReducer.donationSearch);

  const [dateSearch, updateDateSearch] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // const [filterDate, setFilterDate] = React.useState(new Date());
  const [overdueView, setOverdueView] = React.useState(false);

  // will change every time user comes back to screen, causes screen to update data
  const isFocused = useIsFocused();

  // gets ongoing donations
  useEffect(() => {
    // USE THIS AS REFERENCE ONLY
    // const formdata = new FormData();
    // formdata.append('json', JSON.stringify({
    //   status: 'Unclaim'
    // }));
    // axios.put('/api/ongoingdonations/62185e29d8b2650022fadd1a', formdata)
    //   .then((res) => console.log(res))
    //   .catch((error) => console.error(error));
    axios.get('/api/ongoingdonations')
      .then((res) => {
        dispatch(loadDonations(res.data['Ongoing Donations']));
      })
      .catch((error) => console.error(error));
  }, [isFocused]); // this method is called whenever user navigates to screen

  // gets completed donations based on month/year filter
  useEffect(() => {
    if (isValidMonthYearDate(dateSearch)) {
      setIsLoading(true);
      const newDate = dateSearch.split('/');
      const dateURL = `/api/search/donations/${newDate[0]}/${newDate[1]}`;
      axios.get(dateURL)
        .then((res) => {
          dispatch(searchDonations(res.data.donations));
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }
  }, [dateSearch]); // this method is called whenever dateSearch is updated

  // ensures that date is in valid "month/year" format before query to backend
  const isValidMonthYearDate = (dateString: string) => {
    const newDate = dateString.split('/');
    if (newDate.length !== 0 && newDate.length <= 2) {
      if (parseInt(newDate[0], 10) > 0 && parseInt(newDate[0], 10) <= 31) {
        if (parseInt(newDate[1], 10) >= 1970 && parseInt(newDate[1], 10) <= new Date().getFullYear()) {
          return true;
        }
      }
    }
    return false;
  };

  const overdueDonations = useSelector(
    (state: RootState) => state.donationQueueReducer.donationQueue.filter((item: DonationForm) => item.status === 'Overdue')
  );

  // Display overdue donations
  const displayOverdue = () => {
    if (overdueDonations.length === 0) {
      return (
        <View style={styles.noDonations}>
          <Text style={styles.emptyText}>There are no overdue donations</Text>
        </View>
      );
    } else {
      return (
        <View style={{ marginBottom: 50 }}>
          {overdueDonations.map(
            (item: DonationForm) => <DonationQueueRow key={item._id} donationForm={item} navigation={navigation} />
          )}
        </View>
      );
    }
  };

  const selectedView = () => {
    if (selectedIndex === 1 && !overdueView) {
      return (
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: moderateScale(20), marginLeft: moderateScale(5) }}>
            <Header title="Donation List" showCartButton={false} />
            {authState.isAdmin ? (
              <Pressable
                style={{ marginLeft: '25%', marginTop: moderateScale(25) }}
                onPress={() => setOverdueView(!overdueView)}
              >
                <Text style={{ fontSize: moderateScale(15), color: '#E90000', fontWeight: 'bold' }}> Overdue ({donationQueue.filter((item: DonationForm) => item.status === 'Overdue').length})</Text>
              </Pressable>
            ) : null}
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
            onChangeText={updateDateSearch}
            lightTheme
            showLoading={isLoading}
          />
          <ScrollView>
            {donationSearch.map((item: DonationForm) => <DonationQueueRow key={item._id} donationForm={item} navigation={navigation} />)}
          </ScrollView>
        </View>
      );
    } else if (selectedIndex === 0 && !overdueView) {
      return (
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: moderateScale(20), marginLeft: moderateScale(5) }}>
            <Header title="Donation List" showCartButton={false} />
            {authState.isAdmin ? (
              <Pressable
                style={{ marginLeft: '25%', marginTop: moderateScale(25) }}
                onPress={() => setOverdueView(!overdueView)}
              >
                <Text style={{ fontSize: moderateScale(15), color: '#E90000', fontWeight: 'bold' }}> Overdue ({donationQueue.filter((item: DonationForm) => item.status === 'Overdue').length})</Text>
              </Pressable>
            ) : null}
          </View>
          <View>
            <ButtonGroup
              buttons={['Ongoing', 'Completed']}
              disabled={(() => {
                if (!authState.isAdmin) {
                  return [1];
                }
                return [];
              })()}
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
          {authState.isAdmin ? (
            <View>
              <View style={styles.tableTitle}>
                <View style={styles.tableH1}>
                  <Text style={{ fontSize: verticalScale(12), fontWeight: 'bold', color: '#202020' }}>
                    Pending Donations
                  </Text>
                </View>
              </View>
              <View>
                {donationQueue.filter((item: DonationForm) => item.status === 'Pending').map(
                  (item: DonationForm) => <DonationQueueRow key={item._id} donationForm={item} navigation={navigation} />
                )}
              </View>
            </View>
          ) : null}
          <View style={styles.tableTitle}>
            <View style={styles.tableH1}>
              <Text style={{ fontSize: verticalScale(12), fontWeight: 'bold', color: '#202020' }}>
                Approved Donations
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 50 }}>
            {donationQueue.filter((item: DonationForm) => item.status !== 'Pending' && item.status !== 'Overdue' && item.status !== 'Complete').map(
              (item: DonationForm) => <DonationQueueRow key={item._id} donationForm={item} navigation={navigation} />
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
          {displayOverdue()}
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

export default DonationListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
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
  },
  emptyText: {
    paddingTop: moderateScale(20),
    color: '#B8B8B8',
    fontSize: moderateScale(21),
    width: '50%',
    textAlign: 'center'
  },
  noDonations: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: moderateScale(50),
  },
});
