import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import DonationScreen from '../../../screens/DonateTab';
import DishSearch from '../../../screens/Dishes/DishSearchScreen';
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
        options={{ headerTitle: 'Donation Screen', headerShown: false }}
      />
      <DonationScreenStack.Screen
        name="DishSearch"
        component={DishSearch}
        options={{ headerTitle: 'Donation Screen', headerShown: false }}
      />
    </DonationScreenStack.Navigator>
  );
}

export default DonationScreenNavigator;
