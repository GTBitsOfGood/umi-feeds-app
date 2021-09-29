import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DonateHomePage = () => (
  <View style={styles.container}>
    <Text>Donate Tab Home Page</Text>
  </View>
);

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default DonateHomePage;
