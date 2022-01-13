import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function Main() {
  const [height, setHeight] = useState<number>(100);

  // Use React Navigations Header because they have better spacing
  // https://www.geeksforgeeks.org/react-native-configuring-header-bar/
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, borderColor: 'green', borderWidth: 5 }}>
        <View style={styles.headerContainer}>
          <View style={{ flex: 2, backgroundColor: 'green' }}>
            <Text style={styles.title}>Hello</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Text style={styles.title}>Hello</Text>
          </View>
        </View>
        <View style={styles.box1} />
        <View style={styles.box2} />
        <View style={{ height, backgroundColor: 'red', flex: 3 }}>
          <TouchableOpacity onPress={() => setHeight(height + 10)}>
            <Text>Click</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  // <View style={{ height: this.state.height, backgroundColor: 'red', flex: 1 }}>
  //   <TouchableOpacity onPress={() => this.setState({ height: this.state.height + 10 })}>
  //     <Text>Click</Text>
  //   </TouchableOpacity>
  // </View>
  );
}
