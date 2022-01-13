import React, { useState } from 'react';
import { StyleSheet, ImageBackground, ScrollView, Route } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Text, View } from '../../../style/Themed';
import { ChevronButton } from '../../../components';
import { DonateTabParamList } from '../../../navigation/DonorStack/Donate/types';
import { BottomTabParamList } from '../../../navigation/MainNavBar/types';
import NoImageAvailable from '../../../assets/images/NoImageAvailable.jpeg';

import { moderateScale } from '../../../util/index';

type DonationScreenProp = CompositeNavigationProp<
  StackNavigationProp<DonateTabParamList, 'DishProfile'>,
  BottomTabNavigationProp<BottomTabParamList, 'Home'>
>;

export default function DishProfileScreen({ route }:Route) {
  const navigation = useNavigation<DonationScreenProp>();

  const allergens = [];
  for (let i = 0; i < route.params.dish.allergens.length; i += 1) {
    if (i === route.params.dish.allergens.length - 1) {
      allergens.push(<Text key={i}>{route.params.dish.allergens[i]}</Text>);
    } else {
      allergens.push(<Text key={i}>{route.params.dish.allergens[i]}, </Text>);
    }
  }

  const comm = [];
  if (route.params.dish.comments !== '') {
    comm.push(<Text style={styles.detailLabel} key={route.params.dish._id}>{route.params.dish.comments === '' ? '' : 'Additional comment(s)'}</Text>);
    comm.push(<Text key={1} style={styles.detailValue}>{route.params.dish.comments}</Text>);
  }

  const [quantity, setQuantity] = useState(0);
  const onPlus = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const onMinus = () => setQuantity((prevQuantity) => (prevQuantity === 0 ? prevQuantity : prevQuantity - 1));

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={styles.container}
    >
      <View style={{ flex: 2 }} />
      <View style={{ flex: 2, paddingLeft: '5%', paddingTop: '5%' }}>
        <ChevronButton
          text="Back"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.imgContainer}>
        <ImageBackground
          source={route.params.dish.imageLink !== '' ? { uri: route.params.dish.imageLink } : NoImageAvailable}
          imageStyle={{
            borderRadius: 4,
            alignSelf: 'center',
          }}
          style={{
            height: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <Icon
            name={route.params.dish.favorite ? 'star' : 'star-o'}
            size={30}
            color="#F37B36"
            style={{
              alignSelf: 'flex-end',
              backgroundColor: 'white',
              borderRadius: 15,
              margin: 10,
              padding: 5
            }}
          />
        </ImageBackground>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.title}>{route.params.dish.dishName}</Text>
        <View style={{ flexDirection: 'column', marginLeft: 15 }}>
          <Icon
            name="pencil"
            color="#5D5D5D"
            size={25.5}
          />
          <Text style={{ color: '#5D5D5D' }}>Edit</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text style={styles.detailLabel}>Price per Serving</Text>
            <Text style={styles.detailValue}>$ {route.params.dish.cost.toString()}</Text>
          </View>
          <View>
            <Text style={styles.detailLabel}>Weight per Serving</Text>
            <Text style={styles.detailValue}>{route.params.dish.pounds} lbs</Text>
          </View>
        </View>
        <View>
          <Text style={styles.detailLabel} key={route.params.dish._id}>Allergen(s)</Text>
          <Text style={styles.detailValue}>{allergens}</Text>
        </View>
        <View>{comm}</View>
      </View>
      { (route.params.canEdit) ?? (
        <>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityController}>
              <Icon.Button
                name="minus"
                size={20}
                color="#5D5D5D"
                backgroundColor="transparent"
                onPress={onMinus}
              />
              <Text style={styles.quantityCount}>{quantity}</Text>
              <Icon.Button
                name="plus"
                size={20}
                color="#5D5D5D"
                backgroundColor="transparent"
                onPress={onPlus}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.addToListButton}>
            <Text style={styles.addToListText}>Add to donation list ({quantity})</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

// React Native Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(25),
    height: '110%'
  },
  imgContainer: {
    flex: 2000,
    marginVertical: moderateScale(5),
    marginTop: moderateScale(15)
  },
  detailContainer: {
    flexGrow: 5,
    paddingTop: moderateScale(12),
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  title: {
    flex: 5,
    fontSize: moderateScale(32),
    fontWeight: '500',
    alignSelf: 'flex-start',
  },
  detailLabel: {
    marginBottom: 8,
    fontWeight: '700',
    color: '#B8B8B8',
    marginRight: 24,
    fontSize: 12
  },
  detailValue: {
    marginBottom: moderateScale(16),
    fontSize: moderateScale(15)
  },
  quantityContainer: {
    flex: 6,
    marginTop: moderateScale(5),
    marginBottom: moderateScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  quantityLabel: {
    fontWeight: '700',
    color: '#B8B8B8',
    fontSize: 12,
    minWidth: '20%'
  },
  quantityController: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#B8B8B8',
    borderWidth: 1,
    paddingVertical: moderateScale(10),
    borderRadius: 4,
    minWidth: '80%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  quantityCount: {
    alignItems: 'center',
    paddingHorizontal: 25
  },
  addToListButton: {
    flex: 4,
    backgroundColor: '#F37B36',
    alignItems: 'center',
    paddingVertical: moderateScale(16),
    borderRadius: 4,
    width: '100%',
    marginVertical: moderateScale(15)
  },
  addToListText: {
    fontWeight: '700',
    fontSize: moderateScale(17),
    color: 'white',
  }
});
