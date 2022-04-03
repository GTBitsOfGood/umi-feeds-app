import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { UserGuideParamList } from '../../navigation/UserGuidesStack/types';
import styles from './guideStyles';

type UserGuideOneProps = StackNavigationProp<UserGuideParamList, 'UserGuideOne'>

/**
 * User Profile Component
 * @returns {JSX.Element}
 */
export default function GuideScreensOne() {
  const navigation = useNavigation<UserGuideOneProps>();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/UserGuide1.1.png')}
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
            Step 1/5
          </Text>
          <Text style={styles.instrText}>
            Click the “donate” tab at the bottom of the page, then hit “create new dish”
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('UserGuideTwo')}>
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
