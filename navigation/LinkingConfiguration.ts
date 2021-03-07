import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
          MapScreen: {
            screens: {
              MapScreen: 'map'
            }
          },
          DonationsListScreen: {
            screens: {
              DonationsListScreen: 'donations list'
            }
          },
        },
      },
      NotFound: '*',
    },
  },
};
