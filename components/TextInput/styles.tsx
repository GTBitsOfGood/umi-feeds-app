import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    borderStyle: 'solid',
    height: 56,
    borderWidth: 1,
    borderColor: '#B8B8B8',
    borderRadius: 4,
    marginVertical: 10,
    fontFamily: 'Roboto',
    flexDirection: 'row',
  },
  textInput: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 5,
    color: 'black',
  },
  titleStyles: {
    position: 'absolute',
    marginLeft: 15,
  },
  imageStyle: {
    padding: 10,
    marginTop: 13,
    marginLeft: 13,
    height: 30,
    width: 30,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});

export default Styles;
