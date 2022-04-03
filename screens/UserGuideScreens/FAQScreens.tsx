import { View, Text, Image, Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
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
    answer: 'What is Umi Feeds? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: 2,
    question: 'How do I donate food?',
    answer: 'How do I donate food? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: 3,
    question: 'How do I create a Dish?',
    answer: 'How do I create a Dish? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: 4,
    question: 'How do I add a dish to my cart?',
    answer: 'How do I add a dish to my cart? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: 5,
    question: 'How do I schedule a pickup for a donation?',
    answer: 'How do I schedule a pickup for a donation? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: 6,
    question: 'How do I know if my donation will be picked up?',
    answer: 'How do I know if my donation will be picked up? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
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
