import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { UserGuideParamList } from '../../navigation/UserGuidesStack/types';
import styles from './guideStyles';

type UserGuideOneProps = StackNavigationProp<UserGuideParamList, 'UserGuideTwo'>

/**
 * User Profile Component
 * @returns {JSX.Element}
 */
export default function GuideScreensTwo() {
  const navigation = useNavigation<UserGuideOneProps>();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/UserGuide2.png')}
          style={{ width: '85%', height: '100%', resizeMode: 'cover' }}
          resizeMode="stretch"
        />
      </View>
      <View style={{ flex: 1.4, backgroundColor: 'white' }}>
        <View style={{ backgroundColor: 'white', paddingHorizontal: '10%', paddingVertical: '5%' }}>
          <Text
            style={styles.stepText}
          >
            Step 2/5
          </Text>
          <Text style={styles.instrText}>
            Provide meal information. Then, change the quantity to the number of servings being donated and hit “add to cart”
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('UserGuideThree')}>
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
