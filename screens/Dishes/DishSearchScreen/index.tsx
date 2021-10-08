import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DishSearchScreen = () => (
  <View style={styles.container}>
    <Text>Dish Search Screen</Text>
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

export default DishSearchScreen;
