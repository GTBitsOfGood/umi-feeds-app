import React, { useState, useEffect } from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { Text } from '../../style/Themed';
import { DonationForm, DonationDishes, Address, Dish } from '../../types';
import { DonationsListScreenParamList } from '../../navigation/AdminStack/DonationList/types';
import { HomeScreenParamList } from '../../navigation/SharedStack/Home/types';
import { orangeColor } from '../Button/styles';
import { RootState } from '../../redux/rootReducer';
import { ChevronButton } from '..';
import { moderateScale } from '../../util/index';
import styles from './styles';

type DonationListBoxProps = StackNavigationProp<DonationsListScreenParamList, 'DonationsListScreen'>
type HomeScreenProps = StackNavigationProp<HomeScreenParamList, 'Home'>

const dish1 = {
  _id: 'dishid',
  dishName: 'Grandma\'s Wonton Soup',
  cost: 5,
  pounds: 2,
  allergens: ['peanuts'],
  imageLink: 'image',
  comments: 'There are no comments',
  favorite: true
};

const dish2 = {
  _id: 'dishidid',
  dishName: 'Spinach Ravioli',
  cost: 5,
  pounds: 2,
  allergens: ['peanuts'],
  imageLink: 'image',
  comments: 'There are no comments',
  favorite: true
};

const d1: Date = new Date();

const addr = {
  _id: 'addrid',
  streetAddress: '930 Spring St',
  buildingNumber: 19,
  city: 'Atlanta',
  state: 'GA',
  zipCode: 30309,
  longitude: 14,
  latitude: 26
} as Address;

const dd1 = {
  _id: 'dd1id',
  dishID: 'dishid',
  quantity: 10,
} as DonationDishes;

const dd2 = {
  _id: 'dd2id',
  dishID: 'dishidid',
  quantity: 5,
} as DonationDishes;

const df1 = {
  _id: 'df1id',
  ongoing: true,
  status: 'ongoing',
  imageLink: 'https://spoonuniversity.com/wp-content/uploads/sites/26/2015/09/IMG_8295.jpg',
  donationDishes: [dd1, dd2],
  pickupAddress: addr,
  pickupInstructions: 'pickup at front',
  pickupStartTime: d1,
  pickupEndTime: d1,
  volunteerLockTime: d1,
  lockedByVolunteer: false,
  confirmPickUpTime: d1,
  confirmDropOffTime: d1,
} as DonationForm;

const df2 = {
  _id: 'df2id',
  ongoing: true,
  status: 'ongoing',
  imageLink: 'https://spoonuniversity.com/wp-content/uploads/sites/26/2015/09/IMG_8295.jpg',
  donationDishes: [dd1, dd2],
  pickupAddress: addr,
  pickupInstructions: 'pickup at front',
  pickupStartTime: d1,
  pickupEndTime: d1,
  volunteerLockTime: d1,
  lockedByVolunteer: false,
  confirmPickUpTime: d1,
  confirmDropOffTime: d1,
} as DonationForm;

const forms = [df1, df2];

export default function DonationsList() {
  const authState = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<HomeScreenProps>();

  const [selectedList, setSelectedList] = useState('');
  const [ongoingDonations, setOngoingDonations] = useState<JSX.Element[]>([]);
  const [pastDonations, setPastDonations] = useState<JSX.Element[]>([]);

  const setId = (id?: string) => {
    if (id) {
      setSelectedList(id);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
      >
        <ChevronButton text="Back" onPress={() => navigation.navigate('Home')} />
        <Text style={styles.title}>My donations</Text>
        <Text style={styles.subtitle}>Ongoing Donations</Text>
        {
          authState.donations.map((donation) => {
            if (donation.ongoing) {
              return (
                <DonationListBox
                  key={donation._id}
                  donation={donation}
                  selectedId={selectedList}
                  setSelectedList={setId}
                  dishes={authState.dishes}
                />
              );
            } else {
              return null;
            }
          })
        }
        <Text style={styles.subtitle}>Past Donations</Text>
        {
          authState.donations.map((donation) => {
            if (!donation.ongoing) {
              return (
                <DonationListBox
                  key={donation._id}
                  donation={donation}
                  selectedId={selectedList}
                  setSelectedList={setId}
                  dishes={authState.dishes}
                />
              );
            } else {
              return null;
            }
          })
        }
      </ScrollView>
    </View>
  );
}

function DonationListBox(props: { donation: DonationForm, selectedId: string, dishes: Dish[], setSelectedList: (param1?: string) => void }) {
  const navigation = useNavigation<DonationListBoxProps>();
  const { dishes, donation } = props;
  const endTime = props.donation.pickupEndTime.toLocaleString().slice(0, 9);
  let pickupTime = 'TBA';
  let color = '#FC8834';
  if (props.donation.pickupEndTime !== undefined) {
    pickupTime = new Date(props.donation.pickupEndTime).toLocaleDateString('en-US');
    color = '#3E3E3E';
  }

  // const donationDish = [];
  // if (donation.dishes) {
  //   for (let i = 0; i < donation.dishes.length; i += 1) {
  //     const { dishID } = donation.dishes[i];
  //     const numDish = dishes.length < 5 ? dishes.length : 5;
  //     for (let j = 0; j < numDish; j += 1) {
  //       console.log(dishes[j]._id);
  //       if (dishes[j]._id === dishID) {
  //         donationDish.push(dishes[j].dishName);
  //         // donationDish.push(<Text style={{ color, fontSize: 14, flex: 1 }} key={props.donation.donationDishes[i]._id}>{dishes[j].dishName} ({props.donation.donationDishes[i].quantity})</Text>);
  //       }
  //     }
  //   }
  // }

  return (
    <Pressable
      style={props.donation._id === props.selectedId ? {
        marginBottom: 10,
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderColor: orangeColor,
        borderWidth: 2,
        backgroundColor: 'rgba(243, 123, 54, 0.15)',
        height: moderateScale(120),
        borderRadius: 4
      } : {
        borderWidth: 2,
        borderRadius: 4,
        marginBottom: 10,
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderColor: color,
        height: moderateScale(120) }}
      onPress={() => props.setSelectedList(props.donation._id)}
    >
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color, fontSize: 15, fontWeight: 'bold' }}>{endTime}</Text>
        <Text
          style={{ color: '#5D5D5D', fontSize: 15, fontWeight: 'bold' }}
          onPress={() => navigation.navigate('DetailDonation', props.donation)}
        >
          View ⟩
        </Text>
      </View>
      {/* <View style={{ flex: 3, paddingVertical: 10 }}>
        <Text>
          {
            donationDish.map((dish) => <Text style={{ color, fontSize: 14, flex: 1 }} key={dish}>{dish}, </Text>)
          }
        </Text>
      </View> */}
      <View style={{ flex: 2, marginVertical: 5 }}>
        <Text style={{ color, fontSize: 15 }}>{donation.pickupInstructions}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color, fontSize: 15 }}>{`Picked up at: ${pickupTime}`}</Text>
      </View>
    </Pressable>
  );
}
