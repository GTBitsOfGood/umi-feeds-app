import * as React from 'react';
import { StyleSheet } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Text, View } from '../components/Themed';
import EditScreenInfo from '../components/EditScreenInfo';

export default function TabOneScreen() {
  const checkPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status === null) {
      return <View />;
    } else if (status === 'granted') {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} />
        </View>
      );
    } else {
      return <Text> Permission to camera is denied </Text>;
    }
  };

  return (

    <View style={styles.container}>

      <TouchableOpacity
        onPress={checkPermission}
      >
        <Text style={styles.title}> Camera </Text>

      </TouchableOpacity>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  }
});
