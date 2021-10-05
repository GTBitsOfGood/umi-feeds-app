// Navigation
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import React, { useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import LoginButton from '../../components/Auth/LoginButton';
import LogoutButton from '../../components/Auth/LogoutButton';
import { View, Text } from '../../style/Themed';
import { RootState } from '../../redux/rootReducer';
import Logo from '../../assets/images/umi-feeds-logo.svg';

import { HomeScreenParamList } from '../../navigation/SharedStack/Home/types';

import { BottomTabParamList } from '../../navigation/MainNavBar/types';

import DonateQuantityModal from '../../components/DonateQuantityModal';
import { DonationDishes } from '../../types';
import { addToCart } from '../../redux/reducers/donationCartReducer';

// Test Dish Object to render Modal
const MockDishObj = {
  _id: '894yr34fbu3bf3', // the unqiue id assigned to a dish. Let Mongo create this when you insert a document without any _id attribute
  dishName: 'Fried Donit',
  cost: 90.00,
  pounds: 78,
  allergens: ['fish', 'nuts'],
  imageLink: 'www.google.com', // link to azure image
  comments: '',
};

type LoginScreenProp = CompositeNavigationProp<
  StackNavigationProp<HomeScreenParamList, 'Home'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;

function LoginScreen() {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const donationCartState = useSelector((state: RootState) => state.donationCart); // FOR TESTING
  const navigation = useNavigation<LoginScreenProp>();

  /**
   * ONLY FOR TESTING AND DEMO PURPOSES TO DEMO MODAL
   */
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const closeModal = () => setModalVisible(!modalVisible);
  const modalSubmit = (quantity: DonationDishes) => dispatch(addToCart(quantity));
  console.log(authState.authenticated);
  return (
    <View style={styles.container}>
      <DonateQuantityModal
        visible={modalVisible}
        dishObj={MockDishObj}
        closeModal={closeModal}
        modalSubmit={modalSubmit}
      />
      <Logo />
      <View style={{ margin: '5%' }}>
        <Text style={{ fontSize: 15, textAlign: 'center', paddingTop: 227 }}>
          A food rescue non-profit organization based in Atlanta dedicated to serving the hungry and homeless healthy and nutritious meals.
        </Text>
      </View>
      {!authState.authenticated
        ? (
          <View>
            <LoginButton onUserNotFound={() => navigation.navigate('NewDonorName')} />
          </View>
        )
        : (
          <View>
            {/* <Text style={{ fontSize: 20 }}>{`Hello, ${authState.name}!`}</Text> */}
            {/* <Button title="Test Modal Dish" onPress={() => navigation.navigate('NewDonorName')} /> */}
            <Button
              title="Test Modal Dish"
              onPress={() => {
                console.log(donationCartState); // to test to make sure dish was added
                setModalVisible(!modalVisible);
              }}
            />
            <LogoutButton />
          </View>
        )
      }
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
