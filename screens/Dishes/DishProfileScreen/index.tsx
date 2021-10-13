import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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

  const [quantity, setQuantity] = useState(0);
  const onPlus = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const onMinus = () => setQuantity((prevQuantity) => prevQuantity - 1);

  const [count, setCount] = useState(0);
  const onPress = () => setCount((prevCount) => prevCount + 1);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onPress}
      >
        <Icon
          name="chevron-left"
          color="#F37B36"
          style={styles.backIcon}
        />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
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
          <Text style={styles.detailLabel} key={MockDish._id}>Allergen(s)</Text>
          <Text>{allergens}</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Quantity</Text>
        <View style={styles.quantityController}>
          <Icon.Button
            name="minus"
            size={20}
            color="#5D5D5D"
            backgroundColor="white"
            onPress={onMinus}
          />
          <Text style={styles.quantityCount}>{quantity}</Text>
          <Icon.Button
            name="plus"
            size={20}
            color="#5D5D5D"
            backgroundColor="white"
            onPress={onPlus}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.addToListButton}>
        <Text style={styles.addToListText}>Add to donation list ({quantity})</Text>
      </TouchableOpacity>
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
    color: '#F37B36',
    fontSize: 15,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10
  },
  backIcon: {
    paddingTop: 4,
    fontSize: 10
  },
  backText: {
    color: '#F37B36',
    paddingLeft: 5,
    fontSize: 15
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
    top: 230,
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
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 24,
  },
  quantityLabel: {
    fontWeight: '700',
    color: '#B8B8B8',
    fontSize: 12,
    marginTop: 72
  },
  quantityController: {
    marginHorizontal: 25,
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#B8B8B8',
    borderWidth: 1,
    paddingVertical: 10,
    padding: 15,
    borderRadius: 4
  },
  quantityCount: {
    paddingHorizontal: 80,
    paddingTop: 8,
  },
  addToListButton: {
    backgroundColor: '#F37B36',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    position: 'absolute',
    width: 364,
    height: 52,
    left: 25,
    top: 58,
  },
  addToListText: {
    fontWeight: '700',
    color: 'white',
    fontSize: 17,
  }
});
