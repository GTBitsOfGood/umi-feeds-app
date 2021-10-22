import React, { useState, Dispatch, SetStateAction } from 'react';
import { Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTime } from 'luxon';
import { View } from '../../style/Themed';

function PlatformTimePicker(props: {
  datetime: Date,
  setDatetime: Dispatch<SetStateAction<Date>>
}) {
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || props.datetime;
    setShow(Platform.OS === 'ios');
    props.setDatetime(currentDate);
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  if (Platform.OS === 'ios') {
    return (
      <View>
        <DateTimePicker
          value={props.datetime}
          mode="time"
          style={{ width: '100%' }}
          minuteInterval={1}
          display="default"
          onChange={onChange}
        />
      </View>
    );
  } else {
    return (
      <>
        <View>
          <Button
            onPress={showTimepicker}
            title={DateTime.fromJSDate(props.datetime).toLocaleString(DateTime.TIME_SIMPLE)}
          />
        </View>

        {show && (
        <View>
          <DateTimePicker
            value={props.datetime}
            mode={mode}
            style={{ width: '100%' }}
            minuteInterval={1}
            display="default"
            onChange={onChange}
          />
        </View>
        )}
      </>
    );
  }
}

export default PlatformTimePicker;
