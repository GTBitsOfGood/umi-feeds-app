import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Text, View } from '../../style/Themed';
import styles from './styles';
import { ThemeColor } from '../../constants/Colors';

import CartButton from '../CartButton';
import { DonateTabParamList } from '../../navigation/DonorStack/Donate/types';

type DonationScreenProp = StackNavigationProp<DonateTabParamList, 'DonateHomeScreen'>;

export default function Header(props: { title: string, showCartButton?: boolean }) {
  const navigation = useNavigation<DonationScreenProp>();

  return (
    <View style={styles.headerContainer}>
      <View style={{ alignSelf: 'center' }}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      {(props.showCartButton !== false) && <CartButton onPress={() => navigation.navigate('DonateListScreen')} color={ThemeColor} />}
    </View>
  );
}
