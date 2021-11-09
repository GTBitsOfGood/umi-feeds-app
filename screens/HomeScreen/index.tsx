import { View, Text, StyleSheet, Pressable, ScrollView, Linking } from 'react-native';
import React, { useState } from 'react';

import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';

import { AntDesign } from '@expo/vector-icons';
import LogoutButton from '../../components/Auth/LogoutButton';
import DonateQuantityModal from '../../components/DonateQuantityModal';
import { Dish, DonationDishes } from '../../types';
import { GeneralModal, Header } from '../../components';
import Logo from '../../assets/images/umi-feeds-logo.svg';

import { HomeScreenParamList } from '../../navigation/SharedStack/Home/types';
import { BottomTabParamList } from '../../navigation/MainNavBar/types';

import { RootState } from '../../redux/rootReducer';
import { moderateScale } from '../../util/index';

// Test Dish Object to render Modal
const MockDishObj: Dish = {
  _id: '894yr34fbu3bf3', // the unqiue id assigned to a dish. Let Mongo create this when you insert a document without any _id attribute
  dishName: 'Fried Donit',
  cost: 90.00,
  pounds: 78,
  allergens: ['fish', 'nuts'],
  imageLink: 'www.google.com', // link to azure image
  comments: '',
  favorite: false,
};

type HomeScreenProp = CompositeNavigationProp<
  StackNavigationProp<HomeScreenParamList, 'Home'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;

function HomeScreen() {
  const donationCartState = useSelector((state: RootState) => state.donationCart);
  const navigation = useNavigation<HomeScreenProp>();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between'
      }}
    >
      <View style={styles.topContainer}>
        <Header title="Welcome Back" showCartButton={false} />
        <LogoutButton />
      </View>
      {donationCartState.ongoing ? (
        <>
          <View style={styles.donationHeader}>
            <Text style={styles.standardText}>Current donation</Text>
          </View>
          <View style={styles.donationContainer}>
            <Text style={{ fontSize: 14, color: 'rgba(252, 136, 52, 1)', marginVertical: 15, marginHorizontal: 12 }}>Date</Text>
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
        </>
      ) : (
        <View style={styles.donationHeader}>
          <Text>You currently have no ongoing donations.</Text>
        </View>
      )
      }
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
            // navigation.navigate('AllDonations');
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
    backgroundColor: 'white',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 75,
    borderWidth: 2,
    borderColor: 'rgba(252, 136, 52, 1)',
    borderRadius: 10,
    marginHorizontal: 30,
    marginTop: 18,
    marginBottom: 47
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
    marginBottom: 2
  }
});
