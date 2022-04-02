import React, { useState } from 'react';
import { Pressable, StyleSheet, Alert } from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { View, Text, useThemeColor, ThemeProps } from '../../../style/Themed';
import ChevronButton from '../../../components/ChevronButton';
import { DonateTabParamList } from '../../../navigation/DonorStack/Donate/types';
import { BottomTabParamList } from '../../../navigation/MainNavBar/DonorTabs/types';
import Pencil from '../../../assets/images/pencil.svg';
import { GeneralModal } from '../../../components';
import LoadingScreen from '../../LoadingScreen';
import { RootState } from '../../../redux/rootReducer';
import { resetCart } from '../../../redux/reducers/donationCartReducer';
import { addDonation } from '../../../redux/reducers/authReducer';
import { setLoading } from '../../../redux/reducers/loadingReducer';

type DonationScreenProp = CompositeNavigationProp<
  StackNavigationProp<DonateTabParamList, 'ReviewContactScreen'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;

/**
 * Screen to render a screen that'll display the user's contact information and address.
 *
 * [IMPORTANT]:
 * This screen handles the final donation form submission to the backend server
 *
 * @param props Styling object containing the color themes
 * @returns A React Component
 */
export default function ReviewContactScreen(props: ThemeProps) {
  const navigation = useNavigation<DonationScreenProp>();
  const dispatch = useDispatch();
  const cartState = useSelector((state: RootState) => state.donationCart);
  const authState = useSelector((state: RootState) => state.auth);
  const loadingState = useSelector((state: RootState) => state.loading.loadingStatus);

  const [loaded] = useFonts({
    Roboto: require('../../../assets/fonts/Roboto-Regular.ttf'),
  });

  const color = useThemeColor({ light: props.lightColor, dark: props.darkColor }, 'text');

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const toggleModal = () => setModalVisible(!modalVisible);
  const modalSubmit = (button1: boolean, button2: boolean) => {
    dispatch(resetCart());
    navigation.popToTop();
    navigation.navigate('Home');
  };

  if (!loaded) {
    return null;
  }

  const startTimeString = new Date(cartState.pickupStartTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const endTimeString = new Date(cartState.pickupEndTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  return (
    loadingState ? (
      <LoadingScreen />
    ) : (
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
          {/* <View style={styles.backContainer}>
            <ChevronButton onPress={() => navigation.goBack()} text="Donation cart" />
          </View> */}
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
                dispatch(setLoading({ loading: true }));
                const formdata = new FormData();
                formdata.append('data', JSON.stringify({
                  ongoing: true,
                  businessName: authState.businessName,
                  status: 'Pending',
                  imageLink: cartState.imageLink,
                  donationDishes: cartState.donationDishes,
                  pickupAddress: cartState.pickupAddress,
                  pickupInstructions: cartState.pickupInstructions,
                  pickupStartTime: new Date(cartState.pickupStartTime),
                  pickupEndTime: new Date(cartState.pickupEndTime),
                  lockedByVolunteer: false, // whether the donation has been locked by a volunteer
                }));
                /**
                 * volunteerLockTime, confirmPickUpTime, confirmDropOffTime not neccessary as those have
                 * not been defined is the donation has not been locked by a volunteer
                 */
                formdata.append('description', 'Check app for details');
                axios.post(`/api/donationform?id=${authState._id}`, formdata).then((res) => {
                  dispatch(addDonation(res.data.donationform));
                  dispatch(setLoading({ loading: false }));
                  toggleModal();
                }).catch((err) => {
                  console.error(err);
                  Alert.alert('Failed to Submit Form. PLease Try Again Later');
                }).finally(() => {
                  dispatch(setLoading({ loading: false }));
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
    )
  );
}

type InfoBlockProps = {
  color: string,
  headerText: string,
  onEdit: () => void,
  line1: string,
  line2: string,
  line3?: string
};

function InfoBlock(props: InfoBlockProps) {
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
        <Text style={styles.text}> {props.line1} </Text>
        <Text style={styles.text}> {props.line2} </Text>
        <Text style={styles.text}> {props.line3 || null} </Text>
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
