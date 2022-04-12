import React, { useState } from 'react';
import { Image, ScrollView, Platform, Pressable, Alert } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector, batch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { Text, View } from '../../style/Themed';
import { Dish, DonationDishes } from '../../types';
import DonateQuantityModal from '../../components/DonateQuantityModal';
import { addDish } from '../../redux/reducers/authReducer';
import { addToCart } from '../../redux/reducers/donationCartReducer';
import styles from './styles';
import { logAxiosError } from '../../utils';
import { store } from '../../redux/store';
import { RootState } from '../../redux/rootReducer';
import { setLoading } from '../../redux/reducers/loadingReducer';
import { GeneralModal } from '..';
import LoadingScreen from '../../screens/LoadingScreen';
import FloatingTitleTextInputField from '../TextInput';

// @ts-ignore image does not need typescript definition
import Dollar from '../../assets/images/dollarsign.jpeg';

// @ts-ignore image does not need typescript definition
import Pounds from '../../assets/images/lbs.png';

const currencyRegex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;

/**
 * Dish Form component with the fields to submit or edit a Dish object
 * Once a form is submitted:
 *    1. Modal will prompt user if he/she wants to donate that dish
 *        - if YES: the dish object will be sent to the database and Mongo will
 *                  a dish object with the neccessary DishID that will be passed
 *                  along with the dish info to a second modal that prompts the
 *                  user for the quantity of that dish. That dish will then be added
 *                  to the donation cart and user will be navigated based on prop.
 *        - if NO: the dish object will just be sent to the database, update the user's
 *                 redux auth state, and navigated based on the prop.
 *
 * @param dish A Dish Object to pre-populate the fields if needed
 * @param onSuccessfulDishSubmit Navigation function direct to the corresponding screen on a successful form submission
 * @returns DishForm React Component
 */
function DishForm(props: { dish?: Dish, onSuccessfulDishSubmit: () => void }) {
  const loadingState = useSelector((state: RootState) => state.loading.loadingStatus);

  const [uploadImage, setUploadImage] = useState<string | null>(null); // uri of image taken by camera
  const [dishName, setDishName] = useState(props.dish?.dishName ?? '');
  const [cost, setCost] = useState<number | ''>(props.dish?.cost ?? '');
  const [costString, setCostString] = useState(props.dish?.cost.toString() ?? ''); // enables typing decimal cost amounts
  const [pounds, setPounds] = useState<number | ''>(props.dish?.pounds ?? '');
  const [poundsString, setPoundsString] = useState(props.dish?.pounds.toString() ?? '');

  const [comments, setComments] = useState(props.dish?.comments ?? '');
  const [allergens, setAllergens] = useState<string[]>([]);

  const dispatch = useDispatch();
  const [donateModalVisible, setDonateModalVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const closeModal = () => setModalVisible(!modalVisible);
  const closeDonateModal = () => setDonateModalVisible(!donateModalVisible);
  const [quantity, setQuantity] = useState<DonationDishes>();
  const [dishResponse, setDishResponse] = useState<Dish>();
  const [favorite, setFavorite] = useState<boolean>(false);

  const DishObj = {
    dishName: dishName.trim(),
    cost: Number(cost),
    pounds: Number(pounds),
    allergens,
    imageLink: String(uploadImage), // link to azure image
    comments: String(comments),
    favorite
  };

  // Check that the required inputs are all filled, allergens only requires one to be checked.
  const isFormValid = () => {
    const containsAllergen = (allergens.includes('dairy') || allergens.includes('gluten')
    || allergens.includes('soy') || allergens.includes('tree nuts') || allergens.includes('fish')
    || allergens.includes('peanuts') || allergens.includes('shellfish') || allergens.includes('egg')
    || allergens.includes('other') || allergens.includes('none'));
    return !(dishName === '' || cost === '' || pounds === '' || !containsAllergen);
  };

  const submitToServer = () => {
    dispatch(setLoading({ loading: true }));

    const formData = new FormData();
    if (uploadImage) {
      const file = { uri: uploadImage, name: 'image.jpg', type: 'image/jpeg' };
      setUploadImage(file.uri);
      formData.append('dishImage', file as any);
    }
    formData.append('json', JSON.stringify(DishObj));
    axios.post(`/api/dishes?id=${store.getState().auth._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${store.getState().auth.jwt}`
      }
    })
      .then((res) => {
        setDishResponse(res.data.dishForm);
        batch(() => {
          dispatch(addDish(res.data.dishForm)); // backend returns object with name "dishForm" on successful response
          dispatch(setLoading({ loading: false }));
        });
      })
      .catch((err) => {
        logAxiosError(err);
        Alert.alert('Cannot Submit Dish', 'There was an error submitting your dish, please try again.');
      }).finally(() => {
        dispatch(setLoading({ loading: false }));
      });
    dispatch(setLoading({ loading: false }));
  };

  const handleModalSubmit = (yesPressed: boolean, noPressed: boolean) => {
    if (isFormValid()) {
      submitToServer();
      if (yesPressed) {
        return setModalVisible(!modalVisible);
      }
      return props.onSuccessfulDishSubmit();
    }
    return null; // button is disabled is form is not valid
  };

  // Is called once quantity is specified after choosing to donate dishes, will add specified quantity to cart
  // Will use the DishID obatined in the dishResponse object after form submission as it needs to fetch the DishID mongo
  // that mongo assigns to the Dish Object
  const donateQuantityModalSubmit = (quantity: DonationDishes) => {
    setQuantity(quantity);
    dispatch(addToCart(quantity));
    return props.onSuccessfulDishSubmit();
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
    loadingState ? (
      <LoadingScreen />
    ) : (
      <View style={styles.container}>
        <GeneralModal
          title="Donate Dish?"
          subtitle="Would you like to donate this dish today?"
          numButtons={2}
          buttonOneTitle="Yes"
          buttonTwoTitle="No"
          visible={donateModalVisible}
          closeModal={closeDonateModal}
          modalSubmit={handleModalSubmit}
        />
        <DonateQuantityModal
          visible={modalVisible}
          dishObj={dishResponse}
          closeModal={closeModal}
          modalSubmit={donateQuantityModalSubmit}
          modalCancel={props.onSuccessfulDishSubmit}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.dishContainer}>
            <Text style={styles.title}>Create a new dish</Text>
            <Text style={styles.description}>Provide the following information about the dish to added to your dish inventory</Text>
            <FloatingTitleTextInputField
              title="Dish Name (required)"
              value={dishName}
              onChangeText={(name: string) => setDishName(name)}
              keyboardType="default"
              required
            />
            <FloatingTitleTextInputField
              title="Cost of dish in dollars (required)"
              value={costString}
              onChangeText={(costStr: string) => {
                if (Number.isFinite(+costStr) && (currencyRegex.test(costStr) || !costStr)) {
                  setCost(Number.isFinite(+costStr) && costStr !== '' ? +costStr : '');
                  setCostString(costStr);
                }
              }}
              keyboardType="numeric"
              required
              img={Dollar}
              roundToPlaces={2}
            />
            <FloatingTitleTextInputField
              title="Weight of serving in pounds"
              value={poundsString}
              onChangeText={(weight: string) => {
                if (Number.isFinite(+weight) && ((weight.match(/\./g) || []).length <= 1)) {
                  setPounds(Number.isFinite(+weight) && weight !== '' ? +weight : '');
                  setPoundsString(weight);
                }
              }}
              keyboardType="numeric"
              required={false}
              img={Pounds}
            />
            <CheckBox
              containerStyle={styles.checkbox}
              textStyle={{ fontWeight: 'normal' }}
              title="Favorite Dish"
              checkedColor="#F37B36"
              checked={favorite}
              onPress={() => {
                setFavorite(!favorite);
              }}
            />
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
                      setAllergens(() => ['none']);
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
                <Text style={styles.submitText}>Create Dish</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  );
}

export default DishForm;
