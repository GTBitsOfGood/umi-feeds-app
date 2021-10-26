import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Button } from 'react-native';
import { ChevronButton } from '../../../components';
import DonationListScreen from '../../../screens/DonationList';
// import DonationScreen from '../../../screens/DonationScreen';

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
        options={{
          headerShown: false,
          headerLeft: () => (
            <ChevronButton
              onPress={() => alert('This is a button!')}
              text="Back"
            />
          ),
        }}
      />
    </DonationListScreenStack.Navigator>
  );
}

export default DonationListScreenNavigator;
