import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

import { TouchableHighlight } from 'react-native';

import { Text, View } from '../../style/Themed';
import { orangeColor } from '../DonationForm/styles';

export default function ChevronButton(props: { text: string, onPress: () => void }) {
  return (
    <View style={{ marginLeft: -20 }}>
      <TouchableHighlight
        onPress={props.onPress}
        underlayColor="transparent"
      >
        <View style={{ flexGrow: 1, flexDirection: 'row', alignContent: 'center' }}>
          <Icon name="chevron-thin-left" size={20} style={{ color: orangeColor }} />
          <Text style={{ fontSize: 16, color: orangeColor, fontWeight: '400', marginLeft: 4 }}>
            {props.text}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
