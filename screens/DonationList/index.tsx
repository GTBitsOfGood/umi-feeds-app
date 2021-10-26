/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useReducer, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import {
  setDonationList,
  getDonationList,
  deleteDonationList,
  updateQty,
} from '../../redux/reducers/donationCartReducer';
import { ChevronButton, Header } from '../../components';

import { HideKeyboardUtility } from '../../util';
import DonateQuantityModal from '../../components/DonateQuantityModal';

const DonationListScreen = () => {
  const [donationDishList, setdonationDishList] = useState([
    {
      _id: ` ${Math.random()}`,
      dishID: 'BBQ',
      quantity: 2,
    },
    {
      _id: ` ${Math.random()}`,
      dishID: 'chips',
      quantity: 2,
    },
    {
      _id: ` ${Math.random()}`,
      dishID: 'Cake',
      quantity: 2,
    },
  ]);
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  useEffect(() => {
    dispatch(setDonationList(donationDishList));
  }, []);
  // const [state, dispatchAction] = useReducer(getDonationList);
  return (
    <Provider>
      <View style={styles.container}>
        <View style={{ marginTop: 50, marginLeft: 15 }}>
          <ChevronButton text="Back" onPress={() => { }} />
        </View>
        <Header title="Donation List" />
        {/* <View style={styles.header}>
          <View>
            <Text style={styles.title}>Donation List</Text>
          </View>
          <View style={styles.listNumber}>
            <AntDesign name="shoppingcart" size={50} color="orange" />
            <Text style={{ position: 'absolute', top: 11, right: 55 }}>{state.donationCart.dishes.length}</Text>
            <Text style={styles.title2}>List</Text>
          </View>
        </View> */}
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
          <ScrollView>
            {state.donationCart.dishes.map((item: any, i: any) => (
              <Row key={item._id} item={item} i={i} />
            ))}
          </ScrollView>
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
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#F37B36' }}>
            + Add Dishes to donate
          </Text>
        </View>
        <View
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
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
            Schedule Donation Pickup
          </Text>
        </View>
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
    console.log('remove dish', item);
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
      {/* <Modal
        animationType="fade"
        transparent
        visible={showQuantity}
        onRequestClose={() => {}}
      >
        <View
          style={[
            styless.centeredView,
            visible ? { backgroundColor: 'rgba(0,0,0,0.5)' } : {},
          ]}
        >
          <View style={{ flex: 2 }} />
          <View style={styless.modalPlacement}>
            <HideKeyboardUtility>
              <KeyboardAvoidingView
                behavior="padding"
                style={styless.modalView}
              >
                <Text style={styless.modalText}>Change Quantity</Text>
                <Text style={styless.modalSubtitle}>
                  How many servings of
                  <Text style={{ fontWeight: 'bold' }}> {item.dishID} </Text>
                  do you want to donate?
                </Text>
                <View>
                  <TextInput
                    value={`${quantity}`}
                    onChangeText={(evnt) => setQuantity(evnt)}
                    style={styless.input}
                    placeholder="Quantity"
                    enablesReturnKeyAutomatically
                    keyboardType="numeric"
                  />
                  <Pressable
                    style={[styless.button, styless.saveButton]}
                    onPress={() => {
                      changeQuantity();
                    }}
                  >
                    <Text style={styless.textStyle}>Save</Text>
                  </Pressable>
                  <Pressable
                    style={[styless.button, styless.cancelButton]}
                    onPress={() => {
                      setshowQuantity(false);
                    }}
                  >
                    <Text style={styless.cancelTextStyle}>Cancel</Text>
                  </Pressable>
                </View>
              </KeyboardAvoidingView>
            </HideKeyboardUtility>
          </View>
          <View style={{ flex: 4 }} />
        </View>
      </Modal> */}
    </View>
  );
}

const styless = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalPlacement: {
    flex: 8,
  },
  modalView: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    height: '90%',
    textAlign: 'left',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    height: '20%',
    width: '100%',
    borderRadius: 4,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#F37B36',
  },
  cancelButton: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#F37B36',
    backgroundColor: '#FFFFFF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 17,
  },
  cancelTextStyle: {
    color: '#F37B36',
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 17,
  },
  modalText: {
    color: '#202020',
    fontSize: 26,
    lineHeight: 30,
    fontWeight: 'bold',
  },
  modalSubtitle: {
    marginTop: 5,
    color: '#202020',
    fontSize: 15,
    lineHeight: 20,
  },
  input: {
    height: '20%',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 0.5,
    color: 'black',
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
  },
});

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
