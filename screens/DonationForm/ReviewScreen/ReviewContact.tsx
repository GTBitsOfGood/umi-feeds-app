import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import { View, Text, useThemeColor, ThemeProps } from '../../../style/Themed';
import ChevronButton from '../../../components/ChevronButton';
import { DonationScreenParamList } from '../../../navigation/DonorStack/DonationForm/types';
import { BottomTabParamList } from '../../../navigation/MainNavBar/types';
import Pencil from '../../../assets/images/pencil.svg';

type DonationScreenProp = CompositeNavigationProp<
    StackNavigationProp<DonationScreenParamList, 'DonationScreen'>,
    BottomTabNavigationProp<BottomTabParamList, 'Home'>
    >;

export default function ReviewContactScreen(props: ThemeProps) {
  const navigation = useNavigation<DonationScreenProp>();

  const [loaded] = useFonts({
    Roboto: require('../../../assets/fonts/Roboto-Regular.ttf'),
  });

  const color = useThemeColor({ light: props.lightColor, dark: props.darkColor }, 'text');

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
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
            onEdit={() => { alert('something funny'); }}
            line1="Kimberly Do"
            line2="(404) 123-4567"
            line3="gt@gatech.edu"
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
            onEdit={() => { alert('something hilarious'); }}
            line1="Georgia Tech Restaurant"
            line2="2222 Georgia Tech St"
            line3="Atlanta, GA 30332"
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
            onEdit={() => { alert('my sleep schedule'); }}
            line1="Date 3/21/2021"
            line2="From 3:30 PM to 10:00 PM"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.submitButton}>
            <Text
              style={{ fontSize: 17, color: 'white', alignSelf: 'center', fontWeight: 'bold', margin: 20 }}
              onPress={() => { alert('submit'); }}> Confirm donation
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
        <View style={{ flex: 2 }} />
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
    lineHeight: 25
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
