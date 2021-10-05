import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { AntDesign } from '@expo/vector-icons';
import LogoutButton from '../../components/Auth/LogoutButton';

import { HomeScreenParamList } from '../../navigation/SharedStack/Home/types';
import { BottomTabParamList } from '../../navigation/MainNavBar/types';

type HomeScreenProp = CompositeNavigationProp<
  StackNavigationProp<HomeScreenParamList, 'Home'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;

function HomeScreen() {
  const navigation = useNavigation<HomeScreenProp>();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <LogoutButton />
      </View>
      <View style={styles.donationHeader}>
        <Text style={styles.standardText}>Current Ongoing Donation</Text>
      </View>
      <View style={styles.donationContainer}>
        <Text style={{ fontSize: 14, color: 'rgba(252, 136, 52, 1)', marginVertical: 15, marginHorizontal: 12 }}>Date</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('AllDonations'); // needs to be changed to detaildonation screen
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 15, marginHorizontal: 12 }}>
            <Text style={{ fontSize: 12, color: 'rgba(75, 120, 203, 1)' }}>View</Text>
            <AntDesign name="right" size={18} color="rgba(75, 120, 203, 1)" />
          </View>
        </Pressable>
      </View>
      <View style={styles.boxesContainer}>
        <Pressable
          style={styles.boxes}
          onPress={() => {
            navigation.navigate('MyDishes');
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
        <Text style={[styles.standardText, { marginBottom: 10 }]}>Umi Feeds</Text>
        <Text style={{ fontSize: 12, color: 'rgba(62, 62, 62, 1)' }}>Contact</Text>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'Roboto-Regular',
  },
  standardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(62, 62, 62, 1)',
  },
  topContainer: {
    width: 315,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 59,
    marginBottom: 51,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgba(252, 136, 52, 1)',
  },
  donationHeader: {
    width: 315,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 30
  },
  donationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 315,
    height: 75,
    borderWidth: 2,
    borderColor: 'rgba(252, 136, 52, 1)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: 30,
    marginTop: 18,
    marginBottom: 47
  },
  boxesContainer: {
    width: 315,
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
    backgroundColor: 'rgba(225, 235, 247, 1)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  contact: {
    width: 315,
    marginHorizontal: 30,
    marginBottom: 142,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
