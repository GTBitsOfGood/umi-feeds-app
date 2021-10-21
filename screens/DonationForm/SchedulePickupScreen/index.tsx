import { isDate, isNumber, pick } from 'lodash';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Pressable, KeyboardAvoidingView } from 'react-native';
import { Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import PlatformDateTimePicker from '../../../components/DateTimePicker';
import { moderateScale, HideKeyboardUtility } from '../../../util';
import { setPickUpTimeInformation } from '../../../redux/reducers/donationCartReducer';

function DonateSchedulePickupScreen() {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [pickupInstructions, setPickupInstructions] = useState<string>('');
  const [pickupDate, setPickupDate] = useState(new Date());
  const [showDateTime, setShowDateTime] = useState<boolean>(false);

  const handleSubmit = () => {
    if (isFormValid()) {
      dispatch(setPickUpTimeInformation({
        pickupInstructions,
        pickupStartTime: Number(startTime),
        pickupEndTime: Number(endTime),
      }));
    }
  };

  const isValidDate = (d: Date) => {
    if (d.getTime() > (Date.now() + 60 * 60 * 2 * 1000)) {
      return !isDate(d);
    } else {
      return false;
    }
  };

  const isFormValid = () => {
    console.log(pickupDate);
    return isValidDate(pickupDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Pickup time
      </Text>
      <Text style={styles.description}>
        Schedule the date and time for your donation pickup.
      </Text>
      <Text style={styles.subsection}>
        Pickup Date
      </Text>
      {/* <TouchableHighlight
        onPress={() => setShowDateTime(true)}
        underlayColor="transparent"
      >
        <View style={styles.dateInput}>
          <Text style={styles.description}>
            Create new dish
          </Text>
        </View>
      </TouchableHighlight> */}
      <View style={styles.dateInput}>
        <PlatformDateTimePicker datetime={startTime} setDatetime={setStartTime} />
      </View>
      <Text style={styles.subsection}>
        Pickup time window
      </Text>
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
          onPress={handleSubmit()}
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
    color: '#202020'
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
    marginVertical: moderateScale(10),
    fontFamily: 'Roboto',
    height: '40%',
    width: '100%'
  },
  dateInput: {
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 6,
    marginVertical: 10,
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
  filledButton :{
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
  }
});

export default DonateSchedulePickupScreen;
