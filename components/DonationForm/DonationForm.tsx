import React, { useState } from 'react';
import { Button, Platform } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from 'react-native-elements';

import { Text, View } from '../Themed';
import RNDateTimePicker from '@react-native-community/datetimepicker';

function DonationForm() {
  const [error, setError] = useState('');
  const [startDatetime, setStartDatetime] = useState(new Date());
  // Initially, the start datetime will be now, and the end will be a day from now
  const [endDatetime, setEndDatetime] = useState(new Date(Date.now() + 60 * 60 * 24 * 1000));

  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const [description, setDescription] = useState('');
  const [pickupInstructions, setPickupInstructions] = useState('');
  const [weight, setWeight] = useState(0);

  const onStartDatetimeChange = (event: any, selectedDatetime?: Date) => {
    const currentDatetime = selectedDatetime || startDatetime;

    // Workaround for Android issue: https://github.com/react-native-datetimepicker/datetimepicker/issues/54
    setShowStartDate(Platform.OS === 'ios');

    // Date.now() and currentDatetime.getTime() return milliseconds
    // We check if the date is within a valid range - in this case,
    // at least three hours in the future
    const cutoff = Date.now() + 60 * 60 * 3 * 1000;
    if (cutoff > currentDatetime.getTime() || cutoff > endDatetime.getTime()) {
      setError('Date must be at least 3 hours from now!');
    } else if (currentDatetime > endDatetime) {
      setError('Start availability must be before end availability!');
    } else setError('');

    setStartDatetime(currentDatetime);
  };

  const showDatePicker = () => {
    setShowStartDate(true);
  };

  // const showTimePicker = () => {
  //   setStartDatetime();
  // };

  const onEndDatetimeChange = (event: any, selectedDatetime?: Date) => {
    const currentDatetime = selectedDatetime || endDatetime;

    // Workaround for Android issue: https://github.com/react-native-datetimepicker/datetimepicker/issues/54
    setShowEndDate(Platform.OS === 'ios');

    // Date.now() and currentDatetime.getTime() return milliseconds
    // We check if the date is within a valid range - in this case,
    // at least three hours in the future
    const cutoff = Date.now() + 60 * 60 * 3 * 1000;
    if (cutoff > currentDatetime.getTime() || cutoff > startDatetime.getTime()) {
      setError('Date must be at least 3 hours from now!');
    } else if (startDatetime > currentDatetime) {
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
        <Button
          onPress={showDatePicker}
          title={startDatetime.toDateString()}
        />
        {showStartDate
            && (
            <View>
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
            )}
        <Text>Availability End</Text>
        {showEndDate
            && (
            <View>
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
            )}
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
