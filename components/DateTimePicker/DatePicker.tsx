import React, { useState, Dispatch, SetStateAction } from 'react';
import { Button, Platform } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { DateTime } from 'luxon';
import { View } from '../../style/Themed';

function PlatformDatePicker(props: {
  datetime: Date,
  setDatetime: (Dispatch<SetStateAction<Date>>) | ((date:Date) => void)
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

  const showDatepicker = () => {
    showMode('date');
  };

  if (Platform.OS === 'ios') {
    return (
      <View>
        <RNDateTimePicker
          value={props.datetime}
          mode="date"
          style={{ width: '100%' }}
          minuteInterval={1}
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      </View>
    );
  } else {
    return (
      <>
        <View>
          <Button
            onPress={showDatepicker}
            title={DateTime.fromJSDate(props.datetime).toLocaleString(DateTime.DATE_MED)}
          />
        </View>
        {show && (
        <View>
          <RNDateTimePicker
            value={props.datetime}
            mode={mode}
            style={{ width: '100%' }}
            minuteInterval={1}
            display="default"
            onChange={onChange}
            minimumDate={new Date()}
          />
        </View>
        )}
      </>
    );
  }
}

export default PlatformDatePicker;
