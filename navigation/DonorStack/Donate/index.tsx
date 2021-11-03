import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { DonateAddressScreen, DonateReviewDonationCart, DonateListScreen, EditAddressScreen, SchedulePickupScreen } from '../../../screens/DonationForm';
import { NewDishFormScreen, DishProfileScreen, DishSearchScreen } from '../../../screens/Dishes';
import DonateHomePage from '../../../screens/DonateTab';
import DishSearch from '../../../screens/Dishes/DishSearchScreen';
import ReviewContactScreen from '../../../screens/DonationForm/ReviewScreen/ReviewContact';

import {
  DonateTabParamList,
} from './types';
import { Dish } from '../../../screens/Dishes/DishProfileScreen/types';

const DonationScreenStack = createStackNavigator<DonateTabParamList>();

const MockDish = {
  _id: 'flkjawfjf',
  dishName: 'Cheesy Garlic Chicken Parmesan',
  cost: 8.00,
  pounds: 2,
  allergens: ['Walnuts', 'Peanuts', 'Gluten'],
  imageLink: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-202102-airfryerchickenparm-180-ls-1612561654.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*',
  favorite: true,
  comments: '',
} as Dish;

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
        options={{ headerTitle: 'New Dish', headerShown: false }} // @ts-ignore typescript upset about initialParams
        initialParams={{ dish: MockDish, canEdit: true }}
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
        component={SchedulePickupScreen}
        options={{ headerTitle: 'Donate', headerShown: false }}
      />
      <DonationScreenStack.Screen
        name="ReviewCartScreen"
        component={DonateReviewDonationCart}
        options={{ headerTitle: 'Donate', headerShown: false }}
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
