import { StyleSheet } from 'react-native';
import React from 'react';
import { View } from '../../style/Themed';
import EditProfileScreen from '../../components/EditProfile';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <EditProfileScreen />
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
