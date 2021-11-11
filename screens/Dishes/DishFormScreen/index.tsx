import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../../navigation/MainNavBar/types';
import { DonateTabParamList } from '../../../navigation/DonorStack/Donate/types';

import DishForm from '../../../components/DishForm/DishForm';

type DonationScreenProp = CompositeNavigationProp<
  StackNavigationProp<DonateTabParamList, 'DishSearch'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;
const NewDishFormScreen = () => {
  const navigation = useNavigation<DonationScreenProp>();
  return (
    <View style={styles.container}>
      <DishForm onSuccessfulDishSubmit={() => navigation.navigate('DonateHomeScreen')} />
    </View>
  );
};

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default NewDishFormScreen;
