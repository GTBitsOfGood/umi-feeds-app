import React, { useState } from 'react';
import { Image, StyleSheet, ScrollView, Platform, Pressable } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { Text, View } from '../../style/Themed';
import { Dish, DonationDishes } from '../../types';
import DonateQuantityModal from '../../components/DonateQuantityModal';
import { addDish } from '../../redux/reducers/authReducer';
import { addToCart } from '../../redux/reducers/donationCartReducer';

function DishForm(props: { dish?: Dish }) {
  const [uploadImage, setUploadImage] = useState<string | null>(null); // uri of image taken by camera
  const [dishName, setDishName] = useState(props.dish?.dishName ?? '');
  const [cost, setCost] = useState<number | ''>(props.dish?.cost ?? '');
  const [pounds, setPounds] = useState<number | ''>(props.dish?.pounds ?? '');

  const [comments, setComments] = useState(props.dish?.comments ?? '');
  const [allergens, setAllergens] = useState<string[]>([]);

  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const closeModal = () => setModalVisible(!modalVisible);
  const modalSubmit = (quantity: DonationDishes) => setQuantity(quantity);
  const [quantity, setQuantity] = useState<DonationDishes>();

  const DishObj = {
    dishName,
    cost: Number(cost),
    pounds: Number(pounds),
    allergens,
    imageLink: String(uploadImage), // link to azure image
    comments: String(comments),
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      setModalVisible(!modalVisible);
      if (uploadImage) {
        const file = { uri: uploadImage, name: 'image.jpg', type: 'image/jpeg' };
        setUploadImage(file.uri);
      }
      dispatch(addDish(DishObj));
      if (quantity) {
        dispatch(addToCart(quantity));
      }
      console.log('Submitting dish form');
      // TO DO: set up POST request and have reducer actions within
    }
  };

  // Check that the required inputs are all filled, allergens only requires one to be checked.
  const isFormValid = () => {
    const allergy = (allergens.indexOf('dairy') > -1 || allergens.indexOf('gluten') > -1
    || allergens.indexOf('soy') > -1 || allergens.indexOf('tree nuts') > -1 || allergens.indexOf('fish') > -1
    || allergens.indexOf('peanuts') > -1 || allergens.indexOf('shellfish') > -1 || allergens.indexOf('egg') > -1
    || allergens.indexOf('other') > -1 || allergens.indexOf('none') > -1);
    return dishName && cost && pounds && allergy;
  };

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      cropping: false,
    });
    if (!result.cancelled) {
      const file = { uri: result.uri, name: 'image.jpg', type: 'image/jpeg' };
      setUploadImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.dishContainer}>
          <Text style={styles.title}>Create a new dish</Text>
          <Text style={styles.description}>Provide the following information about the dish to added to your dish inventory</Text>
          <View style={styles.boxInput}>
            <Input
              value={dishName}
              placeholder="Dish Name (required)"
              onChangeText={(name: string) => setDishName(name)}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              style={{ fontSize: 15 }}
              multiline
            />
          </View>
          <View style={styles.boxInput}>
            <Input
              value={cost.toString()}
              placeholder="Cost of serving in dollars (required)"
              onChangeText={(cost: string) => setCost(Number.isFinite(+cost) && cost !== '' ? +cost : '')}
              keyboardType="numeric"
              inputContainerStyle={{ borderBottomWidth: 0 }}
              style={{ fontSize: 15 }}
              multiline
            />
          </View>
          <View style={styles.boxInput}>
            <Input
              value={pounds.toString()}
              placeholder="Weight of serving in pounds (required)"
              onChangeText={(weight: string) => setPounds(Number.isFinite(+weight) && weight !== '' ? +weight : '')}
              keyboardType="numeric"
              inputContainerStyle={{ borderBottomWidth: 0 }}
              style={{ fontSize: 16 }}
              multiline
            />
          </View>
          <Text style={styles.subsection}>This dish may contain (required):</Text>
          <View style={styles.checkboxContainer}>
            <View style={styles.item}>
              <CheckBox
                containerStyle={styles.checkbox}
                textStyle={{ fontWeight: 'normal' }}
                title="Dairy"
                checkedColor="#F37B36"
                          // checked={this.state.checked}
                checked={allergens.indexOf('dairy') > -1}
                onPress={() => {
                  if (allergens.indexOf('dairy') == -1) {
                    setAllergens((allergens) => [...allergens, 'dairy']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str != 'dairy'));
                  }
                }}
              />
            </View>
            <View style={styles.item}>
              <CheckBox
                containerStyle={styles.checkbox}
                textStyle={{ fontWeight: 'normal' }}
                title="Gluten"
                checkedColor="#F37B36"
                checked={allergens.indexOf('gluten') > -1}
                onPress={() => {
                  if (allergens.indexOf('gluten') == -1) {
                    setAllergens((allergens) => [...allergens, 'gluten']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str != 'gluten'));
                  }
                }}
              />
            </View>
            <View style={styles.item}>
              <CheckBox
                containerStyle={styles.checkbox}
                textStyle={{ fontWeight: 'normal' }}
                title="Soy"
                checkedColor="#F37B36"
                checked={allergens.indexOf('soy') > -1}
                onPress={() => {
                  if (allergens.indexOf('soy') == -1) {
                    setAllergens((allergens) => [...allergens, 'soy']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str != 'soy'));
                  }
                }}
              />
            </View>
            <View style={styles.item}>
              <CheckBox
                containerStyle={styles.checkbox}
                textStyle={{ fontWeight: 'normal' }}
                title="Tree nuts"
                checkedColor="#F37B36"
                checked={allergens.indexOf('treen nuts') > -1}
                onPress={() => {
                  if (allergens.indexOf('tree nuts') == -1) {
                    setAllergens((allergens) => [...allergens, 'tree nuts']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str != 'tree nuts'));
                  }
                }}
              />
            </View>
            <View style={styles.item}>
              <CheckBox
                containerStyle={styles.checkbox}
                textStyle={{ fontWeight: 'normal' }}
                title="Fish"
                checkedColor="#F37B36"
                checked={allergens.indexOf('fish') > -1}
                onPress={() => {
                  if (allergens.indexOf('fish') == -1) {
                    setAllergens((allergens) => [...allergens, 'fish']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str != 'fish'));
                  }
                }}
              />
            </View>
            <View style={styles.item}>
              <CheckBox
                containerStyle={styles.checkbox}
                textStyle={{ fontWeight: 'normal' }}
                title="Peanut"
                checkedColor="#F37B36"
                checked={allergens.indexOf('peanuts') > -1}
                onPress={() => {
                  if (allergens.indexOf('peanuts') == -1) {
                    setAllergens((allergens) => [...allergens, 'peanuts']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str != 'peanuts'));
                  }
                }}
              />
            </View>
            <View style={styles.item}>
              <CheckBox
                containerStyle={styles.checkbox}
                textStyle={{ fontWeight: 'normal' }}
                title="Shellfish"
                checkedColor="#F37B36"
                checked={allergens.indexOf('shellfish') > -1}
                onPress={() => {
                  if (allergens.indexOf('shellfish') == -1) {
                    setAllergens((allergens) => [...allergens, 'shellfish']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str != 'shellfish'));
                  }
                }}
              />
            </View>
            <View style={styles.item}>
              <CheckBox
                containerStyle={styles.checkbox}
                textStyle={{ fontWeight: 'normal' }}
                title="Egg"
                checkedColor="#F37B36"
                checked={allergens.indexOf('egg') > -1}
                onPress={() => {
                  if (allergens.indexOf('egg') == -1) {
                    setAllergens((allergens) => [...allergens, 'egg']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str != 'egg'));
                  }
                }}
              />
            </View>
            <View style={styles.item}>
              <CheckBox
                containerStyle={styles.checkbox}
                textStyle={{ fontWeight: 'normal' }}
                title="Other"
                checkedColor="#F37B36"
                checked={allergens.indexOf('other') > -1}
                onPress={() => {
                  if (allergens.indexOf('other') == -1) {
                    setAllergens((allergens) => [...allergens, 'other']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str != 'other'));
                  }
                }}
              />
            </View>
            <View style={styles.item}>
              <CheckBox
                containerStyle={styles.checkbox}
                textStyle={{ fontWeight: 'normal' }}
                title="None"
                checkedColor="#F37B36"
                checked={allergens.indexOf('none') > -1}
                onPress={() => {
                  if (allergens.indexOf('none') == -1) {
                    setAllergens((allergens) => [...allergens, 'none']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str != 'none'));
                  }
                }}
              />
            </View>
          </View>
          <Text style={styles.subsection}>Add a picture of your dish (optional)</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>
            <Pressable
              style={styles.pictureButton}
              onPress={pickImage}
            >
              <Text style={styles.pictureButtonText}> <AntDesign name="plus" size={20} color="#F37B36" />Upload Image</Text>
            </Pressable>
          </View>
          <View style={{ alignItems: 'center' }}>
            {uploadImage && <Image source={{ uri: uploadImage }} style={{ width: 327, height: 222 }} />}
          </View>
          <Text style={styles.subsection}>Additional comments (optional)</Text>
          <View style={styles.commentInput}>
            <Input
              value={comments}
              placeholder="If you have any additional comments to mention about this dish (including allergen information), type here."
              onChangeText={(comment: string) => setComments(comment)}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              style={{ fontSize: 15, width: 325, height: 174, textAlignVertical: 'top' }}
              multiline
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>

            <Pressable
              disabled={!isFormValid}
              style={isFormValid() ? styles.submitButton : styles.submitButtonDisabled}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text style={styles.submitText}>Create dish</Text>
            </Pressable>
            <DonateQuantityModal
              visible={modalVisible}
              dishObj={DishObj}
              closeModal={closeModal}
              modalSubmit={modalSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  scrollView: {
    marginHorizontal: 0,
    width: '100%',
  },
  pictureButton: {
    width: 327,
    height: 52,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#F37B36',
  },
  pictureButtonText: {
    flex: 1,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 20,
    alignItems: 'center',
    textAlign: 'center',
    color: '#F37B36',
    paddingTop: 15

  },
  boxInput: {
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 6,
    marginVertical: 10,
    fontFamily: 'Roboto',
    width: 325,
  },
  dishContainer: {
    width: '80%',
    margin: '10%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 32,
    paddingVertical: 10,
  },
  description: {
    fontSize: 15,
    paddingVertical: 10,
  },
  subsection: {
    paddingTop: 15,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#202020'
  },
  checkboxContainer: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  checkbox: {
    borderWidth: 0,
    color: '#202020',
    fontSize: 15,
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
  },
  item: {
    width: '50%'
  },
  commentInput: {
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 6,
    marginVertical: 10,
    fontFamily: 'Roboto',
    width: 325,
    height: 174
  },
  submitButtonDisabled: {
    backgroundColor: '#B8B8B8',
    width: 327,
    height: 52,
    borderRadius: 4
  },
  submitButton: {
    backgroundColor: '#F37B36',
    width: 327,
    height: 52,
    borderRadius: 4
  },
  submitText: {
    flex: 1,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 20,
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    paddingTop: 17
  }
});

export default DishForm;
