import React, { useState } from 'react';
import { StyleSheet, Button, TextInput } from 'react-native';
import { View, Text } from '../Themed';

export default function NewDonerName({ navigation }) {
  // const navigation = useNavigation();
  const [text, onChangeText] = useState<string>('');

  return (
    <View>
      <View style={styles.inputs}>
        <Text style={styles.title}>Whats is your name?</Text>
        <View style={styles.form}>
          <Text>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            placeholder="  John Doe"
          />
        </View>
        <Text>{`Name: ${text}`}</Text>
      </View>
      <View style={styles.buttons}>
        <Button title="<" onPress={() => navigation.goBack()} />
        <Button title="NEXT" onPress={() => navigation.navigate('NewDonorNumber')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputs: {
    paddingLeft: 45,
    paddingTop: 44
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
  },
  title: {
    color: 'rgba(252,136,52,1)',
    fontSize: 45,
    lineHeight: 52.73,
    fontWeight: 'bold',
  },
  buttons: {
    marginTop: '73%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
