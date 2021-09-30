import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
// import DonateFormAddressScreen from '../../../screens/DonationForm/AddressScreen';
import { DonateReviewScreen, DonateAddressScreen, DonateSchedulePickupScreen, DonateListscreen } from '../../../screens/DonationForm';
import { NewDishFormScreen, DishProfileScreen, DishSearchScreen } from '../../../screens/Dishes';
import DonateHomePage from '../../../screens/DonateTab';

import {
  DonateTabParamList,
} from './types';

const DonationScreenStack = createStackNavigator<DonateTabParamList>();

function DonateTab() {
  return (
    <DonationScreenStack.Navigator>
      <DonationScreenStack.Screen
        name="DonateHomeScreen"
        component={DonateHomePage}
        options={{ headerTitle: 'Donate' }}
      />
      <DonationScreenStack.Screen
        name="NewDishForm"
        component={NewDishFormScreen}
        options={{ headerTitle: 'New Dish' }}
      />
      <DonationScreenStack.Screen
        name="DishProfile"
        component={DishProfileScreen}
        options={{ headerTitle: 'New Dish' }}
      />
      <DonationScreenStack.Screen
        name="DishSearch"
        component={DishSearchScreen}
        options={{ headerTitle: 'New Dish' }}
      />
      <DonationScreenStack.Screen
        name="DonateListScreen"
        component={DonateListscreen}
        options={{ headerTitle: 'Donate' }}
      />
      <DonationScreenStack.Screen
        name="AddressScreen"
        component={DonateAddressScreen}
        options={{ headerTitle: 'Donate' }}
      />
      <DonationScreenStack.Screen
        name="SchedulePickupScreen"
        component={DonateSchedulePickupScreen}
        options={{ headerTitle: 'Donate' }}
      />
      <DonationScreenStack.Screen
        name="ReviewScreen"
        component={DonateReviewScreen}
        options={{ headerTitle: 'Donate' }}
      />
    </DonationScreenStack.Navigator>
  );
}

export default DonateTab;