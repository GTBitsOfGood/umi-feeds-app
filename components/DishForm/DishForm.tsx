import React, { useState } from 'react';
import { Image, ScrollView, Platform, Pressable, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { HideKeyboardUtility } from '../../util/index';
import { Text, View } from '../../style/Themed';
import { Dish, DonationDishes } from '../../types';
import DonateQuantityModal from '../../components/DonateQuantityModal';
import { addDish } from '../../redux/reducers/authReducer';
import { addToCart } from '../../redux/reducers/donationCartReducer';
import styles from './styles';
import { logAxiosError } from '../../utils';
import { store } from '../../redux/store';
import { setLoading } from '../../redux/reducers/loadingReducer';

function DishForm(props: { dish?: Dish }) {
  const [uploadImage, setUploadImage] = useState<string | null>(null); // uri of image taken by camera
  const [dishName, setDishName] = useState(props.dish?.dishName ?? '');
  const [cost, setCost] = useState<number | ''>(props.dish?.cost ?? '');
  const [pounds, setPounds] = useState<number | ''>(props.dish?.pounds ?? '');

  const [comments, setComments] = useState(props.dish?.comments ?? '');
  const [allergens, setAllergens] = useState<string[]>([]);

  const dispatch = useDispatch();
  const [donateModalVisible, setDonateModalVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const closeModal = () => setModalVisible(!modalVisible);
  const [quantity, setQuantity] = useState<DonationDishes>();
  const [dishResponse, setDishResponse] = useState<Dish>();

  const DishObj = {
    dishName,
    cost: Number(cost),
    pounds: Number(pounds),
    allergens,
    imageLink: String(uploadImage), // link to azure image
    comments: String(comments),
    favorite: true,
  };

  const handleSubmit = () => {
    console.log(isFormValid());
    if (isFormValid()) {
      dispatch(setLoading({ loading: true }));
      const formData = new FormData();
      if (uploadImage) {
        const file = { uri: uploadImage, name: 'image.jpg', type: 'image/jpeg' };
        setUploadImage(file.uri);
        formData.append('dishImage', file as any);
      }
      console.log(DishObj);
      formData.append('json', JSON.stringify(DishObj));
      console.log('Submitting dish form');
      axios.post(`/api/dishes?id=${store.getState().auth._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${store.getState().auth.jwt}`
        }
      })
        .then((res) => {
          console.log(res.data);
          setDishResponse(res.data.dishForm);
          dispatch(addDish(res.data.dishForm)); // backend returns object with name "dishForm" on successful response
        })
        .catch((err) => {
          logAxiosError(err);
          Alert.alert('Cannot Submit Dish', 'There was an error submitting your dish, please try again.');
        }).finally(() => {
          dispatch(setLoading({ loading: false, desination: 'DonateHomeScreen' }));
        });
    }
  };

  // Is called once quantity is specified after choosing to donate dishes, will add specified quantity to cart
  const donateQuantityModalSubmit = (quantity: DonationDishes) => {
    setQuantity(quantity);
    dispatch(addToCart(quantity));
  };

  // Check that the required inputs are all filled, allergens only requires one to be checked.
  const isFormValid = () => {
    const containsAllergen = (allergens.includes('dairy') || allergens.includes('gluten')
    || allergens.includes('soy') || allergens.includes('tree nuts') || allergens.includes('fish')
    || allergens.includes('peanuts') || allergens.includes('shellfish') || allergens.includes('egg')
    || allergens.includes('other') || allergens.includes('none'));
    return !(dishName === '' || cost === '' || pounds === '' || !containsAllergen);
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
      <Modal
        animationType="fade"
        transparent
        visible={donateModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          closeModal();
        }}
      >
        <View style={[styles.centeredView, donateModalVisible ? { backgroundColor: 'rgba(0,0,0,0.5)' } : {}]}>
          <HideKeyboardUtility>
            <KeyboardAvoidingView behavior="padding" style={styles.modalView}>
              <Text style={styles.modalText}>Donate Dish?</Text>
              <Text style={styles.modalSubtitle}>
                Would you like to donate this dish today?
              </Text>
              <Pressable
                style={[styles.button, styles.saveButton]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setDonateModalVisible(!donateModalVisible);
                  handleSubmit();
                }}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setDonateModalVisible(!donateModalVisible);
                  handleSubmit();
                }}
              >
                <Text style={styles.cancelTextStyle}>No</Text>
              </Pressable>
            </KeyboardAvoidingView>
          </HideKeyboardUtility>
        </View>
      </Modal>
      <DonateQuantityModal
        visible={modalVisible}
        dishObj={dishResponse}
        closeModal={closeModal}
        modalSubmit={donateQuantityModalSubmit}
      />
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
                  if (allergens.indexOf('dairy') === -1) {
                    setAllergens((allergens) => [...allergens, 'dairy']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str !== 'dairy'));
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
                  if (allergens.indexOf('gluten') === -1) {
                    setAllergens((allergens) => [...allergens, 'gluten']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str !== 'gluten'));
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
                  if (allergens.indexOf('soy') === -1) {
                    setAllergens((allergens) => [...allergens, 'soy']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str !== 'soy'));
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
                checked={allergens.indexOf('tree nuts') > -1}
                onPress={() => {
                  if (allergens.indexOf('tree nuts') === -1) {
                    setAllergens((allergens) => [...allergens, 'tree nuts']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str !== 'tree nuts'));
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
                  if (allergens.indexOf('fish') === -1) {
                    setAllergens((allergens) => [...allergens, 'fish']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str !== 'fish'));
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
                  if (allergens.indexOf('peanuts') === -1) {
                    setAllergens((allergens) => [...allergens, 'peanuts']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str !== 'peanuts'));
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
                  if (allergens.indexOf('shellfish') === -1) {
                    setAllergens((allergens) => [...allergens, 'shellfish']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str !== 'shellfish'));
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
                  if (allergens.indexOf('egg') === -1) {
                    setAllergens((allergens) => [...allergens, 'egg']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str !== 'egg'));
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
                  if (allergens.indexOf('other') === -1) {
                    setAllergens((allergens) => [...allergens, 'other']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str !== 'other'));
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
                  if (allergens.indexOf('none') === -1) {
                    setAllergens((allergens) => [...allergens, 'none']);
                  } else {
                    setAllergens((allergens) => allergens.filter((str) => str !== 'none'));
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
              disabled={!isFormValid()}
              style={isFormValid() ? styles.submitButton : styles.submitButtonDisabled}
              onPress={() => {
                setDonateModalVisible(!donateModalVisible);
              }}
            >
              <Text style={styles.submitText}>Create dish</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default DishForm;
