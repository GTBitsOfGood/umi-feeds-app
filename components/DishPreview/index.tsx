import React from 'react';
import { StyleProp, StyleSheet, TouchableHighlight, ViewStyle } from 'react-native';

import { Text, View } from '../../style/Themed';
import { ThemeColor } from '../../constants/Colors';

export default function DishQuantityPreview(props: { text: JSX.Element, onPress: () => void, quantityAdded: number, customStyle?: StyleProp<ViewStyle> }) {
  return (
    <View style={{ ...styles.favoriteDish, ...(props.customStyle as Record<string, unknown>) }}>
      {/* textAlignVertical is supported only on Android, so another View must be used */}
      <View style={{ alignSelf: 'center', flexShrink: 2, paddingRight: 20 }}>
        <Text numberOfLines={2} style={styles.favoriteDishText}>{props.text}</Text>
      </View>
      <TouchableHighlight
        onPress={props.onPress}
        underlayColor="transparent"
      >
        {props.quantityAdded > 0 ? (
          <View style={{ ...styles.addButton, backgroundColor: ThemeColor }}>
            <Text style={{ ...styles.outlinedButtonText, color: 'white' }}>{props.quantityAdded === 0 ? 'Add to list' : `Added (${props.quantityAdded >= 99 ? '99+' : props.quantityAdded})`}</Text>
          </View>
        ) : (
          <View style={styles.addButton}>
            <Text style={styles.outlinedButtonText}>{props.quantityAdded === 0 ? 'Add to list' : `Added (${props.quantityAdded >= 99 ? '99+' : props.quantityAdded})`}</Text>
          </View>
        )}
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  favoriteDish: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#B8B8B8',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 4,
    marginBottom: 10,
  },
  favoriteDishText: {
    fontSize: 15,
  },
  addButton: {
    borderWidth: 1,
    borderColor: ThemeColor,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    minWidth: '40%'
  },
  outlinedButtonText: {
    color: ThemeColor,
    fontWeight: '700',
    textAlign: 'center'
  }
});
