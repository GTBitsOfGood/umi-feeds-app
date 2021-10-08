import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dish } from './types';

const MockDish = {
  _id: 'flkjawfjf',
  dishName: 'Cheesy Garlic Chicken Parmesan',
  cost: 8.00,
  pounds: 2,
  allergens: ['Walnuts', 'Peanuts', 'Gluten'],
  imageLink: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-202102-airfryerchickenparm-180-ls-1612561654.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*',
  favorite: true,
  comments: '',
} as Dish;

export default function DishProfileScreen() {
  const [favorite, setFavorite] = useState(MockDish.favorite);

  const addFavorite = () => {
    setFavorite(!favorite);
  };

  const allergens = [];
  for (let i = 0; i < MockDish.allergens.length; i += 1) {
    if (i === MockDish.allergens.length - 1) {
      allergens.push(<Text>{MockDish.allergens[i]}</Text>);
    } else {
      allergens.push(<Text>{MockDish.allergens[i]}, </Text>);
    }
  }

  const quantity = 0;

  return (
    <View style={styles.container}>
      <Button
        title="Back"
        type="clear"
        style={styles.backButton}
      />
      <View style={styles.imgContainer}>
        <Image
          source={{ uri: MockDish.imageLink }}
          style={{
            width: '90%',
            height: 250,
            backgroundColor: 'rgba(0,0,0,1)',
            borderRadius: 4
          }}
        />
      </View>
      <View style={styles.favButton}>
        <Icon.Button
          name={favorite ? 'star' : 'star-o'}
          size={30}
          color="#F37B36"
          backgroundColor="white"
          onPress={addFavorite}
          iconStyle={{
            position: 'relative',
            padding: 0 }}
        />
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.dishTitle}>{MockDish.dishName}</Text>
        <View>
          <Text style={styles.detailLabel}>Price per Serving</Text>
          <Text style={styles.detailValue}>${MockDish.cost.toString()}</Text>
        </View>
        <View>
          <Text style={styles.detailLabel}>Weight per Serving</Text>
          <Text>{MockDish.pounds} lbs</Text>
        </View>
        <View>
          <Text style={styles.detailLabel}>Allergen(s)</Text>
          <Text>{allergens}</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text>Quantity</Text>
        <View style={styles.counter}>
          <Icon.Button
            name="plus"
            size={10}
            color="#5D5D5D"
          />
        </View>
      </View>
    </View>
  );
}

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    fontFamily: 'Roboto-Regular',
    backgroundColor: 'white'
  },
  backButton: {
    margin: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imgContainer: {
    width: '100%',
    position: 'relative',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favButton: {
    height: 100,
    position: 'absolute',
    top: 250,
    right: '8%',
    elevation: 10,
  },
  detailContainer: {
    marginTop: 24,
    marginLeft: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 280
  },
  dishTitle: {
    fontSize: 32,
    fontWeight: '500',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginBottom: 16
  },
  detailLabel: {
    marginBottom: 8,
    fontWeight: '700',
    color: '#B8B8B8',
    marginRight: 24,
    fontSize: 12
  },
  detailValue: {
    marginBottom: 16,
    fontSize: 15
  },
  quantityContainer: {
    marginLeft: 24,
    marginTop: 20
  },
  counter: {
    borderColor: '#E6E6E6',
  }
});
