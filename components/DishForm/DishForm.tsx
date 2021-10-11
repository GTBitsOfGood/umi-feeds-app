import React, { useState } from 'react';
import { Image, StyleSheet, ScrollView, Platform, Pressable } from 'react-native';
import { Input, Button, CheckBox, colors } from 'react-native-elements';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Text, View } from '../../style/Themed';
import { store } from '../../redux/store';
import { logAxiosError } from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { Dish } from '../../types';
import { AntDesign } from '@expo/vector-icons';
import DonateQuantityModal from '../../components/DonateQuantityModal';
import { DonationDishes } from '../../types';
import { addDish } from '../../redux/reducers/authReducer';
import { addToCart } from '../../redux/reducers/donationCartReducer';
import { RootState } from '../../redux/rootReducer';

function DishForm(props: { dish?: Dish }) {
  const [uploadImage, setUploadImage] = useState<string | null>(null); // uri of image taken by camera
  const [dishName, setDishName] = useState(props.dish?.dishName ?? '');
  const [cost, setCost] = useState<number | ''>(props.dish?.cost ?? '');
  const [pounds, setPounds] = useState<number | ''>(props.dish?.pounds ?? '');

  const [dairyAllergy, onSelectDairy] = useState<boolean>(false);
  const [glutenAllergy, onSelectGluten] = useState<boolean>(false);
  const [soyAllergy, onSelectSoy] = useState<boolean>(false);
  const [treeNutAllergy, onSelectTreeNut] = useState<boolean>(false);
  const [fishAllergy, onSelectFish] = useState<boolean>(false);
  const [peanutAllergy, onSelectPeanut] = useState<boolean>(false);
  const [shellfishAllergy, onSelectShellfish] = useState<boolean>(false);
  const [eggAllergy, onSelectEgg] = useState<boolean>(false);
  const [otherAllergy, onSelectOther] = useState<boolean>(false);
  const [noAllergy, onSelectNone] = useState<boolean>(false);

  const [comments, setComments] = useState(props.dish?.comments ?? '');
  const [allergens, setAllergens] = useState<string[]>([]);

  
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const closeModal = () => setModalVisible(!modalVisible);
  const modalSubmit = (quantity: DonationDishes) => dispatch(addToCart(quantity));

  const DishObj = {
    _id: '614d6998e84ff2fcfcf79a4a', // the unqiue id assigned to a dish. Let Mongo create this when you insert a document without any _id attribute
    dishName: dishName,
    cost: Number(cost),
    pounds: Number(pounds),
    allergens: allergens,
    imageLink: String(uploadImage), // link to azure image
    comments: String(comments),
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      setModalVisible(!modalVisible);
      const formData = new FormData();
      if (uploadImage) {
        const file = { uri: uploadImage, name: 'image.jpg', type: 'image/jpeg' };
        formData.append('foodImages', file as any);
      }
      const json = {
        dishName: dishName,
        cost: cost,
        pounds: pounds,
        allergens: allergens,
        comments: comments,
      };
      formData.append('json', JSON.stringify(json));
      console.log('Submitting dish form');
    }


  }

  const isFormValid = () => {
    let allergy = (dairyAllergy || glutenAllergy || 
      soyAllergy || treeNutAllergy || fishAllergy || peanutAllergy || shellfishAllergy || eggAllergy ||
      otherAllergy || noAllergy)
    return dishName && cost && pounds && allergy
  }

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
                            inputContainerStyle={{ borderBottomWidth: 0}}
                            style={{ fontSize: 15}}
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
                          checked={dairyAllergy}
                          onPress={() => {
                            onSelectDairy(!dairyAllergy);
                            if (!dairyAllergy) {
                              setAllergens(allergens => [...allergens, "dairy"])
                            } else {
                              setAllergens(allergens => allergens.filter(function(str) {
                                  return str != "dairy";
                                }));
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
                          checked={glutenAllergy}
                          onPress={() => {
                            onSelectGluten(!glutenAllergy);
                            if (!glutenAllergy) {
                              setAllergens(allergens => [...allergens, "gluten"])
                            } else {
                              setAllergens(allergens => allergens.filter(function(str) {
                                  return str != "gluten";
                                }));
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
                          checked={soyAllergy}
                          onPress={() => {
                            onSelectSoy(!soyAllergy);
                            if (!soyAllergy) {
                              setAllergens(allergens => [...allergens, "soy"])
                            } else {
                              setAllergens(allergens => allergens.filter(function(str) {
                                  return str != "soy";
                                }));
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
                          checked={treeNutAllergy}
                          onPress={() => {
                            onSelectTreeNut(!treeNutAllergy);
                            if (!treeNutAllergy) {
                              setAllergens(allergens => [...allergens, "tree nuts"])
                            } else {
                              setAllergens(allergens => allergens.filter(function(str) {
                                  return str != "tree nuts";
                                }));
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
                          checked={fishAllergy}
                          onPress={() => {
                            onSelectFish(!fishAllergy);
                            if (!fishAllergy) {
                              setAllergens(allergens => [...allergens, "fish"])
                            } else {
                              setAllergens(allergens => allergens.filter(function(str) {
                                  return str != "fish";
                                }));
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
                          checked={peanutAllergy}
                          onPress={() => {
                            onSelectPeanut(!peanutAllergy);
                            if (!peanutAllergy) {
                              setAllergens(allergens => [...allergens, "peanuts"])
                            } else {
                              setAllergens(allergens => allergens.filter(function(str) {
                                  return str != "peanuts";
                                }));
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
                          checked={shellfishAllergy}
                          onPress={() => {
                            onSelectShellfish(!shellfishAllergy);
                            if (!shellfishAllergy) {
                              setAllergens(allergens => [...allergens, "shellfish"])
                            } else {
                              setAllergens(allergens => allergens.filter(function(str) {
                                  return str != "shellfish";
                                }));
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
                          checked={eggAllergy}
                          onPress={() => {
                            onSelectEgg(!eggAllergy);
                            if (!eggAllergy) {
                              setAllergens(allergens => [...allergens, "egg"])
                            } else {
                              setAllergens(allergens => allergens.filter(function(str) {
                                  return str != "egg";
                                }));
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
                          checked={otherAllergy}
                          onPress={() => {
                            onSelectOther(!otherAllergy);
                            if (!otherAllergy) {
                              setAllergens(allergens => [...allergens, "other"])
                            } else {
                              setAllergens(allergens => allergens.filter(function(str) {
                                  return str != "other";
                                }));
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
                          checked={noAllergy}
                          onPress={() => {
                            onSelectNone(!noAllergy);
                            if (!noAllergy) {
                              setAllergens(allergens => [...allergens, "none"])
                            } else {
                              setAllergens(allergens => allergens.filter(function(str) {
                                  return str != "none";
                                }));
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
                    <View style={{ alignItems: 'center'}}>
                      {uploadImage && <Image source={{ uri: uploadImage }} style={{ width: 327, height: 222 }} />}
                    </View>
                    <Text style={styles.subsection}>Additional comments (optional)</Text>
                    <View style={styles.commentInput}>
                      <Input
                              value={comments}
                              placeholder="If you have any additional comments to mention about this dish (including allergen information), type here."
                              onChangeText={(comment: string) => setComments(comment)}
                              inputContainerStyle={{ borderBottomWidth: 0 }}
                              style={{ fontSize: 15, width: 325, height: 174, textAlignVertical: 'top'}}
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
                        // need to figure out how to use the current dish object that i am returning
                        dishObj={DishObj}
                        closeModal={closeModal}
                        modalSubmit={modalSubmit}
                      />
                    </View>
                </View>
            </ScrollView>
        </View>
    )};

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
    pictureButton:{
      width: 327,
      height: 52,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: '#F37B36',
    },
    pictureButtonText:{
      flex: 1,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 17,
        lineHeight: 20,
        alignItems: "center",
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
    dishContainer:{
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
      alignItems: "center",
      textAlign: 'center',
      color: 'white',
      paddingTop: 17
    }
})

export default DishForm;