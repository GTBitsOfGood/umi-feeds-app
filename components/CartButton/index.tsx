import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Text, View } from '../../style/Themed';
import Icon from '../../assets/images/add_shopping_cart.svg';
import { RootState } from '../../redux/rootReducer';

export default function CartButton(props: { onPress: () => void, color: string }) {
  const donationCartState = useSelector((state: RootState) => state.donationCart);
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
    cartQuantity: {
      position: 'absolute',
      // backgroundColor: 'red',
      marginLeft: 2,
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
      width: '100%'
    }
  });
  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={props.onPress}
        underlayColor="transparent"
      >
        <View>
          <Icon style={styles.icon} />
          {
            donationCartState.donationDishes.reduce((prev, curr) => prev + curr.quantity, 0) > 99
              ? <Text style={{ ...styles.cartQuantity, fontSize: 12, fontWeight: '500', marginTop: 6 }}>99+</Text>
              : <Text style={styles.cartQuantity}>{donationCartState.donationDishes.reduce((prev, curr) => prev + (curr.quantity ?? 0), 0)}</Text>}
        </View>
      </TouchableHighlight>
    </View>
  );
}
