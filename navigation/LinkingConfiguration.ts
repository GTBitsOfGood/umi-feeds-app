// NOT IN USE AS WE'RE CURRENTLY NOT FOCUSING ON WEB SUPPORT OR ANY SORT OF DEEP-LINKING

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
          DonationScreen: {
            screens: {
              DonationScreen: 'donation'
            },
          },
          MapScreen: {
            screens: {
              MapScreen: 'map',
              DonationDetails: 'donation details'
            }
          },
          LoginScreen: {
            screens: {
              LoginScreen: 'login',
              NewDonorName: 'New Donor Name',
              NewDonorNumber: 'New Donor Number',
              NewDonorLocation: 'New Donor Location',
            }
          },
          DonationsListScreen: {
            screens: {
              DonationsListScreen: 'donations list',
              EditDonationDetails: 'edit donation details'
            }
          },
          FilePickerScreen: {
            screens: {
              FilePickerScreen: 'file picker'
            }
          },
        },
      },
      NotFound: '*',
    },
  },
};
