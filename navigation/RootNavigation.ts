import * as React from 'react';
import { NavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  try {
    navigationRef.current?.goBack();
  } catch (e) {
    navigationRef.current?.navigate('Home');
  }
}
