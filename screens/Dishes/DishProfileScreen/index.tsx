import React, { useState } from 'react';
import { StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View } from '../../../style/Themed';
import { Dish } from './types';
import { ChevronButton } from '../../../components';

import { moderateScale } from '../../../util/index';

const MockDish = {
  _id: 'flkjawfjf',
  dishName: 'Cheesy Garlic Chicken Parmesan',
  cost: 8.00,
  pounds: 2,
  allergens: ['Walnuts', 'Peanuts', 'Gluten'],
  imageLink: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-202102-airfryerchickenparm-180-ls-1612561654.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*',
  favorite: true,
  comments: 'Entered additional comments woot',
} as Dish;

export default function DishProfileScreen() {
  const [favorite, setFavorite] = useState(MockDish.favorite);

  const addFavorite = () => {
    setFavorite(!favorite);
  };

  const allergens = [];
  for (let i = 0; i < MockDish.allergens.length; i += 1) {
    if (i === MockDish.allergens.length - 1) {
      allergens.push(<Text key={i}>{MockDish.allergens[i]}</Text>);
    } else {
      allergens.push(<Text key={i}>{MockDish.allergens[i]}, </Text>);
    }
  }

  const [quantity, setQuantity] = useState(0);
  const onPlus = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const onMinus = () => setQuantity((prevQuantity) => (prevQuantity === 0 ? prevQuantity : prevQuantity - 1));

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={{ paddingLeft: '5%', paddingTop: '5%' }}>
          <ChevronButton
            text="Back"
            onPress={onPlus}
          />
        </View>
        <View style={styles.imgContainer}>
          <ImageBackground
            source={{ uri: MockDish.imageLink }}
            imageStyle={{
              borderRadius: 4,
              alignSelf: 'center',
            }}
            style={{
              height: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <Icon.Button
              name={favorite ? 'star' : 'star-o'}
              size={30}
              color="#F37B36"
              backgroundColor="transparent"
              onPress={addFavorite}
              style={{
                justifyContent: 'flex-end',
              }}
            />
          </ImageBackground>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.title}>{MockDish.dishName}</Text>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={styles.detailLabel}>Price per Serving</Text>
              <Text style={styles.detailValue}>$ {MockDish.cost.toString()}</Text>
            </View>
            <View>
              <Text style={styles.detailLabel}>Weight per Serving</Text>
              <Text style={styles.detailValue}>{MockDish.pounds} lbs</Text>
            </View>
          </View>
          {/* <View style={{ flex: }}>
          <Text style={styles.detailLabel} key={MockDish._id}>Allergen(s)</Text>
          <Text style={styles.detailValue}>{allergens}</Text>
        </View> */}
          <View>
            <Text style={styles.detailLabel} key={MockDish._id}>{MockDish.comments === '' ? '' : 'Additional comment(s)'}</Text>
            <Text style={styles.detailValue}>{MockDish.comments}</Text>
          </View>
        </View>
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
      </View>
    </ScrollView>
  );
}

// React Native Styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(25)
  },
  imgContainer: {
    height: moderateScale(200),
  },
  detailContainer: {
    paddingTop: moderateScale(12),
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '75%',
  },
  title: {
    fontSize: moderateScale(25),
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginBottom: moderateScale(16)
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
    marginTop: moderateScale(5),
    marginBottom: moderateScale(20)
  },
  quantityLabel: {
    fontWeight: '700',
    color: '#B8B8B8',
    fontSize: 12,
    marginRight: 25,
  },
  quantityController: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#B8B8B8',
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 4,
  },
  quantityCount: {
    paddingHorizontal: moderateScale(86),
    paddingTop: 8
  },
  addToListButton: {
    backgroundColor: '#F37B36',
    alignItems: 'center',
    paddingVertical: moderateScale(12),
    borderRadius: 4,
    width: '100%',
  },
  addToListText: {
    fontWeight: '700',
    fontSize: moderateScale(17),
    color: 'white',
  }
});
