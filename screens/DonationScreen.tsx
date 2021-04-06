import React from 'react';
import { StyleSheet } from 'react-native';

import DonationForm from '../components/DonationForm';

import { Text, View } from '../components/Themed';

export default function DonationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donation Form</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <DonationForm donationId="6032bd3592899332cc7b25d4" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
