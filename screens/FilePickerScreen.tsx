import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function FilePickerScreen() {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync() && await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const [rollImage, setRollImage] = useState<string | null>(null);
  const [takenImage, setTakeImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      cropping: false,
    });
    let file;
    if (!result.cancelled) {
      file = { uri: result.uri, name: 'image.jpg' };
      setRollImage(result.uri);
    }
    const pickRollFormData = new FormData();
    pickRollFormData.append('image', file as any);
    axios({
      method: 'post',
      url: '/upload',
      data: pickRollFormData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  const takeImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    let file;
    if (!result.cancelled) {
      file = { uri: result.uri, name: 'image.jpg' };
      setTakeImage(result.uri);
    }
    const takeCameraFormData = new FormData();
    takeCameraFormData.append('image', file as any);
    axios({
      method: 'post',
      url: 'http://localhost:3000/upload',
      data: takeCameraFormData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
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
