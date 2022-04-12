import { StyleSheet, Dimensions } from 'react-native';

const lightGray = '#5D5D5D';

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    width: '80%',
    marginHorizontal: '7.5%',
    paddingTop: 0,
    paddingBottom: 35,
  },
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
    marginBottom: 0,
    paddingTop: 0,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#202020',
    paddingVertical: 10,
    marginBottom: 20
  },
  heading: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 23,
    color: '#202020',
    marginBottom: 20,
    marginTop: 10,
  },
  body: {
    fontSize: 16,
    fontStyle: 'normal',
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    color: '#9D9D9D',
    marginBottom: 20
  },
  button: {
    fontSize: 14,
    color: lightGray,
    marginRight: 2,
    marginTop: 4
  },
  icon: {
    marginTop: 10,
    color: lightGray,
  },
  info: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profilePicture: {
    borderRadius: 75,
    borderColor: '#EFC39A',
    borderWidth: 3,
    overflow: 'hidden',
    backgroundColor: '#FFD3AA',
    marginBottom: 15,
    width: 150,
    height: 150
  }
});

export default styles;
