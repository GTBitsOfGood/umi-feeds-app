import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { DonationDishes } from '../../../types';

// test donation dishes
const MockDonationObj1: DonationDishes = {
  _id: '12365778678678',
  dishID: 'Avocado Tofu Salad',
  quantity: 10
};

const MockDonationObj2: DonationDishes = {
  _id: '1236577867834238',
  dishID: 'Watercress Black Bean Sauce',
  quantity: 7
};

function ReviewDonationCart() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 2, width: '100%', justifyContent: 'space-around', marginBottom: 20 }}>
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start' }}>
          <AntDesign name="left" size={21} color="rgba(243, 123, 54, 1)" />
          <Text style={{ fontSize: 15, color: 'rgba(243, 123, 54, 1)' }}>Donation cart</Text>
        </View>
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
              // eslint-disable-next-line no-console
              console.debug('Edit Button Pressed');
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
          <View style={styles.listItem}>
            <View style={[{ marginVertical: 20 }, styles.spacedContainer]}>
              <Text style={styles.standardText}>{MockDonationObj1.dishID}</Text>
              <Text style={styles.standardText}>{MockDonationObj1.quantity}</Text>
            </View>
            <View style={{ width: '100%', borderTopColor: 'rgba(229, 229, 229, 1)', borderTopWidth: 1 }} />
          </View>
          <View style={styles.listItem}>
            <View style={[{ marginVertical: 20 }, styles.spacedContainer]}>
              <Text style={styles.standardText}>{MockDonationObj2.dishID}</Text>
              <Text style={styles.standardText}>{MockDonationObj2.quantity}</Text>
            </View>
            <View style={{ width: '100%', borderTopColor: 'rgba(229, 229, 229, 1)', borderTopWidth: 1 }} />
          </View>
        </View>
      </View>
      <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end' }}>
        <Pressable onPress={() => console.log('hello')} style={{ height: 52, justifyContent: 'center', alignItems: 'center', borderColor: 'rgba(243, 123, 54, 1)', borderWidth: 2, borderRadius: 4 }}>
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
