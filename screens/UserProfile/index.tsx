import { StyleSheet } from 'react-native';
import { View } from '../../style/Themed';
import UserProfile from '../../components/UserProfile';
import React from 'react';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <UserProfile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  }
});
