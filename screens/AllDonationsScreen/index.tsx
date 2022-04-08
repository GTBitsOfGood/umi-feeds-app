import React, { useState } from 'react';
import { Alert, ScrollView, View, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Text } from '../../style/Themed';
import { HomeScreenParamList } from '../../navigation/SharedStack/Home/types';
import { RootState } from '../../redux/rootReducer';
import { moderateScale } from '../../util/index';
import { DonationListBox } from '../../components';

import { store } from '../../redux/store';
import { refreshDonations } from '../../redux/reducers/authReducer';

import styles from './styles';

type HomeScreenProps = StackNavigationProp<HomeScreenParamList, 'Home'>

export default function AllDonations() {
  const navigation = useNavigation<HomeScreenProps>();
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [selectedList, setSelectedList] = useState('');
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const setId = (id?: string) => {
    if (id) {
      setSelectedList(id);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios.get(`/api/user/businessName/${authState.businessName}`, { headers: { Authorization: `Bearer ${store.getState().auth.jwt}` } })
      .then((res) => {
        if (res.status === 200 && res.data !== null && res.data !== undefined && res.data.user !== null) {
          const { user } = res.data; // res.data.user is of type User
          return dispatch(refreshDonations(user.donations));
        } else {
          return Alert.alert('Authentication error!');
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setRefreshing(false));
  }, []);

  const ongoingDonations = ():JSX.Element[] | JSX.Element => {
    let count = 0;
    const returnDonations: JSX.Element[] = [];
    authState.donations.forEach((donation) => {
      if (donation.ongoing) {
        count += 1;
        returnDonations.push(
          <DonationListBox
            key={donation._id}
            donation={donation}
            selectedId={selectedList}
            navigation={navigation}
            setSelectedList={setId}
          />
        );
      }
    });
    if (authState.donations.length === 0 || count === 0) {
      return <Text>No Ongoing Donations</Text>;
    }
    return returnDonations;
  };

  const pendingDonations = ():JSX.Element[] | JSX.Element => {
    let count = 0;
    const returnDonations: JSX.Element[] = [];
    authState.donations.forEach((donation) => {
      if (!donation.ongoing) {
        count += 1;
        returnDonations.push(
          <DonationListBox
            key={donation._id}
            donation={donation}
            selectedId={selectedList}
            navigation={navigation}
            setSelectedList={setId}
          />
        );
      }
    });
    if (authState.donations.length === 0 || count === 0) {
      return <Text>No Ongoing Donations</Text>;
    }
    return returnDonations;
  };

  return (
    <View style={mainStyles.container}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <Text style={styles.title}>My Donations</Text>
          <Text style={styles.subtitle}>Ongoing Donations</Text>
          {
            ongoingDonations()
          }
          <Text style={styles.subtitle}>Past Donations</Text>
          {
            pendingDonations()
          }
        </ScrollView>
      </View>
    </View>
  );
}

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
