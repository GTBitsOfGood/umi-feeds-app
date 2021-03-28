import React from 'react';
import { View, Button } from 'react-native';
import { Text } from './Themed';

export default function EditDonation({ route, navigation }) {
  /* 2. Get the param */
  const { donationId } = route.params;
  const { otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Edit Details Screen</Text>
      <Text>
        donationId:
        {JSON.stringify(donationId)}
      </Text>
      <Text>
        otherParam:
        {JSON.stringify(otherParam)}
      </Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>

  );
}

// function EditDonationDetails() {
//     throw new Error('Function not implemented.');
// }
