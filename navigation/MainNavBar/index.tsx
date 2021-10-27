import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

import HomeScreenNavigator from '../SharedStack/Home';
import MapScreenNavigator from '../AdminStack/Map';
import DonationScreenNavigator from '../DonorStack/DonationForm';
import DonationsListNavigator from '../AdminStack/DonationList';
import DonateTab from '../DonorStack/Donate';
import ProfileNavigator from '../SharedStack/UserProfile';
import Pickup from '../../screens/DonationForm/SchedulePickupScreen';

import {
  BottomTabParamList,
} from './types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
function DonorTabs() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint, style: styles.container }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
        }}
      />
      <BottomTab.Screen
        name="Donate"
        component={DonateTab}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="hand-heart" size={30} color={color} style={{ marginBottom: -3 }} />,
        }}
      />
      <BottomTab.Screen
        name="Me"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="testing"
        component={Pickup}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="hand-heart" size={30} color={color} style={{ marginBottom: -3 }} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function AdminTabs() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint, style: styles.container }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Map"
        component={MapScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Donations"
        component={DonationsListNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Me"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

export {
  DonorTabs,
  AdminTabs
};

const styles = StyleSheet.create({
  container: {
    height: '9%',
    paddingBottom: 5,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    shadowColor: 'rgba(144, 144, 144, 1)',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 12
  },
});
