import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DishForm from '../../../components/DishForm/DishForm';


const NewDishFormScreen = () => (
    <View style={styles.container}>
      <DishForm />
    </View>
);

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default NewDishFormScreen;


// import React from 'react';
// import { StyleSheet } from 'react-native';
// import DishForm from '../../../components/DishForm/DishForm';
// import { View } from '../../../style/Themed';

// export default function DishScreen() {
//   return (
//     <View style={styles.container}>
//       <DishForm />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });