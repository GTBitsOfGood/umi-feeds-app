import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import MapScreen from '../../../screens/MapScreen';
import EditDonation from '../../../screens/EditDonation';
import DonationDetails from '../../../screens/DetailDonation';
import {
  MapScreenParamList,
} from './types';

const MapScreenStack = createStackNavigator<MapScreenParamList>();
// const DonationsListStack = createStackNavigator<DonationsListScreenParamList>();

function MapScreenNavigator() {
  return (
    <MapScreenStack.Navigator>
      <MapScreenStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerTitle: 'Donations Map' }}
      />
      <MapScreenStack.Screen
        name="DonationDetails"
        component={DonationDetails}
        options={{ headerTitle: 'Donation Details' }}
      />
      <MapScreenStack.Screen
        name="EditDonation"
        component={EditDonation}
        options={{ headerTitle: 'Edit Donation' }}
      />
    </MapScreenStack.Navigator>
  );
}

export default MapScreenNavigator;
