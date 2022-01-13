import React from 'react';
import { StyleProp, TouchableHighlight, ViewStyle } from 'react-native';
import { View, Text } from '../../../style/Themed';
import styles from './styles';

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
