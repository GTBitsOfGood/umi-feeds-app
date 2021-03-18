import React, { useState } from 'react';
import { Button, Image, View, Text, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { logAxiosError } from '../utils';

export default function FilePickerScreen() {
  const [rollImage, setRollImage] = useState<string | null>(null); // uri of image chosen from user's photo library
  const [cameraImage, setCameraImage] = useState<string | null>(null); // uri of image taken by camera

  // Choose an image from the user's photo library and upload it to POST /upload
  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      cropping: false,
    });
    if (!result.cancelled) {
      const file = { uri: result.uri, name: 'image.jpg', type: 'image/jpeg' };
      setRollImage(result.uri);
      const rollImageFormData = new FormData();
      rollImageFormData.append('image', file as any);
      axios.post('/upload', rollImageFormData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => console.log(res.data))
        .catch((err) => logAxiosError(err));
    }
  };

  // Take a photo using the user's camera and upload it to POST /upload
  const takeImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      const file = { uri: result.uri, name: 'image.jpg', type: 'image/jpeg' };
      setCameraImage(result.uri);
      const cameraImageFormData = new FormData();
      cameraImageFormData.append('image', file as any);
      axios.post('/upload', cameraImageFormData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => console.log(res.data))
        .catch((err) => logAxiosError(err));
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Take a picture" onPress={takeImage} />
      {cameraImage && <Image source={{ uri: cameraImage }} style={{ width: 200, height: 200 }} />}
      <Text>{'\n'}</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {rollImage && <Image source={{ uri: rollImage }} style={{ width: 200, height: 200 }} />}
    </View>

  );
}
