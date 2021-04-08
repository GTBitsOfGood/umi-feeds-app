import React, { useState } from 'react';
import { Image, StyleSheet, ScrollView, Platform } from 'react-native';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import PlatformDateTimePicker from './PlatformDateTimePicker';
import { Text, View } from '../Themed';
import { logAxiosError } from '../../utils';

import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTime } from 'luxon';

function DonationForm() {
  const [description, setDescription] = useState('');
  const [pickupInstructions, setPickupInstructions] = useState('');
  const [weight, setWeight] = useState<number | ''>('');
  const [startDatetime, setStartDatetime] = useState(new Date(Date.now()));
  // Initially, the start datetime will be now, and the end will be a day from now
  const [endDatetime, setEndDatetime] = useState(new Date(Date.now() + 60 * 60 * 24 * 1000));

  const [rollImage, setRollImage] = useState<string | null>(null); // uri of image chosen from user's photo library
  const [cameraImage, setCameraImage] = useState<string | null>(null); // uri of image taken by camera

  const handleSubmit = () => {

    const file = { uri: cameraImage, name: 'image.jpg', type: 'image/jpeg' };
    const imageFormData = new FormData();
    imageFormData.append('image', file as any);

    axios.post('/api/donations', {
      donorID: '602bf82713e73d625cc0d522',
      availability: {
        startTime: startDatetime,
        endTime: endDatetime,
      },
      description: description !== '' ? description : undefined,
      pickupInstructions: pickupInstructions !== '' ? pickupInstructions : undefined,
      weight: weight !== '' ? weight : undefined,
      foodImages
    });
  };

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
      /*
      axios.post('/upload', cameraImageFormData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => console.log(res.data))
        .catch((err) => logAxiosError(err));
        */
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.donationContainer}>
          <Text style={styles.title}>Food Donation</Text>
          <Text style={styles.description}>Please provide the following information about your donation.</Text>

          <Text style={styles.sectionTitle}>Description of food (required)</Text>
          <View style={styles.boxInput}>
            <Input
              value={description}
              placeholder="Please list the food you wish to donate in this box"
              onChangeText={(desc: string) => setDescription(desc)}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              style={{ fontSize: 16 }}
              multiline
            />
          </View>

          <Text style={styles.sectionTitle}>Weight of food (optional)</Text>
          <View style={styles.boxInput}>
            <Input
              value={weight.toString()}
              placeholder="Please list the weight of each type of dish in pounds (lbs) here"
              onChangeText={(weight: string) => setWeight(Number.isFinite(+weight) && weight !== '' ? +weight : '')}
              keyboardType="numeric"
              inputContainerStyle={{ borderBottomWidth: 0 }}
              style={{ fontSize: 16 }}
              multiline
            />
          </View>

          <Text style={styles.sectionTitle}>Picture of donation (optional)</Text>
          <Text style={styles.description}>Please include a picture of the meals or entire donation</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>
            <Button
              title="Take a new picture"
              style={styles.pictureButton}
              titleStyle={{ fontSize: 16 }}
              onPress={takeImage}
            />
            <Button
              title="Use an existing picture"
              style={styles.pictureButton}
              titleStyle={{ fontSize: 16 }}
              onPress={pickImage}
            />
          </View>
          <View style={{ alignItems: 'center', padding: 20 }}>
            {cameraImage && <Image source={{ uri: cameraImage }} style={{ width: 200, height: 200 }} />}
            {rollImage && <Image source={{ uri: rollImage }} style={{ width: 200, height: 200 }} />}
          </View>

          <Text style={styles.sectionTitle}>Availability start time (required)</Text>
          <Text style={styles.description}>The earliest time the donation can be picked up</Text>
          <PlatformDateTimePicker datetime={startDatetime} setDatetime={setStartDatetime} />

          <Text style={styles.sectionTitle}>Availability end time (required)</Text>
          <Text style={styles.description}>The latest time the donation can be picked up by</Text>
          <PlatformDateTimePicker datetime={endDatetime} setDatetime={setEndDatetime} />
          {(Date.now() + 60 * 60 * 2 * 1000) > endDatetime.getTime()
            && <Text style={{ color: 'red' }}>End time is preferred to be at least two hours from now</Text>
          }

          <Text style={styles.sectionTitle}>Pickup instructions (optional)</Text>
          <View style={styles.boxInput}>
            <Input
              value={pickupInstructions}
              placeholder="If you have comments for the driver, please list them here"
              onChangeText={(instructions: string) => setPickupInstructions(instructions)}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              style={{ fontSize: 16 }}
              multiline
            />
          </View>

          <Button
            title="Submit"
            onPress={() => handleSubmit()}
            buttonStyle={{ backgroundColor: 'orange' }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    marginHorizontal: 0,
    width: '100%',
  },
  donationContainer: {
    width: '80%',
    margin: '10%',
    // marginTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    fontSize: 42,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'orange',
    paddingVertical: 10,
  },
  description: {
    color: 'gray',
    fontSize: 14,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 6,
  },
  boxInput: {
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 6,
    marginVertical: 10,
    fontFamily: 'Roboto',
  },
  pictureButton: {
    width: '90%',
  }
});

export default DonationForm;
