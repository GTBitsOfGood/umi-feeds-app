import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Entypo';
import { Header } from '../../components';

import { UserProfileScreenParamList } from '../../navigation/SharedStack/UserProfile/types';

type HelpScreenProps = StackNavigationProp<UserProfileScreenParamList, 'HelpScreen'>

/**
 * User Profile Component
 * @returns {JSX.Element}
 */
export default function Help() {
  const navigation = useNavigation<HelpScreenProps>();
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        justifyContent: 'space-between'
      }}
    >
      <View style={styles.topContainer}>
        <Header title="Need help?" showCartButton={false} />
      </View>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        borderWidth: 1,
        borderRadius: 4,
        marginHorizontal: '5%',
        marginVertical: '2%',
        padding: '5%',
        borderColor: '#B8B8B8',
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
            >View Donation Tutorial
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ alignSelf: 'center', paddingVertical: '6%' }}
              onPress={() => navigation.navigate('UserGuideOne')}
            >
              <Icon name="chevron-right" size={20} style={{ color: '#5D5D5D' }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        borderWidth: 1,
        borderRadius: 4,
        marginHorizontal: '5%',
        marginVertical: '2%',
        padding: '5%',
        borderColor: '#B8B8B8',
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
            >View Umi Feeds FAQ
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ alignSelf: 'center', paddingVertical: '6%' }}
              onPress={() => navigation.navigate('FAQScreen')}
            >
              <Icon name="chevron-right" size={20} style={{ color: '#5D5D5D' }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
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
});
