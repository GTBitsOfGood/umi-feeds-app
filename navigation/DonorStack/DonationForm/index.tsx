import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import DonationScreen from '../../../screens/DonationScreen';
import {
  DonationScreenParamList,
} from './types';

const DonationScreenStack = createStackNavigator<DonationScreenParamList>();

function DonationScreenNavigator() {
  return (
    <DonationScreenStack.Navigator>
      <DonationScreenStack.Screen
        name="DonationScreen"
        component={DonationScreen}
        options={{ headerTitle: 'Donation Screen' }}
      />
    </DonationScreenStack.Navigator>
  );
}

export default DonationScreenNavigator;
