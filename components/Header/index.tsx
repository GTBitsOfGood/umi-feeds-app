import React from 'react';

import { Text, View } from '../../style/Themed';
import styles, { orangeColor } from './styles';

import CartButton from '../CartButton';

export default function Header(props: { title: string }) {
  return (
    <View style={styles.headerContainer}>
      <View style={{ alignSelf: 'center' }}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <CartButton onPress={() => alert('Cart Pressed!')} color={orangeColor} />
    </View>
  );
}
