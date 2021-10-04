import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

interface ChildType {
  children?: JSX.Element;
}

const HideKeyboard = ({ children }: ChildType) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default HideKeyboard;
