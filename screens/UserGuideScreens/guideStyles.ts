import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    flexDirection: 'column'
  },
  imageContainer: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: '#F37B36'
  },
  image: {
    width: '80%',
    height: '100%',
    resizeMode: 'cover'
  },
  stepText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 20,
    color: 'black'
  },
  instrText: {
    fontStyle: 'normal',
    fontSize: 15,
    lineHeight: 20,
    color: 'black'
  },
  buttonText: {
    flex: 1,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 20,
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    paddingTop: 17
  },
  button: {
    backgroundColor: '#F37B36',
    width: 327,
    height: 52,
    borderRadius: 4
  }
});

export default styles;
