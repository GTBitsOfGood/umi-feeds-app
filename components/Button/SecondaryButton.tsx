import React from 'react';
import { StyleProp, TouchableHighlight, ViewStyle } from 'react-native';
import { View, Text } from '../../style/Themed';
import styles from './styles';

export default function SecondaryButton(props: { onPress: () => void, children: JSX.Element | string, customStyle?: StyleProp<ViewStyle>, disabled?: boolean }) {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      underlayColor="transparent"
      disabled={props.disabled}
    >
      <View style={[styles.button, styles.outlinedButton, props.customStyle, (props.disabled ? { borderColor: '#b8b8b8' } : {})]}>
        <Text style={[styles.outlinedButtonText, (props.disabled ? { color: '#b8b8b8' } : {})]}>
          {props.children}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
