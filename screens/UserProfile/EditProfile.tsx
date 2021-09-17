import { StyleSheet } from 'react-native';
import { View } from '../../style/Themed';
import EditProfileScreen from '../../components/UserProfile/EditProfile';
import React from 'react';

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
