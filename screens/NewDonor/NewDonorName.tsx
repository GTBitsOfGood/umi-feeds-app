import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, Dimensions } from 'react-native';
import { View, Text } from '../../components/Themed';

export default function NewDonorName({ navigation }) {
  // const navigation = useNavigation();
  const [text, onChangeText] = useState<string>('');

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}
    >
      <View style={styles.inputs}>
        <Text style={styles.title}>What is your business’s name?</Text>
        <View style={styles.form}>
          <Text style={{ fontWeight: 'bold' }}>Business Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            placeholder="Trattoria"
            enablesReturnKeyAutomatically
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <Button title="←" onPress={() => navigation.goBack()} />
        <Button title="NEXT" onPress={() => navigation.navigate('NewDonorNumber')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputs: {
    paddingLeft: 45,
    paddingTop: 115
  },
  form: {
    paddingTop: 136
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 0.5,
    color: 'black',
    borderColor: 'black',
    borderRadius: 10,
    width: 330,
    padding: 10,
  },
  title: {
    color: 'rgba(252,136,52,1)',
    fontSize: 45,
    lineHeight: 52.73,
    fontWeight: 'bold',
  },
  buttons: {
    paddingLeft: 45,
    paddingRight: 45,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
