import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView, ScrollView, TouchableHighlight } from 'react-native';
import { Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { moderateScale } from '../../../util';
import { setPickUpTimeInformation } from '../../../redux/reducers/donationCartReducer';
import PlatformDatePicker from '../../../components/DateTimePicker/DatePicker';
import PlatformTimePicker from '../../../components/DateTimePicker/TimePicker';
import Header from '../../../components/Header';
import { DonateTabParamList } from '../../../navigation/DonorStack/Donate/types';

type ScheudlePickupScreenProp = StackNavigationProp<DonateTabParamList, 'DonateHomeScreen'>;

function DonateSchedulePickupScreen() {
  const navigation = useNavigation<ScheudlePickupScreenProp>();

  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [pickupInstructions, setPickupInstructions] = useState<string>('');
  const [pickupDate, setPickupDate] = useState(new Date());

  const handleSubmit = () => {
    if (!isFormValid()) {
      dispatch(setPickUpTimeInformation({
        pickupInstructions,
        pickupStartTime: startTime.getTime(),
        pickupEndTime: endTime.getTime(),
      }));
      navigation.navigate('ReviewCartScreen');
    }
  };

  /* Check that the pickup date is valid and not in the past */
  const isFormValid = () => {
    const validStartTime = startTime > new Date();
    const validEndTime = endTime > startTime;
    return (!validStartTime && !validEndTime);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: 'white' }}>
      <Pressable onPress={() => navigation.goBack()}>
        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
          <Icon name="chevron-thin-left" size={20} style={{ color: '#F37B36' }} />
          <Text style={{ fontSize: 16, color: '#F37B36', fontWeight: '400', marginLeft: 4 }}>
            Your Address
          </Text>
        </View>
      </Pressable>
      <Header title="Pickup time" showCartButton={false} />
      <Text style={styles.description}>
        Schedule the date and time for your donation pickup.
      </Text>
      <Text style={styles.subsection}>
        Pickup Date
      </Text>
      <View style={styles.dateInput}>
        <PlatformDatePicker
          datetime={pickupDate}
          setDatetime={setPickupDate}
        />
      </View>
      <Text style={styles.subsection}>
        Pickup time window
      </Text>
      <View style={styles.pickupWindowContainer}>
        <View style={styles.timeItem}>
          <View style={styles.timeWithText}>
            <Text style={styles.pickupText}>Earliest time for food pickup </Text>
            <PlatformTimePicker
              datetime={startTime}
              setDatetime={setStartTime}
            />
          </View>
        </View>
        <View style={styles.timeItem}>
          <View style={styles.timeWithText}>
            <Text style={styles.pickupText}>Latest time for food pickup. Before end of Day!</Text>
            <PlatformTimePicker
              datetime={endTime}
              setDatetime={setEndTime}
            />
          </View>
        </View>
      </View>
      <Text style={styles.subsection}>
        Pickup Instructions (optional)
      </Text>
      <View style={styles.commentInput}>
        <KeyboardAvoidingView>
          <Input
            value={pickupInstructions}
            placeholder="If you have any additional comments to mention about this dish (including allergen information), type here."
            onChangeText={(instructions: string) => setPickupInstructions(instructions)}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={{ fontSize: 15, width: '100%', textAlignVertical: 'top' }}
            multiline
          />
        </KeyboardAvoidingView>
      </View>
      <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'center', paddingTop: moderateScale(20) }}>
        <Pressable
          disabled={isFormValid()}
          style={isFormValid() ? styles.unfilledButton : styles.filledButton}
          onPress={handleSubmit}
        >
          <Text style={styles.reviewText}>Review</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: '5%',
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
  },
  description: {
    fontSize: 15,
    color: '#828282',
    paddingBottom: moderateScale(10),
    flex: 1,
  },
  subsection: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: '#202020',
  },
  boxInput: {
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 6,
    marginVertical: moderateScale(10),
    fontFamily: 'Roboto',
  },
  commentInput: {
    flex: 10,
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 6,
    fontFamily: 'Roboto',
    height: '30%',
    width: '100%',
  },
  dateInput: {
    fontFamily: 'Roboto',
    width: '100%',
    paddingBottom: moderateScale(10)
  },
  unfilledButton: {
    backgroundColor: '#B8B8B8',
    width: '100%',
    height: '95%',
    borderRadius: 4
  },
  filledButton: {
    backgroundColor: '#F37B36',
    width: '100%',
    height: '95%',
    borderRadius: 4,
  },
  reviewText: {
    flex: 1,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: 'center',
    color: 'white',
    paddingTop: moderateScale(13)
  },
  pickupWindowContainer: {
    flex: 3,
    flexDirection: 'row',
    paddingBottom: moderateScale(10)
  },
  timeItem: {
    marginLeft: 15,
    marginRight: 20,
    width: '40%',
    flex: 2
  },
  timeWithText: {
    flexDirection: 'column'
  },
  pickupText: {
    fontSize: 12,
    color: '#5D5D5D',
    paddingBottom: moderateScale(5)
  }
});

export default DonateSchedulePickupScreen;
