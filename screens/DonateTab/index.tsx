import React, { useState } from 'react';
import { ScrollView, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import Header from '../../components/DonationForm/Header';
import DishQuantityPreview from '../../components/DonationForm/DishQuantityPreview';
import { RootState } from '../../redux/rootReducer';
import { addToCart, removeDishFromCart } from '../../redux/reducers/donationCartReducer';

import { DonationScreenParamList } from '../../navigation/DonorStack/DonationForm/types';
import { BottomTabParamList } from '../../navigation/MainNavBar/types';

import styles from '../../components/DonationForm/styles';
import { Text, View } from '../../style/Themed';

import DonateQuantityModal from '../../components/DonateQuantityModal';
import { Dish, DonationDishes } from '../../types';

type DonationScreenProp = CompositeNavigationProp<
  StackNavigationProp<DonationScreenParamList, 'DonationScreen'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;

export default function DonationScreen() {
  const donationCartState = useSelector((state: RootState) => state.donationCart);
  const authState = useSelector((state: RootState) => state.auth);
  const allDishes = authState.dishes;

  const navigation = useNavigation<DonationScreenProp>();

  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalDishObject, setModalDishObject] = useState<Dish>();
  const closeModal = () => setModalVisible(!modalVisible);
  const modalSubmit = (quantity: DonationDishes) => dispatch(addToCart(quantity));
  const removeDish = (dishId: string | undefined) => dispatch(removeDishFromCart(dishId));

  return (
    <View style={styles.container}>
      <DonateQuantityModal
        visible={modalVisible}
        dishObj={modalDishObject}
        closeModal={closeModal}
        modalSubmit={modalSubmit}
      />
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
          {allDishes.filter((dish) => dish.favorite).length === 0 ? <Text style={{ textAlign: 'center', color: 'gray' }}>No favorite dishes</Text> : allDishes.filter((dish) => dish.favorite).map((item) => (
            <DishQuantityPreview
              text={<Text>{item.dishName}</Text>}
              key={item._id}
              onPress={() => {
                const donationDishes = donationCartState.dishes.filter((dish) => dish.dishID === item._id);

                // if the dish is already in the cart, set the quantity to 0 when pressed
                if ((donationDishes.reduce((prev, curr) => prev + curr.quantity, 0) > 0)) {
                  removeDish(item._id);
                  return;
                }
                setModalDishObject(item);
                setModalVisible(true);
              }}
              quantityAdded={donationCartState.dishes.filter((dish) => dish.dishID === item._id).reduce((prev, curr) => prev + curr.quantity, 0) || 0}
            />
          ))}
          {/* <Text>{donationCartState.dishes.map((d) => `${d.dishID}: ${d.quantity}`).join('\n')}</Text> */}
        </View>
      </ScrollView>
    </View>
  );
}
