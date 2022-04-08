import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { UserGuideParamList } from '../../navigation/UserGuidesStack/types';
import styles from './guideStyles';

type UserGuideOneProps = StackNavigationProp<UserGuideParamList, 'UserGuideThree'>

/**
 * User Profile Component
 * @returns {JSX.Element}
 */
export default function GuideScreensThree() {
  const navigation = useNavigation<UserGuideOneProps>();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/UserGuide3.png')}
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
            Step 3/5
          </Text>
          <Text style={styles.instrText}>
            Once you have added everything to your donation, click the donation cart icon and hit “schedule donation pickup”
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('UserGuideFour')}>
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
