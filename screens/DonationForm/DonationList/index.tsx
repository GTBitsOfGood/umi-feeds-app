/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Menu, Provider } from 'react-native-paper';

import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DonateTabParamList } from '../../../navigation/DonorStack/Donate/types';
import { BottomTabParamList } from '../../../navigation/MainNavBar/types';

import {
  setDonationList,
  deleteDonationList,
  updateQty,
} from '../../../redux/reducers/donationCartReducer';
import { ChevronButton, Header } from '../../../components';

import { moderateScale } from '../../../util';
import DonateQuantityModal from '../../../components/DonateQuantityModal';

type DonationScreenProp = CompositeNavigationProp<
  StackNavigationProp<DonateTabParamList, 'DonateHomeScreen'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;

const DonationListScreen = () => {
  const navigation = useNavigation<DonationScreenProp>();

  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);

  return (
    <Provider>
      <View style={styles.container}>
        <View style={{ marginTop: moderateScale(25), marginLeft: 15 }}>
          <ChevronButton text="Back" onPress={() => navigation.goBack()} />
        </View>
        <Header title="Donation List" />
        {/* Needed to add the relative part because the header and the line below were too far apart */}
        <View style={{ position: 'relative', top: -25 }}>
          <Text style={styles.title3}>{'Here is the list of what you\'re donating'}</Text>
        </View>
        <View style={styles.tableTitle}>
          <View style={styles.tableH1}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Dish item</Text>
          </View>
          <View style={styles.tableH2}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Qty</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {
            state.donationCart.donationDishes.length === 0 ? null : (
              <ScrollView>
                {state.donationCart.donationDishes.map((item: any, i: any) => (
                  <Row key={item._id} item={item} i={i} />
                ))}
              </ScrollView>
            )
          }
        </View>
        <View
          style={{
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            height: 50,
            borderColor: '#F37B36',
            borderRadius: 4,
            backgroundColor: 'white',
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#F37B36' }}>
            + Add Dishes to donate
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('AddressScreen')}
          style={{
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            height: 50,
            borderRadius: 4,
            borderColor: '#F37B36',
            backgroundColor: '#F37B36',
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white' }}>
            Schedule Donation Pickup
          </Text>
        </Pressable>
      </View>
    </Provider>
  );
};

export default DonationListScreen;

function Row({ item, i }: any) {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const dispatch = useDispatch();
  const removeDish = () => {
    dispatch(deleteDonationList(item));
    setVisible(false);
  };

  const changeQuantity = (quantity: any) => {
    setshowQuantity(false);
    dispatch(updateQty({ item, quantity }));
  };
  const setQuantity = (evnt: any) => {
    setQty(evnt);
  };
  const [showQuantity, setshowQuantity] = React.useState(false);
  const [quantity, setQty] = React.useState(item.quantity);
  return (
    <View
      key={i}
      style={{
        flexDirection: 'row',
        height: 50,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
      }}
    >
      <View style={{ flex: 8 }}>
        <Text style={{ fontSize: 15 }}>{item.dishID}</Text>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 15 }}>{item.quantity}</Text>
        <View>
          <Menu
            style={{ marginTop: -100, marginLeft: -30 }}
            visible={visible}
            onDismiss={closeMenu}
            anchor={(
              <TouchableOpacity
                onPress={() => {
                  setVisible(true);
                }}
              >
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={24}
                  color="#DADADA"
                />
              </TouchableOpacity>
            )}
          >
            <Menu.Item onPress={() => { }} title="View Dish " />
            <Menu.Item
              onPress={() => {
                setshowQuantity(true);
                setVisible(false);
              }}
              title="Change Quantity"
            />
            <Menu.Item onPress={() => removeDish()} title="Remove Dish" />
          </Menu>
        </View>
      </View>
      <DonateQuantityModal
        visible={showQuantity}
        dishObj={item}
        closeModal={() => {
          setshowQuantity(false);
        }}
        modalSubmit={(pl) => {
          changeQuantity(pl.quantity);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: 'black',
    fontWeight: '700',
  },
  listNumber: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title2: {
    fontSize: 25,
  },
  title3: {
    fontSize: 15,
    paddingTop: 10,
  },
  tableTitle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tableH1: {
    flex: 8,
    fontSize: 25,
  },
  tableH2: {
    flex: 2,
  },
});
