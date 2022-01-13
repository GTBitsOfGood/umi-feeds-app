import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProfileScreen, EditUserProfileScreen } from '../../../screens/UserProfile';

import { UserProfileScreenParamList } from './types';

const UserProfileScreenStack = createStackNavigator<UserProfileScreenParamList>();

export default function UserProfileScreenNavigator() {
  return (
    <UserProfileScreenStack.Navigator>
      <UserProfileScreenStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ headerTitle: 'My Account', headerShown: false }}
      />
      <UserProfileScreenStack.Screen
        name="EditUserProfileScreen"
        component={EditUserProfileScreen}
        options={{ headerTitle: 'Edit Profile' }}
      />
    </UserProfileScreenStack.Navigator>
  );
}
