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
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FC8834',
    paddingVertical: 10,
  },
  subtitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 23,
    color: '#3E3E3E',
    marginBottom: 20,
    marginTop: 10,
  }
});

export default styles;
