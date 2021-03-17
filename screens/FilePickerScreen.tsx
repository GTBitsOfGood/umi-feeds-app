import React, { useState } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { logAxiosError } from '../utils';

export default function FilePickerScreen() {
  const [rollImage, setRollImage] = useState<string | null>(null);
  const [takenImage, setTakenImage] = useState<string | null>(null);

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need image roll permissions to be able to upload an image');
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
      const pickRollFormData = new FormData();
      pickRollFormData.append('image', file as any);
      axios.post('/upload', pickRollFormData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => console.log(res.data))
        .catch((err) => logAxiosError(err));
    }
  };

  const takeImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
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
      setTakenImage(result.uri);
      const takeCameraFormData = new FormData();
      takeCameraFormData.append('image', file as any);
      axios.post('/upload', takeCameraFormData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => console.log(res.data))
        .catch((err) => logAxiosError(err));
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Take a picture" onPress={takeImage} />
      {takenImage && <Image source={{ uri: takenImage }} style={{ width: 200, height: 200 }} />}

      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {rollImage && <Image source={{ uri: rollImage }} style={{ width: 200, height: 200 }} />}
    </View>

  );
}
