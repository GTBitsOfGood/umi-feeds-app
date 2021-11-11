import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import DonationsList from '../../components/DonationsList';

export default function AllDonations() {
  return (
    <View style={styles.container}>
      <DonationsList />
    </View>
  );
}

const styles = StyleSheet.create({
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
