import React, { useState } from 'react';
import { Button } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from 'react-native-elements';

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
      <Input
        label="Description"
        value={description}
        onChangeText={(desc: string) => setDescription(desc)}
      />
      <Input
        label="Pickup Instructions"
        value={pickupInstructions}
        onChangeText={(instructions: string) => setPickupInstructions(instructions)}
      />
      <Input
        label="Weight"
        value={weight.toString()}
        onChangeText={(weight: string) => setWeight(+weight)}
        keyboardType="numeric"
      />
      <View>
        <Text>{error}</Text>
        <Button
          title="Submit"
          disabled={error !== ''}
          onPress={() => handleSubmit()}
        />
      </View>
    </View>
  );
}

export default DonationForm;
