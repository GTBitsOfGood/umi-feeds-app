import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import FilePickerScreen from '../screens/FilePickerScreen';
import DonationScreen from '../screens/DonationScreen';
import MapScreen from '../screens/MapScreen';
import DonationsListScreen from '../screens/DonationsListScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, DonationScreenParamList, MapScreenParamList, DonationsListScreenParamList, FilePickerParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="DonationScreen"
        component={DonationScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="FilePickerScreen"
        component={FilePickerNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="MapScreen"
        component={MapScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="DonationsListScreen"
        component={DonationsListNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
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
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}
const FilePickerStack = createStackNavigator<FilePickerParamList>();

function FilePickerNavigator() {
  return (
    <FilePickerStack.Navigator>
      <FilePickerStack.Screen
        name="FilePickerScreen"
        component={FilePickerScreen}
        options={{ headerTitle: 'File Picker' }}
      />
    </FilePickerStack.Navigator>
  );
}

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
        options={{ headerTitle: 'Map Screen' }}
      />
    </MapScreenStack.Navigator>
  );
}

const DonationsListStack = createStackNavigator<DonationsListScreenParamList>();

function DonationsListNavigator() {
  return (
    <DonationsListStack.Navigator>
      <DonationsListStack.Screen
        name="DonationsListScreen"
        component={DonationsListScreen}
        options={{ headerTitle: 'Donations List Screen' }}
      />
    </DonationsListStack.Navigator>
  );
}
