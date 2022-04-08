import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

import HomeScreenNavigator from '../../SharedStack/Home';
import DonateTab from '../../DonorStack/Donate';
import ProfileNavigator from '../../SharedStack/UserProfile';

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
    </BottomTab.Navigator>
  );
}

export {
  DonorTabs
};

const styles = StyleSheet.create({
  container: {
    height: '12%',
    paddingBottom: '7%',
    paddingTop: '2%',
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
