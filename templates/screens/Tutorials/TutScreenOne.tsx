import React from 'react';
import { View } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import styles from './styles';
import { PrimaryButton } from '../../components';

// this is so silly but I am having the hardest time figuring out the correct import statement for the images

// import { TutScreenOne } from '././././assets/images/TutScreenOne.PNG'
import TutScreenOne from '../../assets/images/TutScreenOne.PNG';
// import { TutScreenOne } from 'C:/User Drive/Programming/Umi Feeds/umi-feeds-app/assets/images/TutScreenOne.PNG'
// import { TutScreenOne } from 'C:/User Drive/Programming/Umi Feeds/umi-feeds-app/templates/screens/Tutorials/TutScreenOne.tsx'

const TutorialOne = () => (
  <View style={[styles.container, {
    flexDirection: 'column'
  }]}
  >
    <View style={{ flex: 3 }}>
      <img src={TutScreenOne} alt="Tutorial Page 1" />
    </View>

    <View style={{ flex: 1, backgroundColor: 'white' }} />
  </View>
);

export default TutorialOne;
