import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from '../../style/Themed';
import { DonationForm } from '../../types';
import { ThemeColor } from '../../constants/Colors';
import { moderateScale } from '../../util/index';

function DonationListBox(props: { donation: DonationForm, selectedId: string, navigation: any, setSelectedList: (param1?: string) => void }) {
  const { donation, navigation } = props;
  const pickupEndTimeDate = new Date(props.donation.pickupEndTime);
  const endTime = `${pickupEndTimeDate.getMonth() + 1}/${pickupEndTimeDate.getDate()}/${pickupEndTimeDate.getFullYear()}`;
  let pickupTime = 'TBA';
  let color = '#FC8834';

  if (donation.confirmPickUpTime) {
    pickupTime = new Date(props.donation.pickupEndTime).toLocaleDateString('en-US');
    color = '#3E3E3E';
  }

  return (
    <Pressable
      style={donation._id === props.selectedId ? {
        marginBottom: 10,
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderColor: ThemeColor,
        borderWidth: 2,
        backgroundColor: 'rgba(243, 123, 54, 0.15)',
        height: moderateScale(120),
        borderRadius: 4
      } : {
        borderWidth: 2,
        borderRadius: 4,
        marginBottom: 10,
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderColor: color,
        height: moderateScale(120) }}
      onPress={() => props.setSelectedList(props.donation._id)}
    >
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.boldText}>{endTime}</Text>
        <Text
          style={{ color: '#5D5D5D', fontSize: 15, fontWeight: 'bold' }}
          onPress={() => navigation.navigate('DetailDonation', {
            donation
          })}
        >
          View ⟩
        </Text>
      </View>
      <View style={{ flex: 2, marginVertical: 5, flexDirection: 'row' }}>
        <Text style={styles.boldText}>Status:</Text>
        <Text style={styles.regText}>{` ${donation.status}`}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text style={styles.boldText}>Picked up at:</Text>
        <Text style={styles.regText}>{` ${pickupTime}`}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boldText: {
    color: '#3E3E3E',
    fontSize: 15,
    fontWeight: 'bold'
  },
  regText: {
    color: '#3E3E3E',
    fontSize: 15,
  }
});

export default DonationListBox;
