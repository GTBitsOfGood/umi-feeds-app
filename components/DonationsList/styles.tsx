import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    width: '80%',
    margin: '10%',
    paddingBottom: 35,
  },
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3E3E3E',
    paddingTop: 28,
    paddingBottom: 8,
  },
  subtitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 21,
    lineHeight: 23,
    color: '#3E3E3E',
    paddingBottom: 20,
    paddingTop: 24
  }
});

export default styles;
