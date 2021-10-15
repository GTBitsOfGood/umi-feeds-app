import React from 'react';
import { StyleSheet, Alert, View, Modal, Text, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import { HideKeyboardUtility } from '../../util/index';

type numButtonRange = 1 | 2;

interface ButtonParams {
  numButtons: numButtonRange, // either 0, 1 or 2 buttons
  buttonOneTitle?: string,
  buttonTwoTitle?: string,
  closeModal: () => void,
  modalSubmit: (buttonOneSubmit: boolean, buttonTwoSubmit: boolean) => void,
}

interface GeneralModalParams extends ButtonParams {
  title: string,
  subtitle: string,
  visible: boolean,
}

const ButtonRender = ({
  numButtons,
  buttonOneTitle,
  buttonTwoTitle,
  closeModal,
  modalSubmit,
}: ButtonParams) => {
  if (numButtons === 1) {
    return (
      <Pressable
        style={[styles.button, styles.cancelButton]}
        onPress={() => {
          modalSubmit(true, false);
          closeModal();
        }}
      >
        <Text style={styles.cancelTextStyle}>{buttonOneTitle}</Text>
      </Pressable>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Pressable
          style={[styles.button, styles.saveButton, { flex: 2 }]}
          onPress={() => {
            modalSubmit(true, false);
            closeModal();
          }}
        >
          <Text style={styles.textStyle}>{buttonOneTitle}</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.cancelButton, { flex: 2 }]}
          onPress={() => {
            modalSubmit(false, true);
            closeModal();
          }}
        >
          <Text style={styles.cancelTextStyle}>{buttonTwoTitle}</Text>
        </Pressable>
      </View>
    );
  }
};

const GeneralModal = ({
  title,
  subtitle,
  visible,
  numButtons,
  buttonOneTitle,
  buttonTwoTitle,
  closeModal,
  modalSubmit,
}: GeneralModalParams) => {
  let flexTitle;
  let flexSubtitle;
  let flexButton;
  let modalHeight;

  if (numButtons === 1) {
    modalHeight = '60%';
    flexTitle = 1;
    flexSubtitle = 3;
    flexButton = 4;
  } else {
    modalHeight = '80%';
    flexTitle = 1;
    flexSubtitle = 3;
    flexButton = 7;
  }
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
        <View style={{ flex: 2, backgroundColor: 'black' }} />
        <View style={styles.modalPlacement}>
          <HideKeyboardUtility>
            <KeyboardAvoidingView behavior="padding" style={[styles.modalView, { height: modalHeight }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.modalText, { flex: flexTitle }]}>{title}</Text>
                <Text style={[styles.modalSubtitle, { flex: flexSubtitle }]}>
                  {subtitle}
                </Text>
                <View style={{ flex: flexButton }}>
                  <ButtonRender
                    numButtons={numButtons}
                    buttonOneTitle={buttonOneTitle}
                    buttonTwoTitle={buttonTwoTitle}
                    closeModal={closeModal}
                    modalSubmit={modalSubmit}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </HideKeyboardUtility>
        </View>
        <View style={{ flex: 4 }} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    flexDirection: 'column',
    width: '80%',
    // height: '60%',
    textAlign: 'left',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    width: '100%',
    borderRadius: 4,
    padding: 10,
    elevation: 2,
    alignItems: 'center',
    margin: 10,
    alignSelf: 'center',
    justifyContent: 'center'
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
    fontSize: 17,
  },
  cancelTextStyle: {
    color: '#F37B36',
    fontWeight: 'bold',
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
    lineHeight: 20
  }
});

export default GeneralModal;
