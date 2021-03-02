import React, { useState, Dispatch, SetStateAction } from 'react';
import { Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTime } from 'luxon';
import { Text, View } from '../Themed';

function HidableDatePicker(props: {
  datetime: Date,
  setDatetime: Dispatch<SetStateAction<Date>>
}) {
  const [showPicker, setShowPicker] = useState(false);
  const onDatetimeChange = (event: any, selectedDatetime?: Date) => {
    // Workaround for Android issue: https://github.com/react-native-datetimepicker/datetimepicker/issues/54
    setShowPicker(Platform.OS === 'ios');

    props.setDatetime(selectedDatetime || props.datetime);
  };
  const toggleShowPicker = (event: any) => {
    setShowPicker((shown) => !shown);
  };

  return (
    <>
      <Button
        onPress={toggleShowPicker}
        title={DateTime.fromJSDate(props.datetime).toLocaleString(DateTime.DATETIME_MED)}
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
    </>
  );
}

export default HidableDatePicker;
