import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { View, Text, useThemeColor, ThemeProps } from '../../../style/Themed';
import ChevronButton from '../../../components/ChevronButton';
import { DonateTabParamList } from '../../../navigation/DonorStack/Donate/types';
import { BottomTabParamList } from '../../../navigation/MainNavBar/types';
import Pencil from '../../../assets/images/pencil.svg';
import { GeneralModal } from '../../../components';
import { RootState } from '../../../redux/rootReducer';
import { resetCart } from '../../../redux/reducers/donationCartReducer';

type DonationScreenProp = CompositeNavigationProp<
    StackNavigationProp<DonateTabParamList, 'ReviewContactScreen'>,
    BottomTabNavigationProp<BottomTabParamList, 'Home'>
    >;

export default function ReviewContactScreen(props: ThemeProps) {
  const navigation = useNavigation<DonationScreenProp>();
  const dispatch = useDispatch();
  const cartState = useSelector((state: RootState) => state.donationCart);
  const authState = useSelector((state: RootState) => state.auth);

  const [loaded] = useFonts({
    Roboto: require('../../../assets/fonts/Roboto-Regular.ttf'),
  });

  const color = useThemeColor({ light: props.lightColor, dark: props.darkColor }, 'text');

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const toggleModal = () => setModalVisible(!modalVisible);
  const modalSubmit = (button1: boolean, button2: boolean) => {
    if (button1) {
      console.log('Button 1 Pressed');
    } else {
      console.log('Button 2 Pressed');
    }
    dispatch(resetCart());
    navigation.navigate('Home');
  };

  if (!loaded) {
    return null;
  }

  const startTimeString = new Date(cartState.pickupStartTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const endTimeString = new Date(cartState.pickupEndTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  return (
    <View style={styles.container}>
      <GeneralModal
        title="Thank you!"
        subtitle="A confirmation receipt has been sent to your email."
        visible={modalVisible}
        closeModal={toggleModal}
        numButtons={1}
        buttonOneTitle="Yes"
        modalSubmit={modalSubmit}
      />
      <View style={styles.contentContainer}>
        <View style={styles.backContainer}>
          <ChevronButton onPress={() => navigation.goBack()} text="Donation cart" />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}> Review details </Text>
          <View style={{ marginTop: 8, marginLeft: 6 }}>
            <Text style={styles.text}> Confirm that the information below is correct </Text>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <InfoBlock
            color={color}
            headerText="Contact information"
            onEdit={() => navigation.navigate('Me')}
            line1={authState.name}
            line2={authState.phoneNumber.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
            line3={authState.email}
          />
          <View
            style={{
              borderBottomColor: color,
              borderBottomWidth: 1,
              margin: 8
            }}
          />
          <InfoBlock
            color={color}
            headerText="Pickup location"
            onEdit={() => navigation.navigate('AddressScreen')}
            line1={authState.businessName}
            line2={`${cartState.pickupAddress.streetAddress}`}
            line3={`${cartState.pickupAddress.city}, ${cartState.pickupAddress.state} ${cartState.pickupAddress.zipCode}`}
          />
          <View
            style={{
              borderBottomColor: color,
              borderBottomWidth: 1,
              margin: 8
            }}
          />
          <InfoBlock
            color={color}
            headerText="Pickup time"
            onEdit={() => navigation.navigate('SchedulePickupScreen')}
            line1={`Date ${new Date(cartState.pickupStartTime).toLocaleDateString()}`}
            line2={`From ${startTimeString} to ${endTimeString}`}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.submitButton}
            onPress={() => {
              const formdata = new FormData();
              formdata.append('data', JSON.stringify({
                ongoing: true,
                status: 'pending pickup',
                imageLink: cartState.imageLink,
                dishes: cartState.donationDishes,
                pickupAddress: cartState.pickupAddress,
                pickupInstructions: cartState.pickupInstructions,
                pickupStartTime: new Date(cartState.pickupStartTime),
                pickupEndTime: new Date(cartState.pickupEndTime),
                volunteerLockTime: new Date(cartState.volunteerLockTime), // time when volunteer agrees to pick it up
                lockedByVolunteer: cartState.lockedByVolunteer, // whether the donation has been locked by a volunteer
                confirmPickUpTime: new Date(cartState.confirmPickUpTime), // time when donation has been picked up by volunteer
                confirmDropOffTime: new Date(cartState.confirmDropOffTime), // time when donation has been dropped off by volunteer
              }));
              formdata.append('description', 'Check app for details');
              axios.post(`/api/donationform?id=${authState._id}`, formdata).then(() => {
                toggleModal();
              }).catch((err) => {
                console.error(err);
              });
            }}
          >
            <Text
              style={{ fontSize: 17, color: 'white', alignSelf: 'center', fontWeight: 'bold', margin: 20 }}
            > Confirm donation
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

type InfoBlockProps = {
  color: string,
  headerText: string,
  onEdit: ()=>void,
  line1: string,
  line2: string,
  line3?: string
};

function InfoBlock(props:InfoBlockProps) {
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 6, justifyContent: 'center' }}>
          <Text style={styles.subheader}> {props.headerText} </Text>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 2, justifyContent: 'center' }} onTouchEnd={props.onEdit}>
          { /*  @ts-ignore | typescript is concerned about the "color" attribute, but this works with
                        @ts-ignore | the svg because I modified it to change to currentColor when drawing the path */ }
          <Pencil style={{ color: props.color, alignSelf: 'center' }} />
          <Text style={{ alignSelf: 'center', fontSize: 12 }}> Edit </Text>
        </View>
      </View>
      <View style={{ marginLeft: 6 }}>
        <Text style={styles.text}> { props.line1 } </Text>
        <Text style={styles.text}> { props.line2 } </Text>
        <Text style={styles.text}> { props.line3 || null } </Text>
      </View>
    </View>
  );
}

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    width: '85%',
    marginHorizontal: '7.5%',
    marginTop: '5%',
    flex: 19
  },
  backContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  headerContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 5,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 32,
    lineHeight: 37
  },
  subheader: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 21,
    lineHeight: 25,
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 21
  },
  submitButton: {
    backgroundColor: '#F37B36',
    borderRadius: 5
  }
});
