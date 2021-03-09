import React, { useState } from 'react';
import { Button, StyleSheet, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import Constants from 'expo-constants';
import axios from 'axios';
import HidableDatePicker from './HideableDatePicker';
import { Text, View } from '../Themed';

function DonationForm() {
  const [description, setDescription] = useState('');
  const [pickupInstructions, setPickupInstructions] = useState('');
  const [weight, setWeight] = useState<number | ''>('');
  const [startDatetime, setStartDatetime] = useState(new Date(Date.now()));
  // Initially, the start datetime will be now, and the end will be a day from now
  const [endDatetime, setEndDatetime] = useState(new Date(Date.now() + 60 * 60 * 24 * 1000));

  const handleSubmit = () => {
    // fetch('http://localhost:3000/api/donations', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     donorID: '602bf82713e73d625cc0d522',
    //     availability: {
    //       startTime: startDatetime,
    //       endTime: endDatetime,
    //     },
    //     description: description !== '' ? description : undefined,
    //     pickupInstructions: pickupInstructions !== '' ? pickupInstructions : undefined,
    //     weight: weight !== '' ? weight : undefined,
    //   }),
    // });
    axios.post('/api/donations', {
      donorID: '602bf82713e73d625cc0d522',
      availability: {
        startTime: startDatetime,
        endTime: endDatetime,
      },
      description: description !== '' ? description : undefined,
      pickupInstructions: pickupInstructions !== '' ? pickupInstructions : undefined,
      weight: weight !== '' ? weight : undefined,
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      marginTop: Constants.statusBarHeight,
    },
    scrollView: {
      marginHorizontal: 0,
    },
    text: {
      fontSize: 42,
    },
  });

  return (
    <View style={{ width: '100%' }}>
      <ScrollView style={styles.scrollView}>
        <Text>Availability Start</Text>
        <HidableDatePicker datetime={startDatetime} setDatetime={setStartDatetime} />
        <Text>Availability End</Text>
        <HidableDatePicker datetime={endDatetime} setDatetime={setEndDatetime} />
        {(Date.now() + 60 * 60 * 2 * 1000) > endDatetime.getTime()
          && <Text style={{ color: 'red' }}>End time is preferred to be at least two hours from now</Text>
        }
        {/*
        Change to TextField at some point, or some other form of longer text input
        Border styling is needed so the TextFields are visible on iOS
        */}
        <Input
          label="Description"
          value={description}
          onChangeText={(desc: string) => setDescription(desc)}
        />
        <Input
          label="Pickup Instructions (optional)"
          value={pickupInstructions}
          onChangeText={(instructions: string) => setPickupInstructions(instructions)}
        />
        <Input
          label="Weight of Food (pounds, optional)"
          value={weight.toString()}
          onChangeText={(weight: string) => setWeight(Number.isFinite(+weight) && weight !== '' ? +weight : '')}
          keyboardType="numeric"
        />
        <Button
          title="Submit"
          onPress={() => handleSubmit()}
        />
      </ScrollView>
    </View>
  );
}

export default DonationForm;
