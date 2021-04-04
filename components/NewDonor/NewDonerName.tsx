import React, { useState } from 'react';
import { StyleSheet, Button, TextInput } from 'react-native';
import { View, Text } from '../Themed';

export default function NewDonerName({ navigation }) {
  // const navigation = useNavigation();
  const [text, onChangeText] = useState<string>('');

  return (
    <View>
      <Text>Whats is your name?</Text>
      <View>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder="John Doe"
        />
      </View>
      <Text>{`Name: ${text}`}</Text>
      {/* <Button title="<" onPress={() => navigation.goBack()} /> */}
      <Button title="NEXT" onPress={() => navigation.navigate('NewDonorNumber')} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
