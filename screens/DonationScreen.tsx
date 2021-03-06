import React from 'react';
import { StyleSheet } from 'react-native';

import DonationForm from '../components/DonationForm';

import { Text, View } from '../components/Themed';

export default function DonationScreen() {
  return (
    <View style={styles.container}>
      <DonationForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
