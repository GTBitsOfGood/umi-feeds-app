import React from 'react';
import { StyleSheet } from 'react-native';
import Map from '../components/Map';
import { View } from '../components/Themed';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Map />
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
