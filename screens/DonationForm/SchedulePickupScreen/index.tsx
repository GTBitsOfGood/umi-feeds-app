import { isDate } from 'lodash';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Pressable, KeyboardAvoidingView } from 'react-native';
import { Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { moderateScale, HideKeyboardUtility } from '../../../util';
import { setPickUpTimeInformation } from '../../../redux/reducers/donationCartReducer';
import PlatformDatePicker from '../../../components/DateTimePicker/DatePicker';
import PlatformTimePicker from '../../../components/DateTimePicker/TimePicker';
import Header from '../../../components/Header';

function DonateSchedulePickupScreen() {
  const currentDate = new Date();
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState<Date>(currentDate);
  const [endTime, setEndTime] = useState<Date>(currentDate);
  const [pickupInstructions, setPickupInstructions] = useState<string>('');
  const [pickupDate, setPickupDate] = useState(currentDate);

  const handleSubmit = () => {
    if (isFormValid()) {
      dispatch(setPickUpTimeInformation({
        pickupInstructions,
        pickupStartTime: Number(startTime),
        pickupEndTime: Number(endTime),
      }));
    } else {
      console.log('Form is not valid');
    }
  };

  /* Check that the pickup date is valid and not in the past */
  const isFormValid = () => {
    const validStartTime = isDate(startTime) && startTime > new Date();
    const validEndTime = isDate(endTime) && endTime > startTime;
    return (validStartTime && validEndTime);
  };

  return (
    <View style={styles.container}>
      <Header title="Pickup time" />
      <Text style={styles.description}>
        Schedule the date and time for your donation pickup.
      </Text>
      <Text style={styles.subsection}>
        Pickup Date
      </Text>
      <View style={styles.dateInput}>
        <PlatformDatePicker datetime={pickupDate} setDatetime={setPickupDate} />
      </View>
      <Text style={styles.subsection}>
        Pickup time window
      </Text>
      <View style={styles.pickupWindowContainer}>
        <View style={styles.timeItem}>
          <View style={styles.timeWithText}>
            <Text style={styles.pickupText}> Earliest time for food pickup </Text>
            <PlatformTimePicker datetime={startTime} setDatetime={setStartTime} />
          </View>
        </View>
        <View style={styles.timeItem}>
          <View style={styles.timeWithText}>
            <Text style={styles.pickupText}> Latest time for food pickup </Text>
            <PlatformTimePicker datetime={endTime} setDatetime={setEndTime} />
          </View>
        </View>
      </View>
      <Text style={styles.subsection}>
        Pickup Instructions (optional)
      </Text>
      <View style={styles.commentInput}>
        <HideKeyboardUtility>
          <KeyboardAvoidingView>
            <Input
              value={pickupInstructions}
              placeholder="If you have any additional comments to mention about this dish (including allergen information), type here."
              onChangeText={(instructions: string) => setPickupInstructions(instructions)}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              style={{ fontSize: 15, width: '100%', height: '40%', textAlignVertical: 'top' }}
              multiline
            />
          </KeyboardAvoidingView>
        </HideKeyboardUtility>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: moderateScale(10), width: '100%', height: '40%' }}>
        <Pressable
          disabled={isFormValid()}
          style={isFormValid() ? styles.filledButton : styles.unfilledButton}
          onPress={handleSubmit}
        >
          <Text style={styles.reviewText}>Review</Text>
        </Pressable>
      </View>

    </View>

  );
}

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: '5%'
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
  },
  description: {
    fontSize: 15,
    paddingVertical: moderateScale(10),
  },
  subsection: {
    fontSize: 17,
    fontWeight: '700',
    color: '#202020',
    paddingBottom: moderateScale(10)
  },
  boxInput: {
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 6,
    marginVertical: 10,
    fontFamily: 'Roboto',

  },
  commentInput: {
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 6,
    fontFamily: 'Roboto',
    height: '40%',
    width: '100%',
  },
  dateInput: {
    fontFamily: 'Roboto',
    height: '10%',
    width: '100%'
  },
  unfilledButton: {
    backgroundColor: '#B8B8B8',
    width: '100%',
    height: '20%',
    borderRadius: 4
  },
  filledButton: {
    backgroundColor: '#F37B36',
    width: '100%',
    height: '20%',
    borderRadius: 4
  },
  reviewText: {
    flex: 1,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: moderateScale(20),
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    paddingTop: moderateScale(13)
  },
  pickupWindowContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: moderateScale(10)
  },
  timeItem: {
    marginLeft: 15,
    marginRight: 20,
    width: '40%'
  },
  timeWithText: {
    flexDirection: 'column'
  },
  pickupText: {
    fontSize: 12,
    color: '#5D5D5D',
  }
});

export default DonateSchedulePickupScreen;
