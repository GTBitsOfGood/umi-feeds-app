import React, { useState, Dispatch, SetStateAction, useCallback } from 'react';
import { Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTime } from 'luxon';
import { Text, View } from '../Themed';

function HidableDatePicker(props: {
  datetime: Date,
  setDatetime: Dispatch<SetStateAction<Date>>
}) {
  const [showPicker, setShowPicker] = useState(false);

  const onDateChange = useCallback((event: any, selectedDate?: Date) => {
    // Workaround for Android issue: https://github.com/react-native-datetimepicker/datetimepicker/issues/54
    setShowPicker(Platform.OS === 'ios');
    const year = selectedDate?.getFullYear() ?? props.datetime.getFullYear();
    const month = selectedDate?.getMonth() ?? props.datetime.getMonth();
    const day = selectedDate?.getDate() ?? props.datetime.getDate();

    props.setDatetime(new Date(year, month, day, props.datetime.getHours(), props.datetime.getMinutes()));
    console.log(`from on date: ${props.datetime}`);
  }, [props.datetime]);

  const onTimeChange = useCallback((event: any, selectedTime?: Date) => {
    // Workaround for Android issue: https://github.com/react-native-datetimepicker/datetimepicker/issues/54
    setShowPicker(Platform.OS === 'ios');

    const hours = selectedTime?.getHours() ?? props.datetime.getHours();
    const minutes = selectedTime?.getMinutes() ?? props.datetime.getMinutes();

    props.setDatetime(new Date(props.datetime.getFullYear(), props.datetime.getMonth(), props.datetime.getDate(), hours, minutes));
    console.log(`from on time: ${props.datetime}\n`);
  }, [props.datetime]);

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
          <DateTimePicker
            value={props.datetime}
            mode="time"
            style={{ width: '100%' }}
            minuteInterval={1}
            onChange={onTimeChange}
          />
          <DateTimePicker
            value={props.datetime}
            mode="date"
            style={{ width: '100%' }}
            onChange={onDateChange}
          />
        </View>
      )}
    </>
  );
}

export default HidableDatePicker;
