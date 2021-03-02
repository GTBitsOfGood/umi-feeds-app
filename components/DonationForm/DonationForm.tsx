import React, { useState, Dispatch, SetStateAction } from 'react';
import { Button, Platform } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from 'react-native-elements';

import { Text, View } from '../Themed';

function HidableDatePicker(props: {
  datetime: Date,
  setDatetime: Dispatch<SetStateAction<Date>>
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [description, setDescription] = useState('');
  const [pickupInstructions, setPickupInstructions] = useState('');
  const [weight, setWeight] = useState(0);
  const [error, setError] = useState('');

  const onDatetimeChange = (event: any, selectedDatetime?: Date) => {
    const currentDatetime = selectedDatetime || props.datetime;

    // Workaround for Android issue: https://github.com/react-native-datetimepicker/datetimepicker/issues/54
    setShowPicker(Platform.OS === 'ios');

    props.setDatetime(selectedDatetime || props.datetime);
  };

  const toggleShowPicker = (event: any) => {
    setShowPicker((shown) => !shown);
  };

  // Date.now() and currentDatetime.getTime() return milliseconds
  // We check if the date is within a valid range - in this case,
  // at least three hours in the future
  const cutoff = Date.now() + 60 * 60 * 3 * 1000;
  if (cutoff > currentDatetime.getTime() || cutoff > endDatetime.getTime()) {
    setError('Date must be at least 3 hours from now!');
  } else if (currentDatetime > endDatetime) {
    setError('Start availability must be before end availability!');
  } else setError('');

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
          onPress={toggleShowPicker}
          title={props.datetime.toString()}
        />
        {showPicker && (
          <View>
            {/* The date has to be in the code first otherwise the button title wont update properly */}
            <DateTimePicker
              value={props.datetime}
              mode="date"
              style={{ width: '100%' }}
              onChange={onDatetimeChange}
            />
            <DateTimePicker
              value={props.datetime}
              mode="time"
              style={{ width: '100%' }}
              minuteInterval={1}
              onChange={onDatetimeChange}
            />
          </View>
        )}
        <Text>Availability End</Text>
        <Button
          onPress={toggleShowPicker}
          title={props.datetime.toString()}
        />
        {showPicker && (
          <View>
            {/* The date has to be in the code first otherwise the button title wont update properly */}
            <DateTimePicker
              value={props.datetime}
              mode="date"
              style={{ width: '100%' }}
              onChange={onDatetimeChange}
            />
            <DateTimePicker
              value={props.datetime}
              mode="time"
              style={{ width: '100%' }}
              minuteInterval={1}
              onChange={onDatetimeChange}
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

export default HidableDatePicker;
