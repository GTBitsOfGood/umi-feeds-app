import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import DonationsListScreen from '../../../screens/DonationsListScreen';
import EditDonation from '../../../screens/EditDonation';
import DonationDetails from '../../../screens/DetailDonation';
import {
  DonationsListScreenParamList,
} from './types';

const DonationsListStack = createStackNavigator<DonationsListScreenParamList>();

function DonationsListNavigator() {
  return (
    <DonationsListStack.Navigator>
      <DonationsListStack.Screen
        name="DonationsListScreen"
        component={DonationsListScreen}
        options={{ headerTitle: 'Donations List' }}
      />
      <DonationsListStack.Screen
        name="DetailDonation"
        component={DonationDetails}
        options={{ headerTitle: 'Donation Details' }}
      />
      <DonationsListStack.Screen
        name="EditDonation"
        component={EditDonation}
        options={{ headerTitle: 'Edit Donation' }}
      />
    </DonationsListStack.Navigator>
  );
}

export default DonationsListNavigator;
