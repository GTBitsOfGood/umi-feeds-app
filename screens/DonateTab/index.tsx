import React, { useState } from 'react';
import { ScrollView, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { RootState } from '../../redux/rootReducer';
import { addToCart, removeDishFromCart } from '../../redux/reducers/donationCartReducer';

import { DonationScreenParamList } from '../../navigation/DonorStack/DonationForm/types';
import { BottomTabParamList } from '../../navigation/MainNavBar/types';

import styles from './styles';
import { Text, View } from '../../style/Themed';

import { Dish, DonationDishes } from '../../types';

// import components
import { Header, DonateQuantityModal, DishQuantityPreview } from '../../components';

type DonationScreenProp = CompositeNavigationProp<
  StackNavigationProp<DonationScreenParamList, 'DonationScreen'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;

export default function DonationScreen() {
  const donationCartState = useSelector((state: RootState) => state.donationCart);
  const authState = useSelector((state: RootState) => state.auth);
  // const allDishes = authState.dishes;
  // Fake data for demo purposes
  const allDishes = [
    {
      _id: 'hednejn',
      favorite: true,
      dishName: 'fofo',
      cost: 90.90,
      pounds: 90,
      allergens: [],
      imageLink: '',
      comments: 'Yes'
    }, {
      _id: 'heejn',
      favorite: true,
      dishName: 'good luck',
      cost: 90.90,
      pounds: 90,
      allergens: [],
      imageLink: '',
      comments: 'Yes'
    }
  ];

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
        </View>
      </ScrollView>
    </View>
  );
}
