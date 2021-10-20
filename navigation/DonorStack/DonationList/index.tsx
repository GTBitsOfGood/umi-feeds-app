import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import DonationListScreen from '../../../screens/DonationList';
// import DonationScreen from '../../../screens/DonationScreen';
import { Header, DonateQuantityModal, DishQuantityPreview } from '../../components';

import {
  DonationScreenParamList,
} from '../DonationList/types';

const DonationListScreenStack = createStackNavigator();

function DonationListScreenNavigator() {
  return (
    <DonationListScreenStack.Navigator>
      <DonationListScreenStack.Screen
        name="DonationScreen"
        component={DonationListScreen}
        options={{ headerShown: false }}
      />
    </DonationListScreenStack.Navigator>
  );
}

export default DonationListScreenNavigator;
