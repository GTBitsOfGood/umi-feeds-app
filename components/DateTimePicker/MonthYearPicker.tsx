import React, { useState, Dispatch, SetStateAction } from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Entypo';
import { View } from '../../style/Themed';
import { moderateScale, verticalScale } from '../../util';

function MonthYearPicker(props: {
    // should take a date and a function
  datetime: Date,
  setDatetime: Dispatch<SetStateAction<Date>>,
  filterHandler: (date: Date) => void,
}) {
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || props.datetime;
    setShow(Platform.OS === 'ios');
    props.setDatetime(currentDate);
    props.filterHandler(currentDate);
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
      <View style={{ backgroundColor: 'transparent'}}>
        <RNDateTimePicker
          value={props.datetime}
          mode="date"
          style={styles.monthOption}
          minuteInterval={1}
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      </View>
    );
  } else {
    return (
      <>
        <View style={{ backgroundColor: 'transparent' }}>
          <Pressable
            style={styles.monthOption}
            onPress={showDatepicker}
          >
            <Text style={styles.monthOptionText}>{monthNames[props.datetime.getMonth()]} {props.datetime.getFullYear()}</Text>
            <Icon name="chevron-thin-down" size={12} style={{ color: '#5D5D5D', marginLeft: moderateScale(3) }} />
          </Pressable>
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
            maximumDate={new Date()}
          />
        </View>
        )}
      </>
    );
  }
}

export default MonthYearPicker;

const styles = StyleSheet.create({
  monthOption: {
    marginTop: verticalScale(20),
    borderColor: '#5D5D5D',
    borderRadius: 2,
    borderWidth: 1,
    height: moderateScale(20),
    width: moderateScale(95),
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',

  },
  monthOptionText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: moderateScale(11),
    fontWeight: '500',
    color: '#5D5D5D',
  }
});
