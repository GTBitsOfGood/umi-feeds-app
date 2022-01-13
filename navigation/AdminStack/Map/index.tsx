import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import MapScreen from '../../../screens/MapScreen';
import {
  MapScreenParamList,
} from './types';

const MapScreenStack = createStackNavigator<MapScreenParamList>();

function MapScreenNavigator() {
  return (
    <MapScreenStack.Navigator>
      <MapScreenStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerTitle: 'Donations Map' }}
      />
    </MapScreenStack.Navigator>
  );
}

export default MapScreenNavigator;
