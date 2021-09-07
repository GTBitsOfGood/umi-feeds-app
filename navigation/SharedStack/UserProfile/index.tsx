import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import ProfileScreen from '../../../screens/UserProfile';
import { UserProfileStackParamList } from './types';

const UserProfileStack = createStackNavigator<UserProfileStackParamList>();

export default function UserProfile() {
  return (
    <UserProfileStack.Navigator>
      <UserProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: 'Login' }}
      />
    </UserProfileStack.Navigator>
  );
}
