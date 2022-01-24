import React from 'react';
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { PrimaryButton } from '../../components';
import { moderateScale } from '../../../util';
import styles from './styles';

/**
 * Styling template guide on experiementing using flex and flexGrow in order to fluidly divide the components
 * across the screen so that the styling stays consistent across devices
 *
 * IMPORTANT NOTES:
 *  Concisely describe any important information users should know if they are to modify this component
 *  Breifly describe any async logic and how it incorporates with the react component being returned
 *
 *  ex)
 *   -> This is only used as a guide and is not actually implemented as a screen anywhere within the app
 *
 *  -> Developers can import and display this component in place of the login screen when they first login to
 *     test new designs
 *
 * KNOWN BUGS:
 *  List any known bugs that has ever happenned before and hasn't been resolved. Even if out of 100 times
 *  you've only seen the bug once still list it here
 *
 * @returns {TSX.Element}
 */
export default function Main() {
  // Use React Navigations Header because they have better spacing if Header
  // https://www.geeksforgeeks.org/react-native-configuring-header-bar/

  // play around with the height and see how it affects the display
  const [height, setHeight] = React.useState<number>(moderateScale(0));
  const [text, onChangeText] = React.useState<string>('Useless Text');
  return (
    <KeyboardAvoidingView style={styles.root} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1, borderColor: 'green', margin: '2%' }}>
        <View style={styles.headerContainer}>
          <View style={{ flex: 3, backgroundColor: 'green' }}>
            <Text style={styles.title}>Hello</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: 'yellow' }}>
            <Text style={styles.title}>Hello</Text>
          </View>
        </View>
        <View style={[styles.box1, { height }]} />
        <View style={[styles.box2, { height }]} />
        <TextInput
          style={[styles.box1, { height, backgroundColor: 'white', borderWidth: 3 }]}
          onChangeText={onChangeText}
          value={text}
        />
        <View style={[styles.box2, { height }]} />
        <PrimaryButton
          onPress={() => console.log('color')}
          disabled={false}
        >
          Schedule pickup time
        </PrimaryButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
