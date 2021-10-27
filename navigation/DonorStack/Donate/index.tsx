import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { DonateReviewScreen, DonateAddressScreen, DonateSchedulePickupScreen, DonateListscreen, EditAddressScreen } from '../../../screens/DonationForm';
import DonationListScreen from '../../../screens/DonationList';

import { NewDishFormScreen, DishProfileScreen, DishSearchScreen } from '../../../screens/Dishes';
import DonateHomePage from '../../../screens/DonateTab';
import DishSearch from '../../../screens/Dishes/DishSearchScreen';

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
        options={{ headerTitle: 'Donate', headerShown: false }}
      />
      <DonationScreenStack.Screen
        name="DonateSearchDish"
        component={DishSearch}
        options={{ headerTitle: 'Donate', headerShown: false }}
      />
      <DonationScreenStack.Screen
        name="NewDishForm"
        component={NewDishFormScreen}
        options={{ headerTitle: 'New Dish' }}
      />
      <DonationScreenStack.Screen
        name="DishProfile"
        component={DishProfileScreen}
        options={{ headerTitle: 'New Dish', headerShown: false }}
      />
      <DonationScreenStack.Screen
        name="DishSearch"
        component={DishSearchScreen}
        options={{ headerTitle: 'Dish Search', headerShown: false }}
      />
      <DonationScreenStack.Screen
        name="DonateListScreen"
        component={DonationListScreen}
        options={{ headerShown: false }}
      />
      <DonationScreenStack.Screen
        name="AddressScreen"
        component={DonateAddressScreen}
        options={{ headerTitle: 'Donate', headerShown: false }}
      />
      <DonationScreenStack.Screen
        name="EditAddressScreen"
        component={EditAddressScreen}
        options={{ headerTitle: 'Donate', headerShown: false }}
      />
      <DonationScreenStack.Screen
        name="SchedulePickupScreen"
        component={DonateSchedulePickupScreen}
        options={{ headerTitle: 'Donate' }}
      />
      <DonationScreenStack.Screen
        name="ReviewCartScreen"
        component={DonateReviewScreen}
        options={{ headerTitle: 'Donate' }}
      />
      <DonationScreenStack.Screen
        name="ReviewContactScreen"
        component={DonateReviewScreen}
        options={{ headerTitle: 'Donate' }}
      />
    </DonationScreenStack.Navigator>
  );
}

export default DonateTab;
