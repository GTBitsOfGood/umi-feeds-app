import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { DonationDishes } from '../../../types';
import { RootState } from '../../../redux/rootReducer';

import { DonateTabParamList } from '../../../navigation/DonorStack/Donate/types';
import { BottomTabParamList } from '../../../navigation/MainNavBar/types';

type ReviewCartScreenProp = CompositeNavigationProp<
  StackNavigationProp<DonateTabParamList, 'DonateHomeScreen'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;

function ReviewDonationCart() {
  const navigation = useNavigation<ReviewCartScreenProp>();

  const cartState = useSelector((state: RootState) => state.donationCart);
  const authState = useSelector((state: RootState) => state.auth);

  return (
    <View style={styles.container}>
      <View style={{ flex: 2, width: '100%', justifyContent: 'space-around', marginBottom: 20 }}>
        <Pressable onPress={() => navigation.goBack()} style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start' }}>
          <AntDesign name="left" size={21} color="rgba(243, 123, 54, 1)" />
          <Text style={{ fontSize: 15, color: 'rgba(243, 123, 54, 1)' }}>Schedule Pickup</Text>
        </Pressable>
        <View style={styles.topContainer}>
          <Text style={[styles.title, { marginBottom: 8 }]}>Review details</Text>
          <Text style={styles.standardText}>Confirm that your donation list is correct</Text>
        </View>
      </View>
      <View style={{ flex: 5, width: '100%', justifyContent: 'flex-start' }}>
        <View style={[styles.spacedContainer, { marginBottom: 20 }]}>
          <Text style={styles.subHeader}>Donation list</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('DonateListScreen');
            }}
          >
            <View style={{ justifyContent: 'center' }}>
              <MaterialCommunityIcons name="pencil" size={25.5} color="rgba(93, 93, 93, 1)" />
              <Text style={{ fontSize: 12, color: 'rgba(93, 93, 93, 1)', marginTop: 4 }}>Edit</Text>
            </View>
          </Pressable>
        </View>
        <View style={{ width: '100%', justifyContent: 'space-around' }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <View style={styles.spacedContainer}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Dish item</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Qty</Text>
            </View>
            <View style={{ width: '100%', borderTopColor: 'rgba(93, 93, 93, 1)', borderTopWidth: 1, marginTop: 7 }} />
          </View>
          {
            cartState.donationDishes.map((DonationDishObj: DonationDishes) => (
              <View style={styles.listItem} key={DonationDishObj.dishID}>
                <View style={[{ marginVertical: 20 }, styles.spacedContainer]}>
                  <Text style={styles.standardText}>{authState.dishes.filter((Dish) => Dish._id === DonationDishObj.dishID)[0].dishName}</Text>
                  <Text style={styles.standardText}>{DonationDishObj.quantity}</Text>
                </View>
                <View style={{ width: '100%', borderTopColor: 'rgba(229, 229, 229, 1)', borderTopWidth: 1 }} />
              </View>
            ))
          }
        </View>
      </View>
      <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end' }}>
        <Pressable onPress={() => navigation.navigate('ReviewContactScreen')} style={{ height: 52, justifyContent: 'center', alignItems: 'center', borderColor: 'rgba(243, 123, 54, 1)', borderWidth: 2, borderRadius: 4 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'rgba(243, 123, 54, 1)' }}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default ReviewDonationCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  topContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  spacedContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItem: {
    width: '100%',
  },
  standardText: {
    alignContent: 'flex-start',
    fontSize: 15,
    color: 'black',
  },
  title: {
    alignContent: 'flex-start',
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});
