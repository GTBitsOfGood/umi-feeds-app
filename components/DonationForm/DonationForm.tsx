import React, { useState } from 'react';
import { Button, TextInput } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Text, View } from '../Themed';

function DonationForm() {
  const [error, setError] = useState('');
  const [startDatetime, setStartDatetime] = useState(new Date());
  // Initially, the start datetime will be now, and the end will be a day from now
  const [endDatetime, setEndDatetime] = useState(new Date(Date.now() + 60 * 60 * 24 * 1000));

  const [description, setDescription] = useState('');
  const [pickupInstructions, setPickupInstructions] = useState('');
  const [weight, setWeight] = useState(0);

  const onStartDatetimeChange = (event: any, selectedDatetime?: Date) => {
    const currentDatetime = selectedDatetime || startDatetime;

    // Date.now() and currentDatetime.getTime() return milliseconds
    // We check if the date is within a valid range - in this case,
    // at least three hours in the future
    if (Date.now() + 60 * 60 * 3 * 1000 > currentDatetime.getTime()) {
      setError('Date must be at least 3 hours from now!');
    } else if (startDatetime > endDatetime) {
      setError('Start availability must be before end availability!');
    } else setError('');

    setStartDatetime(currentDatetime);
  };

  const onEndDatetimeChange = (event: any, selectedDatetime?: Date) => {
    const currentDatetime = selectedDatetime || endDatetime;

    // Date.now() and currentDatetime.getTime() return milliseconds
    // We check if the date is within a valid range - in this case,
    // at least three hours in the future
    if (Date.now() + 60 * 60 * 3 * 1000 > currentDatetime.getTime()) {
      setError('Date must be at least 3 hours from now!');
    } else if (startDatetime > endDatetime) {
      setError('Start availability must be before end availability!');
    } else setError('');

    setEndDatetime(currentDatetime);
  };

  const handleSubmit = () => {
    fetch('http://localhost:3000/api/donations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        donorID: '602bf82713e73d625cc0d522',
        availability: {
          startTime: startDatetime,
          endTime: endDatetime,
        },
        description,
        pickupInstructions,
        weight,
      }),
    });
  };

  return (
    <View style={{ width: '100%' }}>
      <Text>{error}</Text>
      <View style={{ width: '100%' }}>
        <Text>Availability Start</Text>
        <DateTimePicker
          value={startDatetime}
          mode="date"
          style={{ width: '100%' }}
          onChange={onStartDatetimeChange}
        />
        <DateTimePicker
          value={startDatetime}
          mode="time"
          style={{ width: '100%' }}
          minuteInterval={15}
          onChange={onStartDatetimeChange}
        />
      </View>
      <View style={{ width: '100%' }}>
        <Text>Availability End</Text>
        <DateTimePicker
          value={endDatetime}
          mode="date"
          style={{ width: '100%' }}
          onChange={onEndDatetimeChange}
        />
        <DateTimePicker
          value={endDatetime}
          mode="time"
          style={{ width: '100%' }}
          minuteInterval={15}
          onChange={onEndDatetimeChange}
        />
      </View>
      {/*
        Change to TextField at some point, or some other form of longer text input
        Border styling is needed so the TextFields are visible on iOS
      */}
      <TextInput
        value={description}
        onChangeText={(desc: string) => setDescription(desc)}
        style={{ borderColor: 'white', borderWidth: 5, width: '100%' }}
      />
      <TextInput
        value={pickupInstructions}
        onChangeText={(instructions: string) => setPickupInstructions(instructions)}
        style={{ borderColor: 'white', borderWidth: 5, width: '100%' }}
      />
      <TextInput
        value={weight.toString()}
        onChangeText={(weight: string) => setWeight(+weight)}
        style={{ borderColor: 'white', borderWidth: 5, width: '100%' }}
      />
      <Button
        title="Submit"
        disabled={error !== ''}
        onPress={() => handleSubmit()}
      />
    </View>
  );
}

export default DonationForm;
