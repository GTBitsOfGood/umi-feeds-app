import React from 'react';
import { StyleSheet } from 'react-native';
import DonationsList from '../components/DonationsList';
import { View } from '../components/Themed';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <DonationsList />
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
