import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import ProfileNavigator from '../../navigation/SharedStack/UserProfile';
import {
  AdminBottomTabParamList,
} from './types';
import DonationList from '../screens/DonationList';
import MyDonationScreen from '../screens/ScreenTemplate/MyDonations';

const BottomTab = createBottomTabNavigator<AdminBottomTabParamList>();

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

function AdminTabs() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="My Donations"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint, style: styles.container }}
    >
      <BottomTab.Screen
        name="My Donations"
        component={MyDonationScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Donation List"
        component={DonationList}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
export {
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
