import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import NewDishFormScreen from '../../../screens/Dishes/DishFormScreen';
import {
  DishScreenParamList,
} from './types';

const DishScreenStack = createStackNavigator<DishScreenParamList>();

function DishScreenNavigator() {
  return (
    <DishScreenStack.Navigator>
      <DishScreenStack.Screen
        name="DishesScreen"
        component={NewDishFormScreen}
        options={{ headerTitle: 'Dish Screen' }}
      />
    </DishScreenStack.Navigator>
  );
}

export default DishScreenNavigator;
