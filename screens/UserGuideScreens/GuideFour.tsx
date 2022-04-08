import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { UserGuideParamList } from '../../navigation/UserGuidesStack/types';
import styles from './guideStyles';

type UserGuideOneProps = StackNavigationProp<UserGuideParamList, 'UserGuideFour'>

/**
 * User Profile Component
 * @returns {JSX.Element}
 */
export default function GuideScreensFour() {
  const navigation = useNavigation<UserGuideOneProps>();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/UserGuide4.png')}
          style={{ width: '80%', height: '100%', resizeMode: 'cover' }}
          resizeMode="stretch"
        />
      </View>
      <View style={{ flex: 0.1, backgroundColor: 'white' }} />
      <View style={{ flex: 1.3, backgroundColor: 'white' }}>
        <View style={{ backgroundColor: 'white', paddingHorizontal: '10%', paddingVertical: '5%' }}>
          <Text
            style={styles.stepText}
          >
            Step 4/5
          </Text>
          <Text style={styles.instrText}>
            Select an address, date, and time window for your donation pickup.
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('UserGuideFive')}>
              <Text style={styles.buttonText}>
                Next
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
