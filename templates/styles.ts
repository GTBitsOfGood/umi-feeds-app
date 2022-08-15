import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  box1: {
    flex: 1,
    backgroundColor: 'blue',
    height: 0,
  },
  box2: {
    flex: 1,
    backgroundColor: 'purple',
    height: 0
  },
  headerContainer: {
    marginBottom: '5%',
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 0,
  }
});

export default styles;
