import React, { useState } from 'react';
import { Alert, View, Modal, Text, Pressable, TextInput, KeyboardAvoidingView } from 'react-native';

import styles from './styles';
import { HideKeyboardUtility } from '../../util/index';
import { Dish, DonationDishes } from '../../types';

interface DonateQuantityModalParams {
  visible: boolean,
  dishObj?: Dish,
  closeModal: () => void,
  modalSubmit: (donationDish: DonationDishes) => void,
}

/**
 * Takes in the visibility of the modal as well as a Dish Object to render
 * styles appropriately
 */
const DonateQuantityModal = ({ visible, dishObj, closeModal, modalSubmit }: DonateQuantityModalParams) => {
  const [quantity, setQuantity] = useState<string>('');

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        closeModal();
      }}
    >
      <View style={[styles.centeredView, visible ? { backgroundColor: 'rgba(0,0,0,0.5)' } : {}]}>
        <HideKeyboardUtility>
          <KeyboardAvoidingView behavior="padding" style={styles.modalView}>
            <Text style={styles.modalText}>Donate Dish?</Text>
            <Text style={styles.modalSubtitle}>
              How many servings of
              <Text style={{ fontWeight: 'bold' }}> {dishObj ? dishObj.dishName : ''} </Text>
              do you want to donate?
            </Text>
            <TextInput
              value={quantity}
              onChangeText={(setQuantity)}
              style={styles.input}
              placeholder="Quantity"
              enablesReturnKeyAutomatically
              keyboardType="numeric"
            />
            <Pressable
              style={[styles.button, styles.saveButton]}
              onPress={() => {
                if (Number.isFinite(Number(quantity)) && Number(quantity) !== 0) {
                  if (dishObj) {
                    modalSubmit({
                      dishID: dishObj._id || '',
                      quantity: parseInt(quantity, 10),
                    });
                    setQuantity('');
                    closeModal();
                  } else {
                    Alert.alert('Did not pass in a dish to submit');
                  }
                } else {
                  Alert.alert('Not a Number');
                }
              }}
            >
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                setQuantity('');
                closeModal();
              }}
            >
              <Text style={styles.cancelTextStyle}>Cancel</Text>
            </Pressable>
          </KeyboardAvoidingView>
        </HideKeyboardUtility>
      </View>
    </Modal>
  );
};

export default DonateQuantityModal;
