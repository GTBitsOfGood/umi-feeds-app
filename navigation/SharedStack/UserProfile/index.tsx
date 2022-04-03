import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProfileScreen, EditUserProfileScreen } from '../../../screens/UserProfile';
import { UserGuideOne, UserGuideTwo, UserGuideThree, UserGuideFour, UserGuideFive, FAQ, Help } from '../../../screens/UserGuideScreens';

import { UserProfileScreenParamList } from './types';

const UserProfileScreenStack = createStackNavigator<UserProfileScreenParamList>();

export default function UserProfileScreenNavigator() {
  return (
    <UserProfileScreenStack.Navigator>
      <UserProfileScreenStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ headerTitle: '' }}
      />
      <UserProfileScreenStack.Screen
        name="EditUserProfileScreen"
        component={EditUserProfileScreen}
        options={{ headerTitle: '' }}
      />
      <UserProfileScreenStack.Screen
        name="HelpScreen"
        component={Help}
        options={{ headerTitle: '',
          headerTintColor: '#F37B36'
        }}
      />
      <UserProfileScreenStack.Screen
        name="UserGuideOne"
        component={UserGuideOne}
        options={{ headerTitle: '',
          headerStyle: {
            backgroundColor: '#F37B36',
          },
          headerTintColor: '#fff'
        }}
      />
      <UserProfileScreenStack.Screen
        name="UserGuideTwo"
        component={UserGuideTwo}
        options={{ headerTitle: '',
          headerStyle: {
            backgroundColor: '#F37B36',
          },
          headerTintColor: '#fff'
        }}
      />
      <UserProfileScreenStack.Screen
        name="UserGuideThree"
        component={UserGuideThree}
        options={{ headerTitle: '',
          headerStyle: {
            backgroundColor: '#F37B36',
          },
          headerTintColor: '#fff'
        }}
      />
      <UserProfileScreenStack.Screen
        name="UserGuideFour"
        component={UserGuideFour}
        options={{ headerTitle: '',
          headerStyle: {
            backgroundColor: '#F37B36',
          },
          headerTintColor: '#fff'
        }}
      />
      <UserProfileScreenStack.Screen
        name="UserGuideFive"
        component={UserGuideFive}
        options={{ headerTitle: '',
          headerStyle: {
            backgroundColor: '#F37B36',
          },
          headerTintColor: '#fff'
        }}
      />
      <UserProfileScreenStack.Screen
        name="FAQScreen"
        component={FAQ}
        options={{ headerTitle: '',
          headerTintColor: '#F37B36'
        }}
      />
    </UserProfileScreenStack.Navigator>
  );
}
