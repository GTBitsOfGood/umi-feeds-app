/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { scale } from '../../util';

import { DonationForm } from '../../types';

type RowProps = {
  donationForm: DonationForm,
  navigation: any
}

function Row({ donationForm, navigation }: RowProps) {
  let { businessName } = donationForm;
  const currDate = new Date(donationForm.pickupEndTime);
  const endDate = currDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  const statusLabel = () => {
    if (donationForm.status === 'Overdue') {
      return (
        <Pressable style={{
          width: '18%',
          borderRadius: 4,
          borderColor: '#E90000',
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        }}
        >
          <Text style={{ fontSize: 11, color: '#E90000', fontWeight: 'bold' }}>Overdue</Text>
        </Pressable>
      );
    } else if (donationForm.status === 'Pending') {
      return (
        <Pressable style={{
          width: '18%',
          borderRadius: 4,
          borderColor: '#5D5D5D',
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        }}
        >
          <Text style={{ fontSize: 11, color: '#5D5D5D', fontWeight: 'bold' }}>Pending</Text>
        </Pressable>
      );
    } else if (donationForm.status === 'Unclaim') {
      return (
        <Pressable style={{
          width: '18%',
          borderRadius: 4,
          borderColor: '#007FA7',
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        }}
        >
          <Text style={{ fontSize: 10, color: '#007FA7', fontWeight: 'bold' }}>Unclaimed</Text>
        </Pressable>
      );
    } else if (donationForm.status === 'Claimed') {
      return (
        <Pressable style={{
          width: '18%',
          borderRadius: 4,
          borderColor: '#00883F',
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        }}
        >
          <Text style={{ fontSize: 11, color: '#00883F', fontWeight: 'bold' }}>Claimed</Text>
        </Pressable>
      );
    } else {
      return (
        <Pressable style={{
          width: '18%',
          borderRadius: 4,
          borderColor: '#00883F',
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00883F'
        }}
        >
          <Text style={{ fontSize: 11, color: '#FFFFFF', fontWeight: 'bold' }}>Delivered</Text>
        </Pressable>
      );
    }
  };

  // check if donationForm is undefined
  if (donationForm.businessName !== undefined && donationForm.businessName.length > 10) {
    businessName = `${donationForm.businessName.slice(0, 10)}...`;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
      }}
    >
      <View style={{
        flex: 8,
        flexDirection: 'row' }}
      >
        <Text style={{ fontSize: 15, width: '35%', fontStyle: 'italic' }}>{businessName}</Text>
        <Text style={{ fontSize: 15, width: '35%', fontStyle: 'italic' }}>{endDate}</Text>
        {statusLabel()}
        <TouchableOpacity
          // onPress={() => console.log('you pressed a donation')}
          onPress={() => navigation.navigate('DetailDonationOnQueue', {
            donationForm
          })}
        >
          <Icon name="chevron-thin-right" size={15} style={{ color: '#5D5D5D', marginLeft: scale(25) }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Row;
