import React from 'react';
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import { PrimaryButton } from '../components';

import { moderateScale } from '../util';
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
export default function MVP() {
  // Use React Navigations Header because they have better spacing if Header
  // https://www.geeksforgeeks.org/react-native-configuring-header-bar/

  // play around with the height and see how it affects the display
  const [cypress1, setCypress1] = React.useState<string>('56');
  const [cypress2, setCypress2] = React.useState<string>('23');

  const [rock1, setRock1] = React.useState<string>('56');
  const [rock2, setRock2] = React.useState<string>('23');

  const [vortex1, setVortex1] = React.useState<string>('56');
  const [vortex2, setVortex2] = React.useState<string>('23');

  React.useEffect(() => {
    const interval = setInterval(
      () => {
        setCypress1((Math.floor(Math.random() * 100 + 1)).toString());
        setCypress2((Math.floor(Math.random() * 100 + 1)).toString());

        setRock1((Math.floor(Math.random() * 100 + 1)).toString());
        setRock2((Math.floor(Math.random() * 100 + 1)).toString());

        setVortex1((Math.floor(Math.random() * 100 + 1)).toString());
        setVortex2((Math.floor(Math.random() * 100 + 1)).toString());
      }, 3000
    );

    // clean up interval on unmount
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <KeyboardAvoidingView style={styles.root} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1, borderColor: 'green', marginHorizontal: '3%', marginVertical: '10%' }}>
        <Card
          mediaSource={require('../assets/images/cypress.jpg')}
          style={{ margin: 10 }}
        >
          <CardTitle
            subtitleAbove={false}
            title="Cypress Street Pint and Plate"
            subtitle="4.5 Stars"
          />
          <CardAction inColumn={false}>
            <CardButton
              title="0.1 Mi Away"
            />
            <CardButton
              title={cypress1}
            />
            <CardButton
              title={cypress2}
            />
          </CardAction>
        </Card>
        <Card style={{ margin: 10 }} mediaSource={require('../assets/images/rocksteady.jpg')}>
          <CardTitle
            titleStyle={{ color: 'white' }}
            title="Rock Steady"
            subtitle="4.4 Stars"
          />
          <CardAction separator>
            <CardButton
              title="0.2 MI Away"
            />
            <CardButton
              title={rock1}
            />
            <CardButton
              title={rock2}
            />
          </CardAction>
        </Card>
        <Card style={{ margin: 10 }} mediaSource={require('../assets/images/vortex.jpeg')}>
          <CardTitle
            titleStyle={{ color: 'white' }}
            title="The Vortex Bar and Grill"
            subtitle="4.5 Stars"
          />
          <CardAction separator>
            <CardButton
              title="5 Mi Away"
            />
            <CardButton
              title={vortex1}
            />
            <CardButton
              title={vortex2}
            />
          </CardAction>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
