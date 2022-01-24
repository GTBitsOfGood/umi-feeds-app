import React from 'react';
import { StyleProp, TouchableHighlight, ViewStyle } from 'react-native';
import { View, Text } from '../../../style/Themed';
import styles from './styles';

/**
 * Reusable primary button component
 *
 * IMPORTANT NOTES:
 *  Only usable within scrollview parent components. Otherwise would not display properly.
 *
 * KNOWN BUGS: None
 *
 * @param {Function} onPress action to be performed when button is pressed
 * @param {JSX.Element | string} children text or a React component for the button's text to embed
 * @param {boolean} disabled whether the button should be disabled or not
 * @param {TSX.Element} customStyle  styleing object for the button to inherit in addition to its current styling
 * @returns {TSX.Element}
 */
export default function PrimaryButton(props: { onPress: () => void, children: JSX.Element | string, customStyle?: StyleProp<ViewStyle>, disabled?: boolean }) {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      underlayColor="transparent"
      disabled={props.disabled}
    >
      <View style={[styles.button, styles.filledButton, props.customStyle, (props.disabled ? { backgroundColor: '#b8b8b8' } : {})]}>
        <Text style={styles.filledButtonText}>
          {props.children}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
