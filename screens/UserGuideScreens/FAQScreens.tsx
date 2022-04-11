import { View, Text, Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Entypo';
import Logo from '../../assets/images/umi-feeds-logo.svg';
import { Header } from '../../components';

import { UserGuideParamList } from '../../navigation/UserGuidesStack/types';

type FAQProps = StackNavigationProp<UserGuideParamList, 'FAQScreen'>

const Questions = [
  {
    id: 1,
    question: 'What is Umi Feeds?',
    answer: 'Umi Feeds is a non-profit devoted to eliminating food waste and helping those facing food insecurity in the Atlanta community. We collect food from generous donors like you and distribute these meals to people in need.'
  },
  {
    id: 2,
    question: 'How do I donate food?',
    answer: 'Using this mobile application, you can donate leftover food by creating and adding dishes to your donation cart. When your cart is ready, you can ‘checkout’ and schedule a pickup date and time window that works for your schedule. Once you submit the donation request, we’ll take it from there!'
  },
  {
    id: 3,
    question: 'How do I create a Dish?',
    answer: 'Select ‘Donate’ in the bottom navigation bar, and then select the orange ‘Create new dish’ button. A dish is a single serving, and you enter the number of servings for each dish when donating. Your dish info is saved for donating again or at a later time!'
  },
  {
    id: 4,
    question: 'How do I add a dish to my cart?',
    answer: 'Look through your favorited dishes or select the ‘Search for dishes’ button to find a dish by name. Then, select ‘Add to cart’ on the dish and enter the number of servings you have to donate. Now, the dish and number of servings should be in your donation cart.'
  },
  {
    id: 5,
    question: 'How do I schedule a pickup for a donation?',
    answer: 'After adding all the dishes you wish to donate, select the cart icon in the top right. Review your cart contents and select ‘Schedule donation pickup’. Then, fill out the donation pickup details (date, time, address, etc.) and submit your donation request!'
  },
  {
    id: 6,
    question: 'How do I know if my donation will be picked up?',
    answer: 'You can see the status of your donation by selecting the current donation on the home screen. Pending means it has yet to be approved as a valid donation. Unclaimed means it has been approved but not yet claimed by a volunteer. Claimed means a volunteer has confirmed they are able to pick up your donation. You may receive a text or call with a more specific pickup time within your set time window.'
  },
];

/**
 * User Profile Component
 * @returns {JSX.Element}
 */
export default function FAQ() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        justifyContent: 'space-between'
      }}
    >
      <View style={styles.topContainer}>
        <Header title="Frequently asked questions" showCartButton={false} />
      </View>
      {
        Questions.map((item) => <Row key={item.id} question={item.question} answer={item.answer} />)
      }
      <View style={styles.contact}>
        <View style={{
          // flex: 1
        }}
        >
          <Text style={[styles.standardText, { marginBottom: 10 }]}>Have more questions?
          </Text>
          <Text style={styles.field}>
            Phone
          </Text>
          <Text onPress={() => {
            Linking.openURL('tel:6787185864');
          }}
          >
            678-718-5864
          </Text>
          <Text style={styles.field}>
            Email
          </Text>
          <Text onPress={() => {
            Linking.openURL('mailto:umi@umifeeds.org');
          }}
          >
            umi@umifeeds.org
          </Text>
        </View>
        <Logo style={{
          flexShrink: 1
        }}
        />
      </View>
    </ScrollView>
  );
}

type RowProps = {
  question: string,
  answer: string,
}

function Row({ question, answer }: RowProps) {
  const [displayText, setDisplayText] = React.useState<boolean>();
  const onPress = () => setDisplayText(!displayText);

  const displayStyle = () => {
    if (displayText) {
      return (
        <View style={{ paddingTop: '5%' }}>
          <Text>{answer}</Text>
        </View>
      );
    }
    return (
      <View style={{ display: 'none', paddingTop: '5%' }}>
        <Text>{answer}</Text>
      </View>
    );
  };

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      borderWidth: 1,
      borderRadius: 4,
      marginHorizontal: '5%',
      marginVertical: '2%',
      padding: '5%'
    }}
    >
      <View style={{
        flex: 1,
        flexDirection: 'row',
      }}
      >
        <View style={{ flex: 8 }}>
          <Text style={{
            flex: 1,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 15,
          }}
          >{question}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ alignSelf: 'center', paddingVertical: '6%' }}
            onPress={onPress}
          >
            <Icon name="plus" size={20} style={{ color: '#5D5D5D' }} />
          </TouchableOpacity>
        </View>
      </View>
      {
        displayStyle()
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  standardText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'rgba(62, 62, 62, 1)',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgba(252, 136, 52, 1)',
  },
  donationHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 30
  },
  donationContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 75,
    borderWidth: 2,
    borderColor: 'rgba(252, 136, 52, 1)',
    borderRadius: 10,
    marginHorizontal: 30,
    marginTop: 18,
    marginBottom: 15
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginBottom: 47,
  },
  boxes: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 138,
    height: 193,
    backgroundColor: 'rgba(255, 216, 196, 1)',
    borderRadius: 10
  },
  contact: {
    marginHorizontal: 30,
    marginVertical: '5%',
    flexDirection: 'row',
    overflow: 'hidden'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  field: {
    fontWeight: '700',
    color: 'gray',
    fontSize: 11,
    marginVertical: 5
  }
});
