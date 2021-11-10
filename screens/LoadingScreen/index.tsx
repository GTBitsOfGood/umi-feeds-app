import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';

import { RootStackParamList } from '../../navigation/types';
import { setLoading } from '../../redux/reducers/loadingReducer';

export default function LoadingScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'Loading'>) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Loading</Text> */}
      <ActivityIndicator />
      <TouchableOpacity onPress={() => {
        dispatch(setLoading({ loading: false }));
      }}
      >
        <Text style={{ color: '#eee', marginTop: 20 }}>Set loading</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
