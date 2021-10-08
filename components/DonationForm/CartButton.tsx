import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Text, View } from '../../style/Themed';

export default function CartButton(props: { onPress: () => void, color: string }) {
  const styles = StyleSheet.create({
    container: {
    },
    text: {
      fontSize: 42,
    },
    title: {
      fontSize: 32,
      fontWeight: '500',
      // fontFamily: 'Roboto',
      paddingVertical: 10,
    },
    icon: {
      marginTop: 10,
      color: props.color || 'black'
    },
  });
  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={props.onPress}
        underlayColor="transparent"
      >
        <View>
          <Icon name="shoppingcart" size={40} style={styles.icon} />
        </View>
      </TouchableHighlight>
    </View>
  );
}
