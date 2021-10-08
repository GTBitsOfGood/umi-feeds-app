import React, { useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/rootReducer';
import DishQuantityPreview from '../../components/DonationForm/DishQuantityPreview';
import { Text, View } from '../../style/Themed';
import Header from '../../components/DonationForm/Header';
import ChevronButton from '../../components/DonationForm/ChevronButton';
import styles from '../../components/DonationForm/styles';
import { DonationScreenParamList } from '../../navigation/DonorStack/DonationForm/types';
import { BottomTabParamList } from '../../navigation/MainNavBar/types';
import { Dish } from '../../types';

type DonationScreenProp = CompositeNavigationProp<
  StackNavigationProp<DonationScreenParamList, 'DonationScreen'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;

export default function DishSearch() {
  const navigation = useNavigation<DonationScreenProp>();
  const donationCartState = useSelector((state: RootState) => state.donationCart);
  const authState = useSelector((state: RootState) => state.auth);
  const allDishes: Dish[] = authState.dishes;

  // TODO: Update this array to include all dishes initially
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>(allDishes);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <ChevronButton onPress={() => navigation.goBack()} text="Back" />
          <Header title="Donate" />
          <View style={styles.searchBar}>
            <TextInput
              placeholder="Search"
              onChangeText={(text) => {
                if (text === '') {
                  setFilteredDishes(allDishes);
                } else {
                  setFilteredDishes(allDishes.filter((dish) => dish.dishName.includes(text)));
                }
              }}
              style={styles.searchInput}
            />
          </View>
          {filteredDishes.length > 0 ? filteredDishes.map((item) => (
            <DishQuantityPreview
              name={item.dishName}
              onPress={() => {
                alert('TODO: Add to cart!');
              }}
              quantityAdded={0}
            />
          )) : <Text>No results found</Text>}
        </View>
      </ScrollView>
    </View>
  );
}
