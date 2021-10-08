import React, { ReactElement, useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
  // const allDishes: Dish[] = authState.dishes;
  const allDishes: Dish[] = [
    {
      _id: '1',
      dishName: 'Chicken',
      cost: 1,
      pounds: 1,
      allergens: [],
      imageLink: 'https',
      comments: 'test',
      favorite: false,
    },
    {
      _id: '2',
      dishName: 'Aspararagus',
      cost: 1,
      pounds: 1,
      allergens: [],
      imageLink: 'https',
      comments: 'test',
      favorite: false,
    },
  ];

  // TODO: Update this array to include all dishes initially
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>(allDishes);
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
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
          {filteredDishes.length > 0 ? filteredDishes.map((item) => (
            <DishQuantityPreview
              text={boldSearchCharacters(item.dishName, searchText)}
              onPress={() => {
                alert('TODO: Add to cart!');
              }}
              key={item._id}
              quantityAdded={0}
              customStyle={{ borderWidth: 0, borderBottomWidth: 1, borderColor: '#e6e6e6' }}
            />
          )) : <Text>No results found</Text>}
        </View>
      </ScrollView>
    </View>
  );
}

function BoldText(props: { children: string }) {
  return (
    <Text style={{ fontWeight: '800' }}>
      {props.children}
    </Text>
  );
}

function boldSearchCharacters(dishName: string, searchText: string): JSX.Element {
  if (searchText === '') {
    return <Text>{dishName}</Text>;
  }
  const nonBoldStrings = dishName.toLowerCase().split(searchText.toLowerCase());
  const nonBoldSpans = nonBoldStrings.map((span, i) => <Text>{span}</Text>);
  const boldSearchText = <BoldText>{searchText.toLowerCase()}</BoldText>;

  // think of this as the .join function, but with a separator of a JSX.Element
  function reducer(prev: JSX.Element[], current: JSX.Element): JSX.Element[] {
    return prev.length === 0 ? [...prev, current] : [...prev, boldSearchText, current];
  }

  const combinedSpans = nonBoldSpans.reduce<JSX.Element[]>(reducer, []);

  // preserves capitalization of original dish name
  let currentText = '';
  const combinedSpansCapitalized = combinedSpans.map((span) => {
    const spanText = span.props.children;

    // find text in dishname that matches the current span
    const spanTextInDishName = dishName.slice(currentText.length, currentText.length + spanText.length);

    currentText += spanText;

    if (span.type === BoldText) {
      return <BoldText>{spanTextInDishName}</BoldText>;
    } else {
      return <Text>{spanTextInDishName}</Text>;
    }
  });

  return <Text>{combinedSpansCapitalized}</Text>;
}
