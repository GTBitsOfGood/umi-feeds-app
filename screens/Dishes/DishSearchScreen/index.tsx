import React, { useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { RootState } from '../../../redux/rootReducer';
import DishQuantityPreview from '../../../components/DishPreview';
import { Text, View } from '../../../style/Themed';
import Header from '../../../components/Header';
import ChevronButton from '../../../components/ChevronButton';
import styles from '../../../components/DonationForm/styles';
import { DonateTabParamList } from '../../../navigation/DonorStack/Donate/types';
import { BottomTabParamList } from '../../../navigation/MainNavBar/types';
import { Dish, DonationDishes } from '../../../types';
import { addToCart, removeDishFromCart } from '../../../redux/reducers/donationCartReducer';
import DonateQuantityModal from '../../../components/DonateQuantityModal';

type DonationScreenProp = CompositeNavigationProp<
  StackNavigationProp<DonateTabParamList, 'DishSearch'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;

export default function DishSearch() {
  const navigation = useNavigation<DonationScreenProp>();
  const donationCartState = useSelector((state: RootState) => state.donationCart);
  const authState = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalDishObject, setModalDishObject] = useState<Dish>();
  const closeModal = () => setModalVisible(!modalVisible);
  const modalSubmit = (quantity: DonationDishes) => dispatch(addToCart(quantity));
  const removeDish = (dishId: string | undefined) => dispatch(removeDishFromCart(dishId));

  const allDishes: Dish[] = authState.dishes;

  const [filteredDishes, setFilteredDishes] = useState<Dish[]>(allDishes);
  const [searchText, setSearchText] = useState('');

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
          <ChevronButton onPress={() => navigation.goBack()} text="Back" />
          <Header title="Donate" />
          <View style={styles.searchBar}>
            <AntDesign name="search1" size={20} color="#b8b8b8" style={{ marginHorizontal: 8 }} />
            <TextInput
              placeholder="Search"
              onChangeText={(text) => {
                setSearchText(text);
                if (text === '') {
                  setFilteredDishes(allDishes);
                } else {
                  setFilteredDishes(allDishes.filter((dish) => dish.dishName.toLowerCase().includes(text.toLowerCase())));
                }
              }}
              style={styles.searchInput}
            />
          </View>
          {filteredDishes.length > 0 ? filteredDishes.filter((item) => item.dishName).map((item) => (
            <DishQuantityPreview
              text={boldSearchCharacters(item.dishName, searchText)}
              key={item._id}
              onPress={() => {
                const donationDishes = donationCartState.donationDishes.filter((dish) => dish.dishID === item._id);

                // if the dish is already in the cart, set the quantity to 0 when pressed
                if ((donationDishes.reduce((prev, curr) => prev + curr.quantity, 0) > 0)) {
                  removeDish(item._id);
                  return;
                }
                setModalDishObject(item);
                setModalVisible(true);
              }}
              quantityAdded={donationCartState.donationDishes.filter((dish) => dish.dishID === item._id).reduce((prev, curr) => prev + curr.quantity, 0)}
              customStyle={{ borderWidth: 0, borderBottomWidth: 1, borderColor: '#e6e6e6' }}
            />
          )) : <Text key="null">No results found</Text>}
        </View>
      </ScrollView>
    </View>
  );
}

/**
 * Bolds the characters the dishname that repeat characters in the search text, preserving the case of the characters
 * @param dishName the name of the dish
 * @param searchText the name of the text in the search box
 * @returns a JSX element with the matching search box text bolded, with capitalization preserved
 */
function boldSearchCharacters(dishName: string, searchText: string): JSX.Element {
  interface textSpan {
    text: string;
    bold: boolean;
  }
  if (searchText === '') {
    return <Text key={dishName}>{dishName}</Text>;
  }
  const nonBoldStrings = dishName.toLowerCase().split(searchText.toLowerCase());
  const nonBoldSpans = nonBoldStrings.map((span) => ({ text: span, bold: false } as textSpan));
  const boldSearchText = { text: searchText.toLowerCase(), bold: true } as textSpan;

  // think of this as the .join function, but with a separator of a JSX.Element
  function reducer(prev: textSpan[], current: textSpan): textSpan[] {
    return prev.length === 0 ? [...prev, current] : [...prev, boldSearchText, current];
  }

  const combinedSpans = nonBoldSpans.reduce<textSpan[]>(reducer, []);

  // preserves capitalization of original dish name
  let currentText = '';
  const combinedSpansCapitalized = combinedSpans.map((span) => {
    const spanText = span.text;
    // find text in dishname that matches the current span
    const spanTextInDishName = dishName.slice(currentText.length, currentText.length + spanText.length);

    currentText += spanText;

    if (span.bold) {
      return <Text key={spanTextInDishName + Math.random()} style={{ fontWeight: 'bold' }}>{spanTextInDishName}</Text>;
    } else {
      return <Text key={spanTextInDishName + Math.random()}>{spanTextInDishName}</Text>;
    }
  });

  return <Text key={searchText + Math.random()}>{combinedSpansCapitalized}</Text>;
}
