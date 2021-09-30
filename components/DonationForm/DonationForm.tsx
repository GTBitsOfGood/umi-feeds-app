import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, ScrollView, Platform } from 'react-native';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import PlatformDateTimePicker from './PlatformDateTimePicker';
import { Text, View } from '../../style/Themed';
import { store } from '../../redux/store';
import { logAxiosError } from '../../utils';
import { Donation } from '../../types';

/**
 * Form for creating a new donation. If the donationId prop is provided, then this is a form to edit the donation with
 * that donationId.
 * @param {string?} props.donationId If provided, this component fetches data for the donation on mount and preloads
 * the form fields with that data.
 */
function DonationForm(props: { donation?: Donation }) {
  const [description, setDescription] = useState(props.donation?.description ?? '');
  const [pickupInstructions, setPickupInstructions] = useState(props.donation?.pickupInstructions ?? '');
  const [weight, setWeight] = useState<number | ''>(props.donation?.weight ?? '');
  const [startDatetime, setStartDatetime] = useState(new Date(props.donation?.availability.startTime ?? Date.now()));
  // Initially, the start datetime will be now, and the end will be a day from now
  const [endDatetime, setEndDatetime] = useState(new Date(props.donation?.availability.endTime ?? Date.now() + 60 * 60 * 24 * 1000));
  const [refreshing, setRefreshing] = useState(false);

  const [uploadImage, setUploadImage] = useState<string | null>(null); // uri of image taken by camera

  // Not presently used
  const handleRefresh = () => {
    if (props.donation) {
      setRefreshing(true);
      axios
        .get<{ donation: Donation }>(`/api/donations/${props.donation._id}`)
        .then((res) => {
          const { donation } = res.data;
          setDescription(donation.description);
          setPickupInstructions(donation.pickupInstructions ?? '');
          setWeight(donation.weight ?? '');
          setStartDatetime(new Date(donation.availability.startTime)); // TODO: test if this conversion works properly
          setEndDatetime(new Date(donation.availability.endTime));
          setRefreshing(false);
        });
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    if (uploadImage) {
      const file = { uri: uploadImage, name: 'image.jpg', type: 'image/jpeg' };
      formData.append('foodImages', file as any);
    }
    const json = {
      availability: {
        startTime: startDatetime,
        endTime: endDatetime,
      },
      description: description !== '' ? description : undefined,
      pickupInstructions: pickupInstructions !== '' ? pickupInstructions : undefined,
      weight: weight !== '' ? weight : undefined,
    };
    formData.append('json', JSON.stringify(json));
    console.log('Submitting form');
    if (!props.donation?._id) {
      axios
        .post('/api/donations', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${store.getState().auth.jwt}`
          }
        })
        .then((res) => console.log(res.data))
        .catch((err) => logAxiosError(err));
    } else {
      // TODO: Change this and the PUT /donations backend endpoint so that we can upload an image
      axios
        .put(`/api/donations?donation_id=${props.donation._id}`, json, {
          headers: {
            Authorization: `Bearer ${store.getState().auth.jwt}`
          }
        })
        .then((res) => console.log(res.data))
        .catch((err) => logAxiosError(err));
    }
  };

  const handleDelete = () => {
    if (props.donation?._id) {
      axios.delete(`/api/donations/${props.donation._id}`)
        .then((res) => console.log(res.data))
        .catch((err) => logAxiosError(err));
    }
  };

  // Choose an image from the user's photo library
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
      setUploadImage(result.uri);
    }
  };

  // Take a photo using the user's camera
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
      setUploadImage(result.uri);
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
            {uploadImage && <Image source={{ uri: uploadImage }} style={{ width: 200, height: 200 }} />}
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
          {props.donation?._id && (
            <Button
              title="Delete"
              onPress={() => handleDelete()}
              // buttonStyle={{ backgroundColor: 'gray' }}
            />
          )}
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
