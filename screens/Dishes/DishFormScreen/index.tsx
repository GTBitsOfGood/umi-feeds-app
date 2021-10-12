import React from 'react';
import { View, StyleSheet } from 'react-native';
import DishForm from '../../../components/DishForm/DishForm';

const NewDishFormScreen = () => (
  <View style={styles.container}>
    <DishForm />
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

export default NewDishFormScreen;
