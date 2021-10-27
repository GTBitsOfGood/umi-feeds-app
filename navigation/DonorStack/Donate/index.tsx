import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { DonateReviewScreen, DonateAddressScreen, DonateSchedulePickupScreen, DonateListScreen, EditAddressScreen } from '../../../screens/DonationForm';

import { NewDishFormScreen, DishProfileScreen, DishSearchScreen } from '../../../screens/Dishes';
import DonateHomePage from '../../../screens/DonateTab';
import DishSearch from '../../../screens/Dishes/DishSearchScreen';
import ReviewContactScreen from '../../../screens/DonationForm/ReviewScreen/ReviewContact';

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
        component={DonateListScreen}
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
        component={ReviewContactScreen}
        options={{ headerTitle: 'Donate', headerShown: false }}
      />
    </DonationScreenStack.Navigator>
  );
}

export default DonateTab;
