import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Text } from '../../style/Themed';
import { HomeScreenParamList } from '../../navigation/SharedStack/Home/types';
import { RootState } from '../../redux/rootReducer';
import { moderateScale } from '../../util/index';
import { DonationListBox } from '../../components';

import styles from './styles';
import { logAxiosError } from '../../utils';
import { setLoading } from '../../redux/reducers/loadingReducer';
import { Donation } from '../../types';
import { store } from '../../redux/store';

type HomeScreenProps = StackNavigationProp<HomeScreenParamList, 'Home'>

export default function AllDonations() {
  const navigation = useNavigation<HomeScreenProps>();
  const authState = useSelector((state: RootState) => state.auth);

  const [selectedList, setSelectedList] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  // const [donation, setDonations] = useState<Donation[]>([]);

  const setId = (id?: string) => {
    if (id) {
      setSelectedList(id);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios.get<{ donation: Donation[] }>(`/api/user/businessName/${authState.businessName}`, { headers: { Authorization: `Bearer ${store.getState().auth.jwt}` } })
      .then((res) => {
        // setDonations(res.data.donation);
        setRefreshing(false);
      })
      .catch((error) => logAxiosError(error))
      .finally(() => setLoading({ loading: false }));
  }, [authState]);

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
            authState.donations.map((donation) => {
              if (donation.ongoing) {
                return (
                  <DonationListBox
                    key={donation._id}
                    donation={donation}
                    selectedId={selectedList}
                    navigation={navigation}
                    setSelectedList={setId}
                  />
                );
              } else {
                return null;
              }
            })
          }
          <Text style={styles.subtitle}>Past Donations</Text>
          {
            authState.donations.map((donation) => {
              if (!donation.ongoing) {
                return (
                  <DonationListBox
                    key={donation._id}
                    donation={donation}
                    selectedId={selectedList}
                    setSelectedList={setId}
                    navigation={navigation}
                  />
                );
              } else {
                return null;
              }
            })
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
