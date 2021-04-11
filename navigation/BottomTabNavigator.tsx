import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import DonationScreen from '../screens/DonationScreen';
import DonationsListScreen from '../screens/DonationsListScreen';
import MapScreen from '../screens/MapScreen';
import EditDonation from '../screens/EditDonation';
import DonationDetails from '../screens/DetailDonation';
import LoginScreen from '../screens/LoginScreen';
import {
  BottomTabParamList,
  DonationScreenParamList,
  MapScreenParamList,
  DonationsListScreenParamList,
  LoginScreenParamList,
} from '../types';
import NewDonorName from '../screens/NewDonor/NewDonorName';
import NewDonorNumber from '../screens/NewDonor/NewDonorNumber';
import NewDonorLocation from '../screens/NewDonor/NewDonorLocation';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Login"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Login"
        component={LoginScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="log-in" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Donate"
        component={DonationScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="fast-food" color={color} />,
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
        name="DonationsList"
        component={DonationsListNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const DonationScreenStack = createStackNavigator<DonationScreenParamList>();

function DonationScreenNavigator() {
  return (
    <DonationScreenStack.Navigator>
      <DonationScreenStack.Screen
        name="DonationScreen"
        component={DonationScreen}
        options={{ headerTitle: 'Donation Screen' }}
      />
    </DonationScreenStack.Navigator>
  );
}

const MapScreenStack = createStackNavigator<MapScreenParamList>();

function MapScreenNavigator() {
  return (
    <MapScreenStack.Navigator>
      <MapScreenStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerTitle: 'Donations Map' }}
      />
      <MapScreenStack.Screen
        name="DonationDetails"
        component={DonationDetails}
        options={{ headerTitle: 'Donation Details' }}
      />
    </MapScreenStack.Navigator>
  );
}

const LoginScreenStack = createStackNavigator<LoginScreenParamList>();

function LoginScreenNavigator() {
  return (
    <LoginScreenStack.Navigator>
      <LoginScreenStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: 'Login' }}
      />
      <LoginScreenStack.Screen
        name="NewDonorName"
        component={NewDonorName}
        options={{ headerShown: false }}
      />
      <LoginScreenStack.Screen
        name="NewDonorNumber"
        component={NewDonorNumber}
        options={{ headerShown: false }}
      />
      <LoginScreenStack.Screen
        name="NewDonorLocation"
        component={NewDonorLocation}
        options={{ headerShown: false }}
      />
    </LoginScreenStack.Navigator>
  );
}

const DonationsListStack = createStackNavigator<DonationsListScreenParamList>();

function DonationsListNavigator() {
  return (
    <DonationsListStack.Navigator>
      <DonationsListStack.Screen
        name="DonationsListScreen"
        component={DonationsListScreen}
        options={{ headerTitle: 'Donations List' }}
      />
      <DonationsListStack.Screen
        name="DetailDonation"
        component={DonationDetails}
        options={{ headerTitle: 'Donation Details' }}
      />
      <DonationsListStack.Screen
        name="EditDonation"
        component={EditDonation}
        options={{ headerTitle: 'Edit Donation' }}
      />
    </DonationsListStack.Navigator>
  );
}
