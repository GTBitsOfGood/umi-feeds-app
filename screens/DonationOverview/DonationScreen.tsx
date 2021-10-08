import React from 'react';
import { ScrollView, TouchableHighlight } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import Header from '../../components/DonationForm/Header';
import DishQuantityPreview from '../../components/DonationForm/DishQuantityPreview';
import { RootState } from '../../redux/rootReducer';

import { DonationScreenParamList } from '../../navigation/DonorStack/DonationForm/types';
import { BottomTabParamList } from '../../navigation/MainNavBar/types';

import styles from '../../components/DonationForm/styles';
import { Text, View } from '../../style/Themed';

type DonationScreenProp = CompositeNavigationProp<
  StackNavigationProp<DonationScreenParamList, 'DonationScreen'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;

export default function DonationScreen() {
  const donationCartState = useSelector((state: RootState) => state.donationCart);
  const authState = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<DonationScreenProp>();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Header title="Donate" />
          <TouchableHighlight
            onPress={() => alert('Create new pressed!')}
            underlayColor="transparent"
          >
            <View style={styles.filledButton}>
              <Text style={styles.filledButtonText}>
                Create new dish
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigation.navigate('DishSearch')}
            underlayColor="transparent"
          >
            <View style={styles.outlinedButton}>
              <Text style={styles.outlinedButtonText}>
                Search for dishes
              </Text>
            </View>
          </TouchableHighlight>
          <Text style={styles.subtitle}>Favorite Dishes</Text>
          <DishQuantityPreview
            name="Avocado Toast"
            onPress={() => {
              alert('TODO: Add to cart!');
            }}
            quantityAdded={0}
          />
          {authState.dishes.filter((dish) => dish.favorite).length === 0 ? <Text style={{ textAlign: 'center', color: 'gray' }}>No favorite dishes</Text> : donationCartState.dishes.map((item) => (
            <DishQuantityPreview
              name={item.dishID}
              onPress={() => {
                alert('TODO: Add to cart!');
              }}
              quantityAdded={0}
            />
          ))}
        </View>
      </ScrollView>
      {/* <DonationForm /> */}
    </View>
  );
}
