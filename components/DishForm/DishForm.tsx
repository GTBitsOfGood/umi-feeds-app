import React, { useState } from 'react';
import { Image, StyleSheet, ScrollView, Platform, Pressable } from 'react-native';
import { Input, Button, CheckBox, colors } from 'react-native-elements';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Text, View } from '../../style/Themed';
import { store } from '../../redux/store';
import { logAxiosError } from '../../utils';
import { Dish } from '../../types';
import { AntDesign } from '@expo/vector-icons';

function DishForm(props: { dish?: Dish }) {
  const [uploadImage, setUploadImage] = useState<string | null>(null); // uri of image taken by camera
  const [dishName, setDishName] = useState(props.dish?.dishName ?? '');
  const [cost, setCost] = useState<number | ''>(props.dish?.cost ?? '');
  const [pounds, setPounds] = useState<number | ''>(props.dish?.pounds ?? '');
  const [allergens, setAllergens] = useState(props.dish?.allergens ?? [])
  // const allergens = document.querySelectorAll('input[type=checkbox]:checked');
  const [comments, setComments] = useState(props.dish?.comments ?? '');
  


  const handleSubmit = () => {
    if (isFormValid()) {
      const formData = new FormData();
        if (uploadImage) {
        const file = { uri: uploadImage, name: 'image.jpg', type: 'image/jpeg' };
        formData.append('foodImages', file as any);
      }
      // dishName: dishName,
    }


  }

  const isFormValid = () => {
    return dishName && cost && pounds
  }

    
    // const handleSubmit = () => {
    //     const formData = new FormData();
    //     if (uploadImage) {
    //       const file = { uri: uploadImage, name: 'image.jpg', type: 'image/jpeg' };
    //       formData.append('foodImages', file as any);
    //     }
    //     const json = {
    //       availability: {
    //         startTime: startDatetime,
    //         endTime: endDatetime,
    //       },
    //       description: description !== '' ? description : undefined,
    //       pickupInstructions: pickupInstructions !== '' ? pickupInstructions : undefined,
    //       weight: weight !== '' ? weight : undefined,
    //     };
    //     formData.append('json', JSON.stringify(json));
    //     console.log('Submitting form');
    //     if (!props.donation?._id) {
    //       axios
    //         .post('/api/donations', formData, {
    //           headers: {
    //             'Content-Type': 'multipart/form-data',
    //             Authorization: `Bearer ${store.getState().auth.jwt}`
    //           }
    //         })
    //         .then((res) => console.log(res.data))
    //         .catch((err) => logAxiosError(err));
    //     } else {
    //       // TODO: Change this and the PUT /donations backend endpoint so that we can upload an image
    //       axios
    //         .put(`/api/donations?donation_id=${props.dish?._id}`, json, {
    //           headers: {
    //             Authorization: `Bearer ${store.getState().auth.jwt}`
    //           }
    //         })
    //         .then((res) => console.log(res.data))
    //         .catch((err) => logAxiosError(err));
    //     }
    //   };

    // const handleDelete = () => {
    //     if (props.dish?._id) {
    //       axios.delete(`/api/dish/${props.dish._id}`)
    //         .then((res) => console.log(res.data))
    //         .catch((err) => logAxiosError(err));
    //     }
    //   };

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

        const handleCheckbox = () => {
          
        }

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
                          onPress={handleCheckbox}
                        />
                        </View>
                        <View style={styles.item}>
                        <CheckBox 
                          containerStyle={styles.checkbox}
                          textStyle={{ fontWeight: 'normal' }}
                          title="Gluten"
                          checkedColor="#F37B36"
                        />
                        </View>
                        <View style={styles.item}>
                        <CheckBox 
                          containerStyle={styles.checkbox}
                          textStyle={{ fontWeight: 'normal' }}
                          title="Soy"
                          checkedColor="#F37B36"
                        />
                        </View>
                        <View style={styles.item}>
                        <CheckBox 
                          containerStyle={styles.checkbox}
                          textStyle={{ fontWeight: 'normal' }}
                          title="Tree nuts"
                          checkedColor="#F37B36"
                        />
                        </View>
                        <View style={styles.item}>
                        <CheckBox 
                          containerStyle={styles.checkbox}
                          textStyle={{ fontWeight: 'normal' }}
                          title="Fish"
                          checkedColor="#F37B36"
                        />
                        </View>
                        <View style={styles.item}>
                        <CheckBox 
                          containerStyle={styles.checkbox}
                          textStyle={{ fontWeight: 'normal' }}
                          title="Peanut"
                          checkedColor="#F37B36"
                        />
                        </View>
                        <View style={styles.item}>
                        <CheckBox 
                          containerStyle={styles.checkbox}
                          textStyle={{ fontWeight: 'normal' }}
                          title="Shellfish"
                          checkedColor="#F37B36"
                        />
                        </View>
                        <View style={styles.item}>
                        <CheckBox 
                          containerStyle={styles.checkbox}
                          textStyle={{ fontWeight: 'normal' }}
                          title="Egg"
                          checkedColor="#F37B36"
                        />
                        </View>
                        <View style={styles.item}>
                        <CheckBox 
                          containerStyle={styles.checkbox}
                          textStyle={{ fontWeight: 'normal' }}
                          title="Other"
                          checkedColor="#F37B36"
                        />
                        </View>
                        <View style={styles.item}>
                        <CheckBox 
                          containerStyle={styles.checkbox}
                          textStyle={{ fontWeight: 'normal' }}
                          title="None"
                          checkedColor="#F37B36"
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
                    <View style={{ alignItems: 'center', paddingBottom: 15 }}>
                      {uploadImage && <Image source={{ uri: uploadImage }} style={{ width: 200, height: 200 }} />}
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
                          onPress={handleSubmit}
                        >
                        <Text style={styles.submitText}>Create dish</Text>
                      </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    )};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
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
        fontFamily: "Roboto",
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
      backgroundColor: 'transparent',
      borderWidth: 0,
      color: '#202020', 
      fontSize: 15
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
      fontFamily: "Roboto",
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