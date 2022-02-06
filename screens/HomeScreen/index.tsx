import { View, Text, StyleSheet, Pressable, ScrollView, Linking, RefreshControl } from 'react-native';
import React, { useState } from 'react';

import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { Donation, DonationForm } from '../../types';
import { Header } from '../../components';
import Logo from '../../assets/images/umi-feeds-logo.svg';

import { HomeScreenParamList } from '../../navigation/SharedStack/Home/types';
import { BottomTabParamList } from '../../navigation/MainNavBar/types';

import { RootState } from '../../redux/rootReducer';
import { moderateScale } from '../../util/index';
import { store } from '../../redux/store';
import { logAxiosError } from '../../utils';
import { setLoading } from '../../redux/reducers/loadingReducer';

type HomeScreenProp = CompositeNavigationProp<
  StackNavigationProp<HomeScreenParamList, 'Home'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;

function HomeScreen() {
  const userDonations = useSelector((state: RootState) => state.auth.donations);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<HomeScreenProp>();
  const authState = useSelector((state: RootState) => state.auth);
  let counter = 0;

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between'
      }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.topContainer}>
        <Header title="Welcome Back" showCartButton={false} />
      </View>
      <View style={styles.donationHeader}>
        <Text style={styles.standardText}>Current donation</Text>
      </View>
      {
        userDonations.map((donations: DonationForm) => {
          if (donations.ongoing) {
            return (
              <View style={styles.donationContainer} key={donations._id}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 14, color: 'rgba(252, 136, 52, 1)', marginTop: 15, marginHorizontal: 12, fontWeight: '800' }}>Date {new Date(donations.pickupStartTime).toLocaleDateString('en-US')}</Text>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('AllDonations'); // needs to be changed to detaildonation screen
                    }}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 15, marginHorizontal: 12 }}>
                      <Text style={{ fontSize: 12 }}>View</Text>
                      <AntDesign name="right" size={16} />
                    </View>
                  </Pressable>
                </View>
                <View style={{ flex: 0.66, marginHorizontal: 12, flexDirection: 'row' }}>
                  <Text style={{ fontWeight: '800' }}>Status: </Text><Text>{donations.status}</Text>
                </View>
              </View>
            );
          } else {
            // eslint-disable-next-line no-plusplus
            counter++;
            if (counter === userDonations.length) {
              return (
                <View style={styles.donationHeader}>
                  <Text>You currently have no ongoing donations.</Text>
                </View>
              );
            } else {
              return null;
            }
          }
        })
      }
      <View style={styles.boxesContainer}>
        <Pressable
          style={styles.boxes}
          onPress={() => {
            navigation.navigate('Donate');
          }}
        >
          <Text style={styles.standardText}>My Dishes</Text>
        </Pressable>
        <Pressable
          style={styles.boxes}
          onPress={() => {
            navigation.navigate('AllDonations');
          }}
        >
          <Text style={styles.standardText}>All Donations</Text>
        </Pressable>
      </View>
      <View style={styles.contact}>
        <View style={{
          // flex: 1
        }}
        >
          <Text style={[styles.standardText, { marginBottom: 10 }]}>Umi Feeds contact</Text>
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
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  standardText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'rgba(62, 62, 62, 1)',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(20),
    marginBottom: moderateScale(0),
    marginHorizontal: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgba(252, 136, 52, 1)',
  },
  donationHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 30
  },
  donationContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 75,
    borderWidth: 2,
    borderColor: 'rgba(252, 136, 52, 1)',
    borderRadius: 10,
    marginHorizontal: 30,
    marginTop: 18,
    marginBottom: 15
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginBottom: 47,
  },
  boxes: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 138,
    height: 193,
    backgroundColor: 'rgba(255, 216, 196, 1)',
    borderRadius: 10
  },
  contact: {
    marginHorizontal: 30,
    marginBottom: 20,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  field: {
    fontWeight: '700',
    color: 'gray',
    fontSize: 11,
    marginVertical: 5
  }
});
