import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { UserGuideOne, UserGuideTwo, UserGuideThree, UserGuideFour, UserGuideFive, FAQ, Help } from '../../screens/UserGuideScreens';
import {
  UserGuideParamList
} from './types';

const UserGuidesStack = createStackNavigator<UserGuideParamList>();

// // Create your stack with the separate screens
export default function UserGuideStack() {
  return (
    <UserGuidesStack.Navigator>
      <UserGuidesStack.Screen
        name="UserGuideOne"
        component={UserGuideOne}
        options={{ headerTitle: '',
          headerStyle: {
            backgroundColor: '#F37B36',
          },
          headerTintColor: '#fff'
        }}
      />
      <UserGuidesStack.Screen
        name="UserGuideTwo"
        component={UserGuideTwo}
        options={{ headerTitle: '',
          headerStyle: {
            backgroundColor: '#F37B36',
          },
          headerTintColor: '#fff'
        }}
      />
      <UserGuidesStack.Screen
        name="UserGuideThree"
        component={UserGuideThree}
        options={{ headerTitle: '',
          headerStyle: {
            backgroundColor: '#F37B36',
          },
          headerTintColor: '#fff'
        }}
      />
      <UserGuidesStack.Screen
        name="UserGuideFour"
        component={UserGuideFour}
        options={{ headerTitle: '',
          headerStyle: {
            backgroundColor: '#F37B36',
          },
          headerTintColor: '#fff'
        }}
      />
      <UserGuidesStack.Screen
        name="UserGuideFive"
        component={UserGuideFive}
        options={{ headerTitle: '',
          headerStyle: {
            backgroundColor: '#F37B36',
          },
          headerTintColor: '#fff'
        }}
      />
      <UserGuidesStack.Screen
        name="FAQScreen"
        component={FAQ}
        options={{ headerTitle: '',
          headerTintColor: '#F37B36'
        }}
      />
      <UserGuidesStack.Screen
        name="HelpScreen"
        component={Help}
        options={{ headerTitle: '',
          headerTintColor: '#F37B36'
        }}
      />
    </UserGuidesStack.Navigator>
  );
}
