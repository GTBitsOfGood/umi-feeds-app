import React, { useState } from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { Text } from '../../style/Themed';
import { DonationForm, DonationDishes, Address } from '../../types';
import { DonationsListScreenParamList } from '../../navigation/AdminStack/DonationList/types';
import { HomeScreenParamList } from '../../navigation/SharedStack/Home/types';
import { orangeColor } from '../Button/styles';
import { RootState } from '../../redux/rootReducer';
import { ChevronButton } from '..';
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
  ongoing: false,
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
  const [selectedList, setSelectedList] = useState('');
  const setId = (id?: string) => {
    if (id) {
      setSelectedList(id);
    }
  };

  const ongoingDonations: JSX.Element[] = [];
  const pastDonations: JSX.Element[] = [];
  forms.forEach((donation) => {
    if (donation.ongoing) {
      ongoingDonations.push(<DonationListBox
        key={donation._id}
        donation={donation}
        selectedId={selectedList}
        setSelectedList={setId}
      />);
    } else {
      pastDonations.push(<DonationListBox
        key={donation._id}
        donation={donation}
        selectedId={selectedList}
        setSelectedList={setId}
      />);
    }
  });

  const navigation = useNavigation<HomeScreenProps>();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
      >
        <ChevronButton text="Back" onPress={() => navigation.navigate('Home')} />
        <Text style={styles.title}>My donations</Text>
        <Text style={styles.subtitle}>Ongoing Donations</Text>
        {ongoingDonations}
        <Text style={styles.subtitle}>Completed Donations</Text>
        {pastDonations}
      </ScrollView>
    </View>
  );
}

function DonationListBox(props: { donation: DonationForm, selectedId: string, setSelectedList: (param1?: string) => void }) {
  const navigation = useNavigation<DonationListBoxProps>();

  const endTime = props.donation.pickupEndTime.toLocaleString().slice(0, 10);
  let pickupTime = 'TBA';
  let color = '#FC8834';
  if (props.donation.pickupEndTime !== undefined) {
    pickupTime = props.donation.pickupEndTime.toLocaleString().slice(11);
    color = '#3E3E3E';
  }

  const authState = useSelector((state: RootState) => state.auth);
  const donationDish = [];
  for (let i = 0; i < props.donation.donationDishes.length; i += 1) {
    let dishName = props.donation.donationDishes[i].dishID;
    for (let j = 0; j < authState.dishes.length; j += 1) {
      if (authState.dishes[j]._id === props.donation.donationDishes[i].dishID) {
        dishName = authState.dishes[i].dishName;
      }
    }
    if (i === props.donation.donationDishes.length - 1) {
      donationDish.push(<Text style={{ color, fontSize: 14, flex: 1 }} key={props.donation.donationDishes[i]._id}>{dishName} ({props.donation.donationDishes[i].quantity})</Text>);
    } else {
      donationDish.push(<Text style={{ color, fontSize: 14, flex: 1 }} key={props.donation.donationDishes[i]._id}>{dishName} ({props.donation.donationDishes[i].quantity}), </Text>);
    }
  }

  return (
    <Pressable
      style={props.donation._id === props.selectedId ? {
        marginBottom: 10,
        padding: 18,
        borderColor: orangeColor,
        borderWidth: 2,
        backgroundColor: 'rgba(243, 123, 54, 0.15)',
        height: 161
      } : {
        borderWidth: 2,
        marginBottom: 10,
        padding: 18,
        borderColor: color,
        height: 161 }}
      onPress={() => props.setSelectedList(props.donation._id)}
    >
      <View style={{ flex: 1, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color, fontSize: 15, fontWeight: 'bold' }}>{endTime}</Text>
        <Text
          style={{ color: '#5D5D5D', fontSize: 15, fontWeight: 'bold' }}
          onPress={() => navigation.navigate('DetailDonation', props.donation )}
        >
          View ⟩
        </Text>
      </View>
      <View style={{ flex: 1, marginBottom: 10 }}>
        <Text>{donationDish} </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color, fontSize: 15 }}>{`Picked up at: ${pickupTime}`}</Text>
      </View>
    </Pressable>
  );
}
