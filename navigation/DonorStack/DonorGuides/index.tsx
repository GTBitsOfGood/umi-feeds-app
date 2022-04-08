import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UserGuideOne, UserGuideTwo, UserGuideThree, UserGuideFour, UserGuideFive } from '../../../screens/UserGuideScreens';

import { DonorGuidesParamList } from './types';

const DonorGuidesScreenStack = createStackNavigator<DonorGuidesParamList>();

export default function DonorGuidesScreenNavigator() {
  return (
    <DonorGuidesScreenStack.Navigator>
      <DonorGuidesScreenStack.Screen
        name="UserGuideOne"
        component={UserGuideOne}
        options={{ headerTitle: '',
          headerStyle: {
            backgroundColor: '#F37B36',
          },
          headerTintColor: '#fff'
        }}
      />
      <DonorGuidesScreenStack.Screen
        name="UserGuideTwo"
        component={UserGuideTwo}
        options={{ headerTitle: '',
          headerStyle: {
            backgroundColor: '#F37B36',
          },
          headerTintColor: '#fff'
        }}
      />
      <DonorGuidesScreenStack.Screen
        name="UserGuideThree"
        component={UserGuideThree}
        options={{ headerTitle: '',
          headerStyle: {
            backgroundColor: '#F37B36',
          },
          headerTintColor: '#fff'
        }}
      />
      <DonorGuidesScreenStack.Screen
        name="UserGuideFour"
        component={UserGuideFour}
        options={{ headerTitle: '',
          headerStyle: {
            backgroundColor: '#F37B36',
          },
          headerTintColor: '#fff'
        }}
      />
      <DonorGuidesScreenStack.Screen
        name="UserGuideFive"
        component={UserGuideFive}
        options={{ headerTitle: '',
          headerStyle: {
            backgroundColor: '#F37B36',
          },
          headerTintColor: '#fff'
        }}
      />
    </DonorGuidesScreenStack.Navigator>
  );
}
