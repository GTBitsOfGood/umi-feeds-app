import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreateAccountScreen = () => (
  <View style={styles.container}>
    <Text>Add New Dish Form</Text>
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

export default CreateAccountScreen;
